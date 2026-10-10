import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import { DEFAULT_API_HOST, getRegion } from './region.mjs'

const PKG_ROOT = fileURLToPath(new URL('.', import.meta.url))
const DEV_PORTS = { hk: 4331, sg: 4332 }

/**
 * dev 环境模拟 nginx 的两条改写(生产规则见 websites-nginx _hk_sg_support_docs.conf):
 *   1. 显式默认语言段 /hk/zh-HK/support… → /hk/support…
 *   2. 文章任意分类段 /support/topics/{任意}/{slug} → /support/topics/{slug}(产物按 slug 单份存放)
 */
function devRewrites(region) {
  const others = region.locales.filter((l) => l !== region.defaultLocale)
  // Vite 交给中间件的 req.url 已去掉 base(/hk),地区段按可选匹配
  const defaultSeg = new RegExp(`^((?:/${region.code})?)/${region.defaultLocale}(/support)`)
  const topicPath = new RegExp(`^((?:/${region.code})?(?:/(?:${others.join('|')}))?/support/topics)/[^/?#]+/([^/?#]+)`)
  // Vite pre 插件：中间件挂在 Astro 自身路由之前(astro:server:setup 注册得太晚，改写不生效)
  return {
    name: 'lb-support-dev-rewrites',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url) req.url = req.url.replace(defaultSeg, '$1$2').replace(topicPath, '$1/$2')
        next()
      })
    },
  }
}

/** HK / SG 官网帮助中心共用的 Astro 配置；app 只需传地区 */
export function createSupportConfig({ region: code }) {
  const region = getRegion(code)
  return defineConfig({
    // 页面 URL 形如 /hk/support、/hk/en/support/…;静态资源也收在 /{region}/support/ 下，不占用官网其它 /hk/* 路径
    base: `/${code}`,
    srcDir: PKG_ROOT + 'src',
    publicDir: PKG_ROOT + 'public',
    outDir: './dist',
    trailingSlash: 'never',
    build: { format: 'file', assets: 'support/_astro' },
    server: { port: DEV_PORTS[code] },
    // 浏览器兼容目标与 apps/us 一致(Chrome 80 / Safari 13),原因见 apps/us/astro.config.mjs
    vite: {
      plugins: [devRewrites(region)],
      define: {
        __LB_REGION__: JSON.stringify(code),
        // 浏览器端搜索 / 反馈接口域名：canary 构建由 CI 注入 SUPPORT_API_HOST
        __LB_API_HOST__: JSON.stringify((process.env.SUPPORT_API_HOST ?? DEFAULT_API_HOST).replace(/\/$/, '')),
      },
      build: { target: ['chrome80', 'safari13'] },
      css: {
        transformer: 'lightningcss',
        lightningcss: { targets: { chrome: 80 << 16, safari: 13 << 16 } },
      },
    },
  })
}
