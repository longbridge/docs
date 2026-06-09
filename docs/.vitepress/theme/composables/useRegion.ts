import { ref } from 'vue'
import { inBrowser, useData, withBase } from 'vitepress'

// region 优先级：URL 第一段 > cookie > 'hk' 默认。
// URL 是当前实际访问的 region，永远权威，避免 cookie 残留与可见 URL 不一致。
// 单次 build 内 region 是恒定的（VitePress base = /<region>/），useRegion 主要
// 给跨 region 跳转用：构造目标 region 的绝对 URL。
function readRegion(): 'hk' | 'sg' {
  if (!inBrowser) return 'hk'
  const p = window.location.pathname.match(/^\/(hk|sg)(\/|$)/)
  if (p) return p[1] as 'hk' | 'sg'
  const m = document.cookie.match(/(?:^|; )region=([^;]*)/)
  if (m && (m[1] === 'sg' || m[1] === 'hk')) return m[1]
  return 'hk'
}

export function useRegion() {
  const region = ref<'hk' | 'sg'>(readRegion())
  const { lang } = useData()

  /**
   * 项目内"跳转 URL 构造"的唯一公共方法。规则：
   *   1. 外链 / mailto / # / 相对路径：原样透传
   *   2. 目录路径（以 / 结尾，且非区域根 /）：自动补 overview，
   *      因为目录类跳转的真实落地页是 overview.md
   *   3. lang === 'en'（root locale）：路径不带语言段
   *   4. lang === 'zh-CN' / 'zh-HK'：前缀 /<lang>
   *   5. 最外层 withBase 自动补 region（base = /<region>/）
   *
   * 调用方传入"裸"路径（不带 region 与 locale 前缀），如 `/account/dormant-account`
   * 或 `/account/`。输出：`/hk/account/dormant-account`（en）/
   * `/hk/zh-CN/account/overview`（zh-CN 目录）。
   *
   * 面包屑等若需直接传入已包含 /overview 的完整路径（如 `${subPath}/overview`），
   * 不以 / 结尾，本规则不会重复追加。
   */
  function withRegionAndLocale(href: string | undefined | null): string {
    if (!href) return ''
    if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('#')) return href
    if (!href.startsWith('/')) return href
    let normalized = href
    if (normalized !== '/' && normalized.endsWith('/')) {
      normalized = `${normalized}overview`
    }
    const localeSegment = lang.value === 'en' ? '' : `/${lang.value}`
    return withBase(`${localeSegment}${normalized}`)
  }

  // 跨 region：忽略当前 base，直接构造目标 region 的绝对 URL
  function toRegion(target: 'hk' | 'sg', pathWithinRegion = '/'): string {
    const rest = pathWithinRegion.startsWith('/') ? pathWithinRegion : '/' + pathWithinRegion
    return `/${target}${rest === '/' ? '/' : rest}`
  }

  return { region, withRegionAndLocale, toRegion }
}
