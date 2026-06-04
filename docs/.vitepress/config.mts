import { defineConfig, type Plugin } from 'vitepress'
import { loadEnv } from 'vite'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { tipContainerPlugin } from './md-plugins/tip-container'
import { normalizeMdPlugin } from './md-plugins/normalize-md'
import { buildEndCdnPrefix } from './cdn-prefix'
import { NAV_TABS } from './tabs.config'
import zhCN from './i18n/locales/zh-CN'

// 读取 docs/.env.local（不入 git）中的私密配置
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const env = loadEnv('development', path.resolve(__dirname, '..'), '')

// dev proxy: 直接用完整 endpoint 路径作 key
// vite proxy 是 prefix 匹配，整路径作 key 既能命中请求，又不会误拦其他路由
const AI_ENDPOINT_PATH = env.VITE_AI_API_ENDPOINT || '/api/forward/v1/customer-service/docs/chat'
const AI_PROXY_PREFIX = AI_ENDPOINT_PATH

// build 模式标记（影响 i18n fallback 与 rewrites/locales 切换）
const isBuild = process.argv.includes('build')

// 构建期 i18n fallback：把 zh-CN 内容铺到根目录（英文）和 zh-HK 占位目录
// 仅在 build 时执行；构建结束后通过插件 closeBundle 自动清理，源码目录保持干净
const docsRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const zhCnSrc = path.join(docsRoot, 'zh-CN')
const zhHkDir = path.join(docsRoot, 'zh-HK')
const i18nFallbackCreated: string[] = []

function seedI18nFallback(srcDir: string, destDir: string, overwrite: boolean) {
  if (!fs.existsSync(srcDir)) return
  fs.mkdirSync(destDir, { recursive: true })
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name)
    const dest = path.join(destDir, entry.name)
    if (entry.isDirectory()) {
      const existedBefore = fs.existsSync(dest)
      if (!existedBefore) {
        fs.mkdirSync(dest, { recursive: true })
        i18nFallbackCreated.push(dest + '/')
      }
      seedI18nFallback(src, dest, overwrite)
    } else if (entry.isFile()) {
      const existedBefore = fs.existsSync(dest)
      if (!existedBefore) {
        fs.copyFileSync(src, dest)
        // 只追踪原本不存在的文件，避免清理时把占位 index.md 等原始文件删掉
        i18nFallbackCreated.push(dest)
      } else if (overwrite) {
        // 覆盖已有文件但不追踪，构建后还原原始内容
        const backup = fs.readFileSync(dest)
        fs.copyFileSync(src, dest)
        i18nFallbackOverwritten.push({ path: dest, content: backup })
      }
    }
  }
}

// 追踪 build 期间被覆盖的原始文件，构建结束时把内容还原回去
const i18nFallbackOverwritten: { path: string; content: Buffer }[] = []

if (isBuild) {
  // 英文根目录：zh-CN 内容直接 fallback 到 docs/（不覆盖已存在文件，保护 README.md 等）
  seedI18nFallback(zhCnSrc, docsRoot, /* overwrite */ false)
  // zh-HK 用 zh-CN 内容整体覆盖（当前 zh-HK/ 下只有占位 index.md，整体替换）
  seedI18nFallback(zhCnSrc, zhHkDir, /* overwrite */ true)
  console.log(`[i18n-fallback] seeded ${i18nFallbackCreated.length} entries`)
}

// closeBundle 钩子：构建结束后把 i18n fallback 期间创建的临时文件/目录清掉
// VitePress 会跑 client + server 两个 bundle，closeBundle 会触发两次；
// 仅在最后一次触发后做清理，避免中途删文件导致第二个 bundle 找不到入口
let cleanupTicks = 0
function i18nFallbackCleanupPlugin(): Plugin {
  return {
    name: 'longbridge-i18n-fallback-cleanup',
    closeBundle() {
      if (!isBuild || i18nFallbackCreated.length === 0) return
      cleanupTicks++
      if (cleanupTicks < 2) return
      // 先删文件，再删空目录（深度倒序）
      const files = i18nFallbackCreated.filter(p => !p.endsWith('/'))
      const dirs = i18nFallbackCreated
        .filter(p => p.endsWith('/'))
        .map(p => p.slice(0, -1))
        .sort((a, b) => b.length - a.length)
      for (const f of files) {
        try { fs.rmSync(f, { force: true }) } catch { }
      }
      for (const d of dirs) {
        try {
          if (fs.existsSync(d) && fs.readdirSync(d).length === 0) fs.rmdirSync(d)
        } catch { }
      }
      // 还原 build 期间被覆盖的原始文件
      for (const { path: p, content } of i18nFallbackOverwritten) {
        try { fs.writeFileSync(p, content) } catch { }
      }
      console.log(`[i18n-fallback] cleaned up ${files.length} files + ${dirs.length} dirs, restored ${i18nFallbackOverwritten.length} files`)
    },
  }
}

// 访问 /some/page.md 返回原始 markdown 源码（开发模式 + 生产构建）
function rawMarkdownPlugin(): Plugin {
  return {
    name: 'raw-markdown-source',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').replace(/\?.*$/, '')
        if (!url.endsWith('.md')) return next()

        // 只处理浏览器导航请求，放过 Vite 内部模块导入（import('/xxx.md')）
        // 浏览器导航时 Accept 包含 text/html，模块导入时为 */*
        const accept = req.headers['accept'] ?? ''
        if (!accept.includes('text/html')) return next()

        // 优先从 zh-CN 目录查找（rewrites 映射的内容）
        const candidates = [
          path.join('docs/zh-CN', url),
          path.join('docs', url),
        ]

        for (const filePath of candidates) {
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(content)
            return
          }
        }

        next()
      })
    },

    // 生产构建：把所有 .md 源文件复制到 dist，保持与 HTML 相同的路径结构
    closeBundle() {
      const outDir = path.resolve('docs/.vitepress/dist')
      if (!fs.existsSync(outDir)) return

      function copyMdFiles(srcDir: string, urlBase: string) {
        if (!fs.existsSync(srcDir)) return
        for (const entry of fs.readdirSync(srcDir)) {
          const srcPath = path.join(srcDir, entry)
          const stat = fs.statSync(srcPath)
          if (stat.isDirectory()) {
            copyMdFiles(srcPath, `${urlBase}/${entry}`)
          } else if (entry.endsWith('.md')) {
            const destPath = path.join(outDir, urlBase, entry)
            fs.mkdirSync(path.dirname(destPath), { recursive: true })
            fs.copyFileSync(srcPath, destPath)
          }
        }
      }

      // zh-CN 内容通过 rewrites 映射到根路径，dest 也用根路径
      copyMdFiles(path.resolve('docs/zh-CN'), '')
    },
  }
}

// 从 .md 文件中提取 frontmatter title 或第一个 H1
function extractTitle(filePath: string, fallback: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
    if (fmMatch) {
      const titleMatch = fmMatch[1].match(/^title:\s*(.+)$/m)
      if (titleMatch) return titleMatch[1].trim()
    }
    const h1Match = content.match(/^#\s+(.+)$/m)
    if (h1Match) return h1Match[1].trim()
  } catch { }
  return fallback
}

// 跳过的目录（语言子目录 + 文档中心入口目录）
const skipDirs = new Set(['en', 'zh-HK', 'zh-CN', 'docs'])

// 读取目录的排序配置（_order.json），返回 slug/dirname 数组
function loadOrder(dir: string): string[] {
  try {
    const orderFile = path.join(dir, '_order.json')
    if (fs.existsSync(orderFile)) {
      return JSON.parse(fs.readFileSync(orderFile, 'utf-8'))
    }
  } catch { }
  return []
}

// 递归扫描目录生成侧边栏 items
// depth=0：顶级分类的直接子目录（二级），展开；depth>=1：三级及以下，折叠
function generateSidebarItemsFromDir(dir: string, base: string, dirNames: Record<string, string>, depth = 0): any[] {
  const items: any[] = []

  try {
    const order = loadOrder(dir)
    const allEntries = fs.readdirSync(dir)
      .filter(e => !e.startsWith('.') && e !== '_order.json' && e !== 'images')

    // 按 _order.json 排序；未列出的追加到末尾（字母序）
    const sorted = [
      ...order.filter(o => allEntries.includes(o) || allEntries.includes(`${o}.md`))
        .map(o => allEntries.find(e => e === o || e === `${o}.md`)!),
      ...allEntries.filter(e => {
        const slug = e.replace(/\.md$/, '')
        return !order.includes(slug) && !order.includes(e)
      }).sort(),
    ]

    for (const entry of sorted) {
      const fullPath = path.join(dir, entry)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        const subItems = generateSidebarItemsFromDir(fullPath, `${base}/${entry}`, dirNames, depth + 1)
        const displayName = dirNames[entry] || entry

        // 若目录下有 overview.md，自动在子菜单顶部插入 Overview leaf
        // 父级 collapsible 仍**不设 link**，点击只展开/收起
        const overviewPath = path.join(fullPath, 'overview.md')
        if (fs.existsSync(overviewPath)) {
          const overviewFallback = dir.includes('/zh-CN/')
            ? '概览'
            : dir.includes('/zh-HK/')
              ? '概覽'
              : 'Overview'
          const overviewText = extractTitle(overviewPath, overviewFallback)
          subItems.unshift({
            text: overviewText,
            link: `${base}/${entry}/overview`,
          })
        }

        const groupItem: any = {
          text: displayName,
          collapsed: true,
          items: subItems,
        }

        items.push(groupItem)
      } else if (entry.endsWith('.md') && entry !== 'overview.md') {
        const slug = entry.replace(/\.md$/, '')
        const link = `${base}/${slug}`
        const title = extractTitle(fullPath, slug)
        items.push({
          text: title,
          link,
        })
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }

  return items
}

// 顶级分类 icon 字典(对齐 docs.cdp.coinbase.com 风格)
// 使用 lucide icon 名,经 UnoCSS preset-icons 渲染为 `<span class="i-lucide-XXX">` 的 CSS mask SVG
const CATEGORY_ICONS: Record<string, string> = {
  'getting-started':           'rocket',
  'app-guide':                 'smartphone',
  'account':                   'user-round',
  'deposit':                   'arrow-down-to-line',
  'withdrawal':                'arrow-up-from-line',
  'transfers-and-fx':          'arrow-left-right',
  'stock-trading':             'trending-up',
  'derivatives':               'layers',
  'crypto':                    'bitcoin',
  'ipo':                       'star',
  'margin':                    'scale',
  'funds-and-wealth':          'wallet',
  'market-data':               'bar-chart-3',
  'portfolio-and-statements':  'file-text',
  'rewards':                   'gift',
  'compliance-and-tax':        'shield-check',
  'troubleshooting':           'life-buoy',
}

// 分类展示顺序（文档中心侧边栏按此顺序排列）
const categoryOrder = [
  'getting-started',
  'app-guide',
  'account',
  'deposit',
  'withdrawal',
  'transfers-and-fx',
  'stock-trading',
  'derivatives',
  'crypto',
  'ipo',
  'margin',
  'funds-and-wealth',
  'market-data',
  'portfolio-and-statements',
  'rewards',
  'compliance-and-tax',
  'troubleshooting',
]

// 生成侧边栏配置（始终从 zh-CN 读取作为唯一内容源，按 urlPrefix 给 link/key 加前缀）
function generateSidebar(dirNames: Record<string, string>, urlPrefix = '') {
  const contentRoot = './docs/zh-CN'

  const topDirs = (() => {
    try {
      return fs.readdirSync(contentRoot)
        .filter(e => {
          if (skipDirs.has(e)) return false
          const fullPath = path.join(contentRoot, e)
          return fs.statSync(fullPath).isDirectory() && !e.startsWith('.')
        })
        .sort()
    } catch { return [] }
  })()

  // 构建每个分类目录的 sidebar item
  const itemByCategory: Record<string, object> = {}
  for (const dir of categoryOrder) {
    if (!topDirs.includes(dir)) continue
    const dirPath = path.join(contentRoot, dir)
    const items = generateSidebarItemsFromDir(dirPath, `${urlPrefix}/${dir}`, dirNames)
    const iconName = CATEGORY_ICONS[dir]
    const iconHtml = iconName
      ? `<span class="sidebar-group-icon i-lucide-${iconName}" aria-hidden="true"></span>`
      : ''
    const label = dirNames[dir] || dir
    itemByCategory[dir] = {
      text: `${iconHtml}<span class="sidebar-group-label">${label}</span>`,
      collapsed: false,
      items,
    }
  }

  // 每个 tab 路径前缀对应该 tab 下的分类列表
  const sidebar: Record<string, object[]> = {}
  for (const tab of NAV_TABS) {
    sidebar[`${urlPrefix}${tab.path}`] = tab.categories
      .filter(cat => itemByCategory[cat])
      .map(cat => itemByCategory[cat])
  }

  // 补齐各分类自身的路径前缀
  for (const tab of NAV_TABS) {
    for (const cat of tab.categories) {
      const catPath = `${urlPrefix}/${cat}/`
      if (catPath !== `${urlPrefix}${tab.path}`) {
        sidebar[catPath] = sidebar[`${urlPrefix}${tab.path}`]
      }
    }
  }

  return sidebar
}

// 三套 sidebar：root（英文，无前缀，落地到 / 根路径）、zh-CN（/zh-CN/）、zh-HK（/zh-HK/）
// 在 dev 模式下，root 仍按现有 rewrites 把 zh-CN 内容映射到 /，所以无前缀的 sidebar 同样适用
const sidebarRoot = generateSidebar(zhCN.data.dirNames, '')
const sidebarZhCN = generateSidebar(zhCN.data.dirNames, '/zh-CN')
const sidebarZhHK = generateSidebar(zhCN.data.dirNames, '/zh-HK')

const sharedNav = [
  { text: '首页', link: '/' },
  { text: '文档', link: '/docs/' },
  { text: 'Developers', link: 'https://open.longbridge.com', target: '_blank' },
]

const editLinkPattern = 'https://github.com/longbridge/docs/edit/main/docs/:path'

export default defineConfig({
  title: zhCN.vp.title,
  description: zhCN.vp.description,
  base: '/',
  appearance: 'light',
  ignoreDeadLinks: true,
  cleanUrls: true,

  // build 时跳过原始 zh-CN/ 源目录扫描——内容已经通过 seedI18nFallback 铺到 root/zh-HK，
  // 再让 VitePress 把 zh-CN/ 作为独立 locale 再生成一遍只会产生体积冗余（同样内容、不同
  // chunk hash）。跳过后 /zh-CN/* URL 不再存在，可由 nginx 301 → / 兜底。
  // dev 模式不跳过（保留原始路径供本地开发使用，与 rewrites 一起生效）。
  srcExclude: isBuild ? ['zh-CN/**'] : undefined,

  // 部署到 OSS + 主域 nginx 反代时启用：把所有 dist 产物 URL 重写为完整 CDN URL
  // （JS/CSS/字体/图片/runtime 拼接的 hashmap.json 与 page chunk），同时保留 page
  // link href 不动，确保导航留在主域。无 env var 时 no-op，本地 dev 不受影响。
  buildEnd: process.env.ASSETS_CDN_PREFIX
    ? buildEndCdnPrefix(process.env.ASSETS_CDN_PREFIX)
    : undefined,

  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://assets.wbrks.com/assets/logo/logo1.png' }],
  ],

  // dev：保留 zh-CN → 根路径 的 rewrites（与原行为一致）。
  // build：i18nFallback 已把 zh-CN 内容铺到根 + zh-HK，因此不需要 rewrites，
  //        每个 locale 各自从自己的目录构建。
  rewrites: isBuild
    ? {}
    : {
        'zh-CN/index.md': 'index.md',
        'zh-CN/docs/overview.md': 'docs/overview.md',
        'zh-CN/:path*': ':path*',
      },

  locales: isBuild
    ? {
        // build 产物：英文落到 /（默认，内容由 seedI18nFallback 用 zh-CN 兜底）；
        // 繁体在 /zh-HK/。原本的 zh-CN locale 已撤掉，srcExclude 一并跳过 zh-CN/ 源
        // 目录扫描，避免与 root 重复生成同内容的独立 chunk（节省 ~33% 体积）。
        // 用户访问 /zh-CN/* 由 nginx 301 重定向到 /*。
        root: {
          label: 'English',
          lang: 'en',
          link: '/',
          title: 'Longbridge Docs',
          description: 'Longbridge Docs',
          themeConfig: {
            nav: sharedNav,
            sidebar: sidebarRoot,
            outline: { level: [2, 4], label: 'On this page' },
            lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
            editLink: { pattern: editLinkPattern, text: 'Edit this page on GitHub' },
            docFooter: { prev: 'Previous', next: 'Next' },
          },
        },
        'zh-HK': {
          label: '繁體中文',
          lang: 'zh-HK',
          link: '/zh-HK/',
          title: 'Longbridge Docs',
          description: 'Longbridge Docs',
          themeConfig: {
            nav: sharedNav,
            sidebar: sidebarZhHK,
            outline: { level: [2, 4], label: '本頁內容' },
            lastUpdated: { text: '最近更新', formatOptions: { dateStyle: 'medium' } },
            editLink: { pattern: editLinkPattern, text: '在 GitHub 上編輯此頁' },
            docFooter: { prev: '上一篇', next: '下一篇' },
            footer: { message: '© 2026 Longbridge. All rights reserved.' },
          },
        },
      }
    : {
        // dev：保持原有单 root=zh-CN 配置，避免与 rewrites 冲突影响本地开发
        root: {
          label: '简体中文',
          lang: 'zh-CN',
          link: '/',
          title: zhCN.vp.title,
          description: zhCN.vp.description,
          themeConfig: {
            nav: sharedNav,
            sidebar: sidebarRoot,
            outline: { level: [2, 4], label: zhCN.vp.outline },
            lastUpdated: { text: zhCN.vp.lastUpdated, formatOptions: { dateStyle: 'medium' } },
            editLink: { pattern: editLinkPattern, text: zhCN.vp.editLink },
            docFooter: { prev: zhCN.vp.prev, next: zhCN.vp.next },
            footer: { message: zhCN.vp.footerMessage },
          },
        },
      },

  themeConfig: {
    logo: {
      src: 'https://assets.wbrks.com/assets/logo/logo-without-title-lb.svg',
      alt: 'Longbridge',
    },

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            storeFields: ['title', 'titles', 'text'],
          },
        },
        locales: {
          root: {
            translations: {
              button: {
                buttonText: zhCN.vp.search.buttonText,
                buttonAriaLabel: zhCN.vp.search.buttonAriaLabel,
              },
              modal: {
                displayDetails: zhCN.vp.search.displayDetails,
                resetButtonTitle: zhCN.vp.search.resetButtonTitle,
                backButtonTitle: zhCN.vp.search.backButtonTitle,
                noResultsText: zhCN.vp.search.noResultsText,
                footer: {
                  selectText: zhCN.vp.search.footer.selectText,
                  selectKeyAriaLabel: zhCN.vp.search.footer.selectKeyAriaLabel,
                  navigateText: zhCN.vp.search.footer.navigateText,
                  navigateUpKeyAriaLabel: zhCN.vp.search.footer.navigateUpKeyAriaLabel,
                  navigateDownKeyAriaLabel: zhCN.vp.search.footer.navigateDownKeyAriaLabel,
                  closeText: zhCN.vp.search.footer.closeText,
                  closeKeyAriaLabel: zhCN.vp.search.footer.closeKeyAriaLabel,
                },
              },
            },
          },
          en: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
              modal: {
                displayDetails: 'Display detailed list',
                resetButtonTitle: 'Reset search',
                backButtonTitle: 'Close search',
                noResultsText: 'No results for',
                footer: {
                  selectText: 'to select',
                  selectKeyAriaLabel: 'Enter',
                  navigateText: 'to navigate',
                  navigateUpKeyAriaLabel: 'Up arrow',
                  navigateDownKeyAriaLabel: 'Down arrow',
                  closeText: 'to close',
                  closeKeyAriaLabel: 'Escape',
                },
              },
            },
          },
          'zh-HK': {
            translations: {
              button: { buttonText: '搜尋文件', buttonAriaLabel: '搜尋文件' },
              modal: {
                displayDetails: '顯示詳細列表',
                resetButtonTitle: '清除查詢',
                backButtonTitle: '關閉搜尋',
                noResultsText: '無法找到相關結果',
                footer: {
                  selectText: '選擇',
                  selectKeyAriaLabel: 'Enter',
                  navigateText: '切換',
                  navigateUpKeyAriaLabel: '方向鍵上',
                  navigateDownKeyAriaLabel: '方向鍵下',
                  closeText: '關閉',
                  closeKeyAriaLabel: 'Escape',
                },
              },
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/longbridge/docs' },
    ],
  },

  markdown: {
    breaks: true,
    config(md) {
      md.use(normalizeMdPlugin)
      md.use(tipContainerPlugin)
    },
  },

  vite: {
    plugins: [UnoCSS(), rawMarkdownPlugin(), i18nFallbackCleanupPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './theme'),
      },
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false,
    },
    ssr: {
      noExternal: ['@rive-app/canvas', 'vue-i18n', '@intlify/core-base', '@intlify/message-compiler'],
    },
    server: {
      proxy: {
        [AI_PROXY_PREFIX]: {
          target: env.VITE_AI_API_HOST,
          changeOrigin: true,
        },
      },
    },
  },
})
