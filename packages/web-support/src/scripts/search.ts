/**
 * search.ts — 搜索弹层(移植自 apps/us):Pagefind 静态索引先出结果，
 * 后台同时调 CMS 搜索接口(v2/support/topics/search)补齐静态索引里没有的文章，按 slug 去重合并。
 */
import { fmt } from '../lib/i18n'
import { config, supportFetch, t } from './config'

const modal = document.getElementById('lb-search-modal') as HTMLElement | null
const modalInput = document.getElementById('lb-search-input') as HTMLInputElement | null
const results = document.getElementById('lb-search-results') as HTMLElement | null

;(function init() {
  if (!modal || !modalInput || !results) {
    console.error('[search] Required DOM nodes missing')
    return
  }

  // ── Pagefind lazy loader ──────────────────────────────────────────────────

  let pagefind: any = null
  let pagefindPromise: Promise<any> | null = null

  // 去掉自家防抖后每次按键都会走到这里 (且 openModal 会提前预热),用 in-flight promise 去重，
  // 避免并发重复 import / options / init
  function ensurePagefind(): Promise<any> {
    if (pagefind) return Promise.resolve(pagefind)
    if (pagefindPromise) return pagefindPromise
    pagefindPromise = (async () => {
      try {
        // 索引产物在 dist/support/pagefind(见 app build 脚本 --output-subdir);
        // 按 <html lang> 自动只加载当前语言的分片。结果链接取文章页写入的 meta.href,不用 Pagefind 的文件 url
        const pf = await import(/* @vite-ignore */ `/${config.region}/support/pagefind/pagefind.js`)
        await pf.init()
        pagefind = pf
      } catch {
        pagefind = null // dev server has no index; gracefully degrade
        pagefindPromise = null // 加载失败允许下次重试
      }
      return pagefind
    })()
    return pagefindPromise
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

  function esc(s: string): string {
    return String(s).replace(/[&<>"]/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c
    )
  }

  // 在原文上切分后逐段转义，避免查询词命中实体(如 "amp" 命中 &amp;)把实体拆坏
  function highlight(s: string, q: string): string {
    if (!q) return esc(s)
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig')
    return String(s).split(re).map((part, i) => (i % 2 === 1 ? '<mark>' + esc(part) + '</mark>' : esc(part))).join('')
  }

  // ── State messages ────────────────────────────────────────────────────────

  function showHint(t: string) {
    results!.innerHTML = '<div class="lb-search-modal__hint">' + esc(t) + '</div>'
  }
  function showEmpty(q: string) {
    results!.innerHTML =
      '<div class="lb-search-modal__empty">' + esc(fmt(t.noResults, { q })) + '<br />' + esc(t.tryDifferent) + '</div>'
  }
  function showLoading() {
    results!.innerHTML = '<div class="lb-search-modal__loading">' + esc(t.searching) + '</div>'
  }

  const stripTags = (html: string) =>
    String(html || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  const topicHref = (categorySlug: string, slug: string) => `${config.prefix}/support/topics/${categorySlug}/${slug}`
  const slugOf = (url: string) => url.split('?')[0].replace(/\/$/, '').split('/').pop() ?? ''

  interface Hit { title: string; url: string; snippetHtml: string }

  async function pagefindHits(q: string): Promise<Hit[] | null> {
    const pf = await ensurePagefind()
    if (!pf) return []
    const search = await pf.debouncedSearch(q)
    if (!search) return null // 被更新的输入取消
    const items = await Promise.all(search.results.slice(0, 10).map((r: any) => r.data()))
    return items
      .filter((a: any) => a?.meta?.href)
      .map((a: any) => ({ title: a.meta.title || '', url: a.meta.href, snippetHtml: a.excerpt || '' }))
  }

  async function apiHits(q: string): Promise<Hit[]> {
    try {
      const data = await supportFetch('/v2/support/topics/search?keyword=' + encodeURIComponent(q))
      return (data?.results ?? [])
        .filter((r: any) => r?.category_slug && r?.topic_slug)
        .map((r: any) => ({
          title: stripTags(r.title),
          url: topicHref(r.category_slug, r.topic_slug),
          // 接口高亮是 HTML 片段，统一去标签后本地重新高亮，不把接口 HTML 直接插进页面
          snippetHtml: highlight(stripTags(r.hit_content).slice(0, 200), q),
        }))
    } catch {
      return []
    }
  }

  function renderHits(q: string, hits: Hit[]) {
    let out = '<ul class="lb-search-modal__list">'
    hits.forEach((a) => {
      out +=
        '<li>' +
        '<a class="lb-search-modal__item" href="' + esc(a.url) + '">' +
        '<span class="lb-search-modal__title">' + highlight(a.title, q) + '</span>' +
        '<p class="lb-search-modal__snippet">' + a.snippetHtml + '</p>' +
        '</a></li>'
    })
    out += '</ul>'
    results!.innerHTML = out
  }

  // ── Recently viewed(记录点击过的文章 {title,url},不是搜索词)──────────────
  // v2:数据模型从 string[](搜索词) 改为 {title,url}[](点击的文章);老 v1 数据自然被忽略

  type HistoryItem = { title: string; url: string }
  // 与 US 帮助中心同域(longbridge.com),键名按地区 + 语言隔离，避免串读别站记录
  const HISTORY_KEY = `lb_support_search_history_${config.region}_${config.locale}`
  const HISTORY_LIMIT = 10

  function readHistory(): HistoryItem[] {
    try {
      const arr = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]')
      return Array.isArray(arr)
        ? arr.filter((x: any) => x && typeof x.title === 'string' && typeof x.url === 'string')
        : []
    } catch { return [] }
  }
  function writeHistory(list: HistoryItem[]) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(list)) } catch { /* quota exceeded */ }
  }
  function saveHistoryArticle(title: string, url: string) {
    const t = title.trim(), u = url.trim()
    if (!t || !u) return
    const list = readHistory().filter((h) => h.url !== u) // 按 url 去重，重复点击挪到最前
    list.unshift({ title: t, url: u })
    writeHistory(list.slice(0, HISTORY_LIMIT))
  }
  function removeHistoryArticle(url: string) {
    if (!url) return
    writeHistory(readHistory().filter((h) => h.url !== url))
  }
  function clearHistoryList() { writeHistory([]) }

  const CLOCK_SVG =
    '<svg class="lb-search-modal__history-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
  const REMOVE_SVG =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>'

  function showHistory() {
    // 面板不再显示任何查询的结果，必须清掉 lastQuery:否则 run() 的去重会把"再次输入同一个词"
    // 当成结果已在屏上而直接跳过 (关闭后点按钮重开 → 粘贴同一个词 → 一直停在最近浏览)
    lastQuery = ''
    const list = readHistory()
    if (!list.length) { showHint(t.searchHint); return }

    let out =
      '<div class="lb-search-modal__history">' +
      '  <div class="lb-search-modal__history-head">' +
      '    <span class="lb-search-modal__history-label">' + esc(t.recentlyViewed) + '</span>' +
      '    <button type="button" class="lb-search-modal__history-clear" data-clear-history>' + esc(t.clear) + '</button>' +
      '  </div>' +
      '  <ul class="lb-search-modal__history-list">'

    // 历史行本身就是文章链接 (<a>),点击直接跳转;× 按钮按 url 删除
    list.forEach((it) => {
      out +=
        '<li class="lb-search-modal__history-row">' +
        '  <a class="lb-search-modal__history-item" href="' + esc(it.url) + '">' +
        CLOCK_SVG +
        '    <span class="lb-search-modal__history-title">' + esc(it.title) + '</span>' +
        '  </a>' +
        '  <button type="button" class="lb-search-modal__history-remove" data-remove-history data-history-url="' + esc(it.url) + '" aria-label="' + esc(t.remove) + '">' + REMOVE_SVG + '</button>' +
        '</li>'
    })
    out += '</ul></div>'
    results!.innerHTML = out
  }

  // ── Search ────────────────────────────────────────────────────────────────

  let lastQuery = ''

  async function run(q: string) {
    if (q === lastQuery && !results!.querySelector('.lb-search-modal__loading')) return
    lastQuery = q
    if (!q) { showHint(t.searchHint); return }
    showLoading()

    const apiPromise = apiHits(q)
    const local = await pagefindHits(q)
    if (local === null || q !== lastQuery) return
    if (local.length) renderHits(q, local)

    const remote = await apiPromise
    if (q !== lastQuery) return
    const seen = new Set(local.map((h) => slugOf(h.url)))
    const merged = [...local, ...remote.filter((h) => !seen.has(slugOf(h.url)))].slice(0, 20)
    if (!merged.length) { showEmpty(q); return }
    if (merged.length > local.length) renderHits(q, merged)
  }

  // 不再自套 setTimeout:Pagefind 的 debouncedSearch 已内置 300ms 防抖 + 索引预加载，
  // 叠加自家防抖只会让用户多等一截 (之前 250 + 300 = 550ms 才开始查)
  function trigger() {
    const q = modalInput!.value.trim()
    if (!q) { showHistory(); return }
    run(q)
  }

  // ── Open / Close ──────────────────────────────────────────────────────────

  function openModal(seed?: string) {
    modal!.hidden = false
    modal!.setAttribute('aria-hidden', 'false')
    document.documentElement.classList.add('lb-search-open')
    // 打开即后台预热 Pagefind(运行时 + WASM + 索引),用户读界面/打字期间就加载好，首查不卡冷启动
    void ensurePagefind()
    if (typeof seed === 'string') modalInput!.value = seed
    setTimeout(() => {
      modalInput!.focus()
      try {
        const end = modalInput!.value.length
        modalInput!.setSelectionRange(end, end)
      } catch { /* readonly input */ }
    }, 20)
    const q = modalInput!.value.trim()
    if (q) run(q); else showHistory()
  }

  function closeModal() {
    modal!.hidden = true
    modal!.setAttribute('aria-hidden', 'true')
    document.documentElement.classList.remove('lb-search-open')
  }

  // Expose global opener for hero / hot-tags (Task 7 will call window.lbOpenSearch)
  ;(window as any).lbOpenSearch = openModal

  // ── Event wiring ──────────────────────────────────────────────────────────

  // Input debounce
  modalInput!.addEventListener('input', trigger)

  // Close on [data-close] click inside modal (backdrop + close button)
  // closest 而非 hasAttribute:点到关闭按钮内部的 svg/path 时也能冒泡命中 [data-close]
  // (App 触摸必点在 × 图标上，hasAttribute 拿到的是 svg/path 而非 button → 之前关不掉)
  modal!.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    if (target?.closest('[data-close]')) closeModal()
  })

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (!modal!.hidden && e.key === 'Escape') closeModal()
  })

  // ⌘/Ctrl+K to open
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault()
      openModal(modalInput!.value.trim())
    }
  })

  // Delegated click: search buttons + any .lb-search-modal-trigger
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    if (!target) return
    const btn = target.closest('.lb-header-search-btn, .lb-search-modal-trigger')
    if (btn) { e.preventDefault(); openModal('') }
  })

  // Capture-phase delegated: history interactions + save query + close on result click
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest) return

      // Remove single history item (by url)
      const rm = target.closest('[data-remove-history]') as HTMLElement | null
      if (rm && results!.contains(rm)) {
        removeHistoryArticle(rm.getAttribute('data-history-url') ?? '')
        showHistory()
        e.preventDefault()
        e.stopPropagation()
        return
      }

      // Clear all history
      const clr = target.closest('[data-clear-history]')
      if (clr && results!.contains(clr)) {
        clearHistoryList()
        showHistory()
        e.preventDefault()
        return
      }

      // 文章链接点击 (搜索结果 或 历史记录):存下点击的文章 {title,url},再关闭;
      // 浏览器按 <a href> 正常跳转。历史行本身也是文章链接，重复点会被挪到最前。
      const a = target.closest('a[href]') as HTMLAnchorElement | null
      if (!a || !results!.contains(a)) return
      const url = a.getAttribute('href') ?? ''
      const titleEl = a.querySelector('.lb-search-modal__title, .lb-search-modal__history-title')
      const title = (titleEl?.textContent ?? '').trim()
      if (title && url) saveHistoryArticle(title, url)
      setTimeout(closeModal, 0)
    },
    true // capture phase
  )

  // Auto-open when landing with ?q=
  const initQ = new URLSearchParams(location.search).get('q')
  if (initQ) {
    setTimeout(() => {
      openModal(initQ)
      try { history.replaceState(null, '', location.pathname) } catch { /* private browsing */ }
    }, 60)
  }
})()
