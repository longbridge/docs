import { ref } from 'vue'
import { inBrowser, withBase } from 'vitepress'

// region 优先级：URL 第一段 > cookie > 'hk' 默认。
// URL 是当前实际访问的 region，必须最权威；cookie 仅在 URL 无 region 段时兜底
// （e.g. 用户从子页 / 站外 fallback 到首页）。单次 build 内 region 是恒定的
// （VitePress base = /<region>/）。useRegion 主要给跨 region 跳转用：构造目标 region 的绝对 URL。
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

  // 当前 region 内的路径：直接走 vitepress withBase（base 已 = /<region>/）。
  // 适合 <a :href> 这种非 router-link 的硬链接。
  function withRegion(href: string | undefined | null): string {
    if (!href) return ''
    if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('#')) return href
    if (!href.startsWith('/')) return href
    return withBase(href)
  }

  // 跨 region 跳转：忽略当前 base，直接构造目标 region 的绝对 URL
  function toRegion(target: 'hk' | 'sg', pathWithinRegion = '/'): string {
    const rest = pathWithinRegion.startsWith('/') ? pathWithinRegion : '/' + pathWithinRegion
    return `/${target}${rest === '/' ? '/' : rest}`
  }

  return { region, withRegion, toRegion }
}
