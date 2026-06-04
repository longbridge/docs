import fs from 'fs'
import path from 'path'
import type { SiteConfig } from 'vitepress'

/**
 * VitePress `buildEnd` hook that rewrites the built site to load all assets
 * from a CDN while keeping page navigation (anchor href) on the main domain.
 *
 * 适用场景：站点 HTML 由主域（nginx）反代 OSS 上的 index.html / 路由 .html
 * 提供，所有 asset（JS chunks / CSS / 字体 / 图片 / hashmap.json）走 CDN 直链。
 *
 * 介入点：
 *
 *   1. **HTML / JS / CSS 里的字面量 asset URL** ——把 `/assets/foo.HASH.js`
 *      之类的 site-root 路径前缀完整 CDN URL（含 OSS 子路径）。基于 `dist/`
 *      实际产物逐个 path 严格匹配，page link（无扩展名 / 指向 .html）天然
 *      不命中，不会被误改。
 *
 *   2. **framework chunk 里的 runtime URL 拼接** ——VitePress 客户端用
 *      `siteData.value.base + chunkPath` / `+ "hashmap.json"` 在运行时构造
 *      URL，post-build 字面量替换抓不到。针对这两个 pattern 做精准 regex 改写
 *      为硬编码 CDN 完整 URL；`If(base, e)`（用于 `<a href>` 生成）形式不被
 *      匹配，保持原样——page nav 仍生成 `/path`，留在主域。
 *
 * 默认 inactive：仅在 `prefix` 非空时执行；config.base 保持 `/`，与本地 dev
 * 和无 CDN 部署完全兼容。
 */
export function buildEndCdnPrefix(prefix: string) {
  const normalized = prefix.replace(/\/+$/, '')
  const prefixSlash = normalized + '/'

  return async (siteConfig: SiteConfig) => {
    const dist = siteConfig.outDir

    // 收集 dist 内所有非 HTML 产物的 site-root URL（base=/ 时即 `/<rel>`）
    const assetUrls: string[] = []
    const collect = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) collect(full)
        else if (!entry.name.endsWith('.html')) {
          const rel = path.relative(dist, full).split(path.sep).join('/')
          assetUrls.push('/' + rel)
        }
      }
    }
    collect(dist)

    // 长 URL 优先（alternation 同起点按出现顺序选）
    assetUrls.sort((a, b) => b.length - a.length)

    // 边界保护：前置字符不能是 [A-Za-z0-9_./]——避免 /assets/index.md.HASH.lean.js
    // 里的 /index.md.HASH.lean.js 子串被误匹配（前面是 `s`，是字母，不匹配）；
    // 而 `"/index.md.HASH.lean.js"` 这种独立引用前面是引号，不在字符集里，正常匹配。
    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const urlRe = new RegExp(
      `(?<![A-Za-z0-9_./])(${assetUrls.map(escape).join('|')})`,
      'g',
    )

    // framework chunk 里 runtime URL 拼接的两个 pattern
    const frameworkPatterns: Array<[RegExp, string]> = [
      [
        // fetch(<id>.value.base + "hashmap.json")  →  fetch("<CDN>/hashmap.json")
        /[A-Za-z_$][A-Za-z0-9_$]*\.value\.base\s*\+\s*"hashmap\.json"/g,
        `"${prefixSlash}hashmap.json"`,
      ],
      [
        // <id>.value.base + <id>.relativePath  →  "<CDN>/" + <id>.relativePath
        /[A-Za-z_$][A-Za-z0-9_$]*\.value\.base\s*\+\s*([A-Za-z_$][A-Za-z0-9_$]*\.relativePath)/g,
        `"${prefixSlash}"+$1`,
      ],
    ]
    const isFrameworkChunk = /[\\/]assets[\\/]chunks[\\/]framework\.[A-Za-z0-9_-]+\.js$/

    let htmlCount = 0
    let codeCount = 0
    let frameworkCount = 0
    const walk = function* (dir: string): Generator<string> {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name)
        if (e.isDirectory()) yield* walk(full)
        else yield full
      }
    }

    for (const file of walk(dist)) {
      if (!/\.(html|js|mjs|css)$/.test(file)) continue
      const src = fs.readFileSync(file, 'utf-8')
      let next = src.replace(urlRe, (m: string) => normalized + m)

      if (isFrameworkChunk.test(file)) {
        for (const [pattern, repl] of frameworkPatterns) {
          next = next.replace(pattern, repl)
        }
        if (next !== src) frameworkCount++
      }

      if (next !== src) {
        fs.writeFileSync(file, next)
        if (file.endsWith('.html')) htmlCount++
        else codeCount++
      }
    }

    console.log(
      `[cdn-prefix] prefix=${normalized} ` +
        `assets=${assetUrls.length} ` +
        `html=${htmlCount} js/css=${codeCount} framework-patched=${frameworkCount}`,
    )
  }
}
