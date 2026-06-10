import { ref } from 'vue'
import { inBrowser, useData } from 'vitepress'

// region 优先级：URL 第一段 > cookie > 'hk' 默认。
// 单 VitePress 实例下 base=/，region 完全由 URL 路径段决定。
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
   *   2. 目录路径（以 / 结尾，且非根 /）：自动补 overview
   *   3. lang === 'en'（root locale）：路径不带语言段
   *   4. lang === 'zh-CN' / 'zh-HK'：前缀 /<lang>
   *   5. 显式前缀当前 region（base=/，VitePress 不会自动加 region 段）
   *
   * 调用方传入"裸"路径（不带 region 与 locale 前缀），如 `/account/dormant-account`
   * 或 `/account/`。输出：`/hk/account/dormant-account`（en）/
   * `/hk/zh-CN/account/overview`（zh-CN 目录）。
   *
   * 幂等：href 已含 region/locale 前缀也能安全处理（先 strip 再重组）。
   */
  function withRegionAndLocale(href: string | undefined | null): string {
    if (!href) return ''
    if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('#')) return href
    if (!href.startsWith('/')) return href
    // strip 已有 region + locale 前缀，保证 idempotent
    let bare = href.replace(/^\/(hk|sg)(\/(zh-CN|zh-HK))?/, '')
    if (!bare.startsWith('/')) bare = '/' + bare
    if (bare !== '/' && bare.endsWith('/')) bare = `${bare}overview`
    const localeSegment = lang.value === 'en' ? '' : `/${lang.value}`
    return `/${region.value}${localeSegment}${bare}`
  }

  // 跨 region：构造目标 region 的绝对 URL（忽略当前 region/locale）
  function toRegion(target: 'hk' | 'sg', pathWithinRegion = '/'): string {
    const rest = pathWithinRegion.startsWith('/') ? pathWithinRegion : '/' + pathWithinRegion
    return `/${target}${rest === '/' ? '/' : rest}`
  }

  return { region, withRegionAndLocale, toRegion }
}
