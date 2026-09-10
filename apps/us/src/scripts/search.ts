/**
 * search.ts — Zendesk-style search modal backed by Pagefind (Task 6)
 * Ports header.hbs:164-328; replaces Zendesk API with Pagefind lazy-load.
 */

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

  async function ensurePagefind() {
    if (pagefind) return pagefind
    try {
      // trailingSlash:'never' 下 BASE_URL 不带尾斜杠 ('/us/en/support'),必须规范化后再拼路径，
      // 否则得到 '/us/en/supportpagefind/…' → 404 → 搜索在构建站上也不可用
      const base = import.meta.env.BASE_URL.replace(/\/$/, '')
      pagefind = await import(/* @vite-ignore */ base + '/pagefind/pagefind.js')
      // 索引以 dist 根为基准记 URL(无 base 前缀),让 Pagefind 自动把 base 拼到每条结果 url 上
      await pagefind.options({ baseUrl: base + '/' })
      await pagefind.init()
    } catch {
      pagefind = null // dev server has no index; gracefully degrade
    }
    return pagefind
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

  function esc(s: string): string {
    return String(s).replace(/[&<>"]/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c
    )
  }

  function highlight(s: string, q: string): string {
    if (!q) return esc(s)
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig')
    return esc(s).replace(re, '<mark>$1</mark>')
  }

  // ── State messages ────────────────────────────────────────────────────────

  function showHint(t: string) {
    results!.innerHTML = '<div class="lb-search-modal__hint">' + esc(t) + '</div>'
  }
  function showEmpty(q: string) {
    results!.innerHTML = '<div class="lb-search-modal__empty">No results for &ldquo;' + esc(q) + '&rdquo;</div>'
  }
  function showLoading() {
    results!.innerHTML = '<div class="lb-search-modal__loading">Searching&hellip;</div>'
  }
  function renderHint() {
    results!.innerHTML =
      '<div class="lb-search-modal__hint">Search is available on the built site — run <code>astro preview</code></div>'
  }

  // ── Recently viewed(记录点击过的文章 {title,url},不是搜索词)──────────────
  // v2:数据模型从 string[](搜索词) 改为 {title,url}[](点击的文章);老 v1 数据自然被忽略

  type HistoryItem = { title: string; url: string }
  const HISTORY_KEY = 'lb_search_history_v2'
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
    const list = readHistory()
    if (!list.length) { showHint('Type to search articles...'); return }

    let out =
      '<div class="lb-search-modal__history">' +
      '  <div class="lb-search-modal__history-head">' +
      '    <span class="lb-search-modal__history-label">Recently viewed</span>' +
      '    <button type="button" class="lb-search-modal__history-clear" data-clear-history>Clear</button>' +
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
        '  <button type="button" class="lb-search-modal__history-remove" data-remove-history data-history-url="' + esc(it.url) + '" aria-label="Remove">' + REMOVE_SVG + '</button>' +
        '</li>'
    })
    out += '</ul></div>'
    results!.innerHTML = out
  }

  // ── Search ────────────────────────────────────────────────────────────────

  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  let lastQuery = ''

  async function run(q: string) {
    if (q === lastQuery && !results!.querySelector('.lb-search-modal__loading')) return
    lastQuery = q
    if (!q) { showHint('Type to search articles...'); return }
    showLoading()

    const pf = await ensurePagefind()
    if (!pf) { renderHint(); return }

    const search = await pf.debouncedSearch(q)
    if (!search) return // stale call cancelled by Pagefind

    const items = await Promise.all(
      search.results.slice(0, 10).map((r: any) => r.data())
    )

    if (!items.length) { showEmpty(q); return }

    let out = '<ul class="lb-search-modal__list">'
    items.forEach((a: any) => {
      // Pagefind: a.url, a.meta.title, a.excerpt (already has <mark> tags)
      const title = (a.meta && a.meta.title) || ''
      const snippet = a.excerpt || ''
      // build.format:'file' 产出 {path}.html，对外 URL 无扩展名 (trailingSlash: never)→ 去掉 .html
      const url = String(a.url || '').replace(/\/index\.html$/, '/').replace(/\.html$/, '')
      out +=
        '<li>' +
        '<a class="lb-search-modal__item" href="' + esc(url) + '">' +
        '<span class="lb-search-modal__title">' + highlight(title, q) + '</span>' +
        '<p class="lb-search-modal__snippet">' + snippet + '</p>' +
        '</a></li>'
    })
    out += '</ul>'
    results!.innerHTML = out
  }

  function trigger() {
    if (debounceTimer !== null) clearTimeout(debounceTimer)
    const q = modalInput!.value.trim()
    if (!q) { lastQuery = ''; showHistory(); return }
    debounceTimer = setTimeout(() => { run(q) }, 250)
  }

  // ── Open / Close ──────────────────────────────────────────────────────────

  function openModal(seed?: string) {
    modal!.hidden = false
    modal!.setAttribute('aria-hidden', 'false')
    document.documentElement.classList.add('lb-search-open')
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
  modal!.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    if (target?.hasAttribute('data-close')) closeModal()
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
