import { defineConfig, type Plugin } from 'vitepress'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { tipContainerPlugin } from './md-plugins/tip-container'
import { normalizeMdPlugin } from './md-plugins/normalize-md'
import { buildEndCdnPrefix } from './cdn-prefix'
import { NAV_TABS } from './tabs.config'
import zhCN from './i18n/locales/zh-CN'
import en from './i18n/locales/en'
import zhHK from './i18n/locales/zh-HK'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 每次 build 锁定一个 region；前端跨 region 跳转走绝对 URL（window.location.href）
const REGION_ALL = ['hk', 'sg'] as const
const BUILD_REGION = (process.env.BUILD_REGION || 'hk').toLowerCase()
if (!REGION_ALL.includes(BUILD_REGION as any)) {
  throw new Error(`Invalid BUILD_REGION "${BUILD_REGION}". Expected one of: ${REGION_ALL.join(', ')}`)
}

// 访问 /some/page.md 返回原始 markdown 源码（开发模式 + 生产构建）
// dev 模式：访问当前 region 之外的路径（如 base=/hk/ 时访问 /sg/）改写到 base 内的
// 不存在 path，让 VitePress 走它内置 NotFound 模板渲染（带 navbar + 完整 layout），
// 而不是 Vite 抛 "configured with public base URL" 的原始报错页。
// 浏览器地址栏的 URL 不变，只是 server 内部把它当 base 内未匹配 path 处理。
function wrongRegionRedirectPlugin(): Plugin {
  return {
    name: 'lb-wrong-region-404',
    configureServer(server) {
      const base = `/${BUILD_REGION}/`
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').replace(/\?.*$/, '')
        const accept = req.headers['accept'] ?? ''
        if (!accept.includes('text/html')) return next()
        if (url === '/' || url.startsWith(base) || url.startsWith('/@') || url.startsWith('/__')) return next()
        // 内部 rewrite：把 url 改成 base 内一个肯定不存在的 path，VitePress SSR 会
        // 渲染 NotFound 组件 + 完整主题 layout
        req.url = base + '__not_found__'
        next()
      })
    },
  }
}

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

        // 优先从 hk/en 目录查找（rewrites 把 hk/en/* 映射到根）
        const candidates = [
          path.join(`docs/${BUILD_REGION}/en`, url),
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
      // 与 VitePress outDir 同步
      const outDir = path.resolve(`docs/.vitepress/dist/${BUILD_REGION}`)
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

      // outDir 已经是 dist/<region>/，URL 内部不带 region 前缀；md 副本与 HTML 同路径
      //   docs/<region>/en/*     → dist/<region>/*
      //   docs/<region>/zh-CN/*  → dist/<region>/zh-CN/*
      //   docs/<region>/zh-HK/*  → dist/<region>/zh-HK/*
      const srcRoot = path.resolve(`docs/${BUILD_REGION}`)
      copyMdFiles(path.join(srcRoot, 'en'), '')
      copyMdFiles(path.join(srcRoot, 'zh-CN'), '/zh-CN')
      copyMdFiles(path.join(srcRoot, 'zh-HK'), '/zh-HK')
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

        // 若目录下有 overview.md，把 group 标题本身做成 overview link：
        // 点击 group 文字 → 展开 + 跳转 overview（Layout.vue 全局拦截补 caret 触发）。
        // 不再额外插入 Overview leaf，避免父子两条相同标题被同时高亮
        const overviewPath = path.join(fullPath, 'overview.md')
        const groupLink = fs.existsSync(overviewPath)
          ? `${base}/${entry}/overview`
          : undefined

        const groupItem: any = {
          // 二级及以下 group 默认展开；用 false（而非 undefined）保留 collapsible，
          // 让用户仍可手动折叠
          text: displayName,
          collapsed: false,
          items: subItems,
        }
        if (groupLink) groupItem.link = groupLink

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
// 使用 Phosphor icon 名,经 UnoCSS preset-icons 渲染为 `<span class="i-ph-XXX">` 的 CSS mask SVG
const CATEGORY_ICONS: Record<string, string> = {
  'getting-started':           'book',
  'app-guide':                 'device-mobile-speaker',
  'account':                   'identification-card',
  'deposit':                   'hand-deposit',
  'withdrawal':                'hand-withdraw',
  'transfers-and-fx':          'swap',
  'stock-trading':             'chart-line-up',
  'derivatives':               'function',
  'crypto':                    'currency-btc',
  'ipo':                       'star',
  'margin':                    'scales',
  'funds-and-wealth':          'vault',
  'market-data':               'chart-bar',
  'portfolio-and-statements':  'chart-pie-slice',
  'rewards':                   'gift',
  'compliance-and-tax':        'shield-check',
  'troubleshooting':           'bug',
}

// 分类展示顺序（文档中心侧边栏按此顺序排列）
const categoryOrder = [
  'getting-started',
  'app-guide',
  'account',
  'deposit',
  'withdrawal',
  'transfers-and-fx',
  'troubleshooting',
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
]

// 生成侧边栏配置（始终从 zh-CN 读取作为唯一内容源，按 urlPrefix 给 link/key 加前缀）
function generateSidebar(dirNames: Record<string, string>, urlPrefix = '') {
  // 当前 region 的 zh-CN 作为 sidebar 内容源
  const contentRoot = `./docs/${BUILD_REGION}/zh-CN`

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
      ? `<span class="sidebar-group-icon i-ph-${iconName}" aria-hidden="true"></span>`
      : ''
    const label = dirNames[dir] || dir
    // 顶级分类目录如果有 overview.md，也让标题可点
    const overviewPath = path.join(dirPath, 'overview.md')
    const overviewLink = fs.existsSync(overviewPath)
      ? `${urlPrefix}/${dir}/overview`
      : undefined
    const group: any = {
      text: `${iconHtml}<span class="sidebar-group-label">${label}</span>`,
      collapsed: false,
      items,
    }
    if (overviewLink) group.link = overviewLink
    itemByCategory[dir] = group
  }

  // 每个 tab 路径前缀对应该 tab 下的分类列表
  // 跳过 home（path '/'）：把 '/' 写进 sidebar 会被 VitePress 当作所有路径的兜底，
  // 让具体业务路径匹配不到自己的 sidebar，面包屑也因此推不出层级
  const sidebar: Record<string, object[]> = {}
  for (const tab of NAV_TABS) {
    if (tab.path === '/') continue
    sidebar[`${urlPrefix}${tab.path}`] = tab.categories
      .filter(cat => itemByCategory[cat])
      .map(cat => itemByCategory[cat])
  }

  // 补齐各分类自身的路径前缀
  for (const tab of NAV_TABS) {
    if (tab.path === '/') continue
    for (const cat of tab.categories) {
      const catPath = `${urlPrefix}/${cat}/`
      if (catPath !== `${urlPrefix}${tab.path}`) {
        sidebar[catPath] = sidebar[`${urlPrefix}${tab.path}`]
      }
    }
  }

  return sidebar
}

// 三套 sidebar：urlPrefix 不带 region（base 已经处理）
// dirNames 各 locale 独立来源；缺 key 时回退 zh-CN（en/zh-HK 翻译未完成的 token）
const mergedEnDirNames = { ...zhCN.data.dirNames, ...en.data.dirNames }
const mergedZhHKDirNames = { ...zhCN.data.dirNames, ...zhHK.data.dirNames }
const sidebarRoot = generateSidebar(mergedEnDirNames, '')
const sidebarZhCN = generateSidebar(zhCN.data.dirNames, '/zh-CN')
const sidebarZhHK = generateSidebar(mergedZhHKDirNames, '/zh-HK')

const sharedNav = [
  { text: '首页', link: '/' },
  { text: '文档', link: '/docs/' },
  { text: 'Developers', link: 'https://open.longbridge.com', target: '_blank' },
]

const editLinkPattern = 'https://github.com/longbridge/docs/edit/main/docs/:path'

export default defineConfig({
  title: zhCN.vp.title,
  description: zhCN.vp.description,
  // 每 region 单独 build：BUILD_REGION 决定 base / outDir / 源目录 / rewrites。
  // 当前 region 锁定后该次 build 产物完全独立（HTML + assets 都在 dist/<region>/）。
  // 默认 hk；通过 `BUILD_REGION=sg yarn build` 为另一个 region 构建。
  base: `/${BUILD_REGION}/`,
  outDir: `.vitepress/dist/${BUILD_REGION}`,
  srcExclude: REGION_ALL.filter(r => r !== BUILD_REGION).map(r => `${r}/**`),
  appearance: 'light',
  ignoreDeadLinks: true,
  cleanUrls: true,

  // 部署到 OSS + 主域 nginx 反代时启用：把所有 dist 产物 URL 重写为完整 CDN URL
  // （JS/CSS/字体/图片/runtime 拼接的 hashmap.json 与 page chunk），同时保留 page
  // link href 不动，确保导航留在主域。无 env var 时 no-op，本地 dev 不受影响。
  buildEnd: process.env.ASSETS_CDN_PREFIX
    ? buildEndCdnPrefix(process.env.ASSETS_CDN_PREFIX)
    : undefined,

  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://assets.wbrks.com/assets/logo/logo1.png' }],

    // ── Helora 客服 / AI 嵌入 ───────────────────────────────────────────
    // 项目所有 AI 入口（HomeNavbar Ask AI 按钮、SearchDialog AI row、首页各 section
    // 内的 Ask AI 按钮）都走 useAIModal → window.Helora.open()。
    // 顺序敏感：内联 HeloraConfig 必须在 iife 之前；configKey 按 region 切换多品牌
    // 配置（HK = helora-hk，SG 暂用默认 helora，后台新增 helora-sg 后再切）。
    // proxy 联调阶段 staging，验收后切 prod。
    ['script', {}, `window.HeloraConfig = ${JSON.stringify({
      proxy: 'staging',
      source: 'web',
      configPlatform: 'web',
      configKey: BUILD_REGION === 'hk' ? 'helora-hk' : 'helora',
    })};`],
    ['script', { src: 'https://assets.lbkrs.com/h5hub/helora-embed/helora-embed-0.1.0.dev.iife.js' }],
  ],

  // BUILD_REGION 锁定后，srcExclude 已排除其它 region 目录；rewrites 把
  // <region>/<lang>/... → <lang>/... （en 作为该 region 的默认语言落到根）
  //   docs/hk/en/foo.md      → /foo（配合 base=/hk/ 最终 URL = /hk/foo）
  //   docs/hk/zh-CN/foo.md   → /zh-CN/foo（URL = /hk/zh-CN/foo）
  //   docs/hk/zh-HK/foo.md   → /zh-HK/foo（URL = /hk/zh-HK/foo）
  rewrites: {
    [`${BUILD_REGION}/en/index.md`]: 'index.md',
    [`${BUILD_REGION}/en/docs/index.md`]: 'docs/index.md',
    [`${BUILD_REGION}/en/:path*`]: ':path*',
    [`${BUILD_REGION}/zh-CN/:path*`]: 'zh-CN/:path*',
    [`${BUILD_REGION}/zh-HK/:path*`]: 'zh-HK/:path*',
  },

  locales: {
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
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        skipToContentLabel: 'Skip to content',
      },
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN/',
      title: zhCN.vp.title,
      description: zhCN.vp.description,
      themeConfig: {
        nav: sharedNav,
        sidebar: sidebarZhCN,
        outline: { level: [2, 4], label: zhCN.vp.outline },
        lastUpdated: { text: zhCN.vp.lastUpdated, formatOptions: { dateStyle: 'medium' } },
        editLink: { pattern: editLinkPattern, text: zhCN.vp.editLink },
        docFooter: { prev: zhCN.vp.prev, next: zhCN.vp.next },
        footer: { message: zhCN.vp.footerMessage },
        sidebarMenuLabel: zhCN.vp.sidebarMenu,
        returnToTopLabel: zhCN.vp.returnToTop,
        darkModeSwitchLabel: zhCN.vp.darkModeSwitch,
        lightModeSwitchTitle: zhCN.vp.lightModeSwitch,
        darkModeSwitchTitle: zhCN.vp.darkModeSwitch,
        skipToContentLabel: zhCN.vp.skipToContent,
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
        sidebarMenuLabel: '選單',
        returnToTopLabel: '返回頂部',
        darkModeSwitchLabel: '切換深色模式',
        lightModeSwitchTitle: '切換淺色模式',
        darkModeSwitchTitle: '切換深色模式',
        skipToContentLabel: '跳至內容',
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
    plugins: [UnoCSS(), wrongRegionRedirectPlugin(), rawMarkdownPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './theme'),
      },
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false,
    },
    ssr: {
      noExternal: ['vue-i18n', '@intlify/core-base', '@intlify/message-compiler'],
    },
  },
})
