// 轻量 SPA 导航 (无 astro:transitions 时的替代)。
// 文章页之间点击站内链接：只替换正文 (+移动 TOC FAB/抽屉),侧栏/头/尾 DOM 全程保留
// → 零闪动、展开态天然保持。任何异常回退整页导航。

import { config } from './config'

const MAIN_SEL = '.article-page__main'

function normPath(p: string): string {
  return p.length > 1 ? p.replace(/\/$/, '') : p
}

function shouldIntercept(a: HTMLAnchorElement, e: MouseEvent): boolean {
  if (e.defaultPrevented) return false
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false
  if (!a || a.target === '_blank' || a.hasAttribute('download')) return false
  const rawHref = a.getAttribute('href') ?? ''
  if (!rawHref || rawHref.startsWith('#')) return false
  let url: URL
  try {
    url = new URL(a.href, location.href)
  } catch {
    return false
  }
  if (url.origin !== location.origin) return false
  // 只接管同语言的文章页之间跳转。跨语言(语言切换链接)要整页换 <html lang>、文案、搜索索引与存储键;
  // 非文章链接(首页 / 分类页 / 营销站 / PDF)也走整页，避免先 fetch 一遍再回退
  if (a.closest('[data-lb-locale-links]')) return false
  if (!url.pathname.startsWith(config.prefix + '/support/topics/')) return false
  if (normPath(url.pathname) === normPath(location.pathname)) return false // 同页 (含纯锚点)
  // 仅在当前是文章页 (存在 .article-page__main) 时接管;否则走整页导航
  if (!document.querySelector(MAIN_SEL)) return false
  return true
}

let navigating = false

async function navigate(href: string, push: boolean): Promise<void> {
  if (navigating) return
  navigating = true
  try {
    const res = await fetch(href, {
      headers: { 'X-Requested-With': 'spa' },
      credentials: 'same-origin',
    })
    if (!res.ok) throw new Error('bad status')
    const html = await res.text()
    const doc = new DOMParser().parseFromString(html, 'text/html')

    const newMain = doc.querySelector(MAIN_SEL)
    const curMain = document.querySelector(MAIN_SEL)
    if (!newMain || !curMain) {
      location.href = href
      return
    }
    curMain.replaceWith(newMain)

    document.title = doc.title
    // 语言切换链接(顶栏菜单 + 移动端抽屉)指向「当前文章的其它语言版本」,随正文一起换掉，否则会切回上一篇
    const fresh = doc.querySelectorAll('[data-lb-locale-links]')
    document.querySelectorAll('[data-lb-locale-links]').forEach((el, i) => {
      if (fresh[i]) el.innerHTML = fresh[i].innerHTML
    })

    if (push) history.pushState({ lbSpa: true }, '', href)

    updateSidebarCurrent(normPath(new URL(href, location.href).pathname))
    closeOverlays()
    window.scrollTo(0, 0)

    // 通知正文脚本重跑 (TOC 重建、votes/recent 重绑、移动抽屉重绑)
    document.dispatchEvent(new CustomEvent('lb:content-swapped'))
  } catch {
    location.href = href
  } finally {
    navigating = false
  }
}

// 侧栏 (桌面 aside + 移动 cat-drawer 共用 .side-tree) 更新当前项高亮 + 展开其 cat/sec。
// 侧栏 DOM 不重建，只切 class，不影响用户已展开的其他分类。
function updateSidebarCurrent(norm: string): void {
  document.querySelectorAll<HTMLElement>('.side-tree').forEach((tree) => {
    // 按 slug 比对：同一篇文章可经任意分类段访问(/support/topics/{任意}/{slug}),整条路径不一定相同
    const slug = norm.split('/').pop()
    tree.querySelectorAll<HTMLAnchorElement>('.side-tree__item').forEach((a) => {
      const isCur = a.dataset.slug === slug
      a.classList.toggle('is-current', isCur)
      if (isCur) {
        a.setAttribute('aria-current', 'page')
        const sec = a.closest<HTMLElement>('.side-tree__sec')
        const cat = a.closest<HTMLElement>('.side-tree__cat')
        if (sec && !sec.classList.contains('is-open')) {
          sec.classList.add('is-open')
          sec.querySelector('.side-tree__sec-head')?.setAttribute('aria-expanded', 'true')
        }
        if (cat && !cat.classList.contains('is-open')) {
          cat.classList.add('is-open')
          cat.querySelector('.side-tree__cat-head')?.setAttribute('aria-expanded', 'true')
        }
      } else {
        a.removeAttribute('aria-current')
      }
    })
  })
}

function closeOverlays(): void {
  const cd = document.getElementById('lb-cat-drawer')
  if (cd && !cd.hasAttribute('hidden')) {
    cd.setAttribute('hidden', '')
    cd.setAttribute('aria-hidden', 'true')
    document.documentElement.classList.remove('lb-drawer-open')
  }
}

document.addEventListener('click', (e) => {
  const a = (e.target as Element)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!a || !shouldIntercept(a, e)) return
  e.preventDefault()
  navigate(a.href, true)
})

window.addEventListener('popstate', () => {
  if (document.querySelector(MAIN_SEL)) navigate(location.href, false)
})
