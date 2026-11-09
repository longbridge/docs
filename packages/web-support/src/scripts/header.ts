import { config } from './config'

/**
 * Header interactions — vanilla TypeScript, no framework.
 * Handles: I1 scroll transition, I2 mega-menu, I11 region switch,
 * theme toggle.
 */

// ── Scroll transition (I1) ─────────────────────────────────────────────────
;(function initScroll() {
  const header = document.getElementById('lb-header') as HTMLElement | null
  if (!header) return

  // Transparent state depends on a .hero element being present, not a static attribute
  const hero = document.querySelector('.hero')
  if (hero) {
    header.classList.add('header--transparent')
  }

  const THRESHOLD = 60
  let ticking = false
  // App WebView 首帧会有一次自发滚动调整：等 500ms 稳定后再取基线，之后相对基线判定;
  // 普通浏览器刷新时恢复的 scrollY 就是用户意图，立即以 0 为基线 (对齐 Zendesk script.js:1031-1060)
  let baselineScrollY = 0
  let armed = false

  function update() {
    ticking = false
    if (!armed) return
    const delta = Math.max(0, window.scrollY - baselineScrollY)
    const isScrolled = delta > THRESHOLD
    header!.classList.toggle('is-scrolled', isScrolled)
    // App 导航栏 (.lb-app-navbar) 的滚动态样式挂在 html.is-scrolled 上
    document.documentElement.classList.toggle('is-scrolled', isScrolled)
  }

  if (document.documentElement.classList.contains('is-whale-app')) {
    setTimeout(() => {
      baselineScrollY = window.scrollY
      armed = true
      update()
    }, 500)
  } else {
    armed = true
    update()
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })
})()


// ── Mega menu (I2) ─────────────────────────────────────────────────────────
;(function initMega() {
  const trigger = document.querySelector<HTMLButtonElement>('[data-lb-dropdown-trigger]')
  const panel   = document.getElementById('lb-mega-menu')
  if (!trigger || !panel) return

  let hoverTimer: ReturnType<typeof setTimeout> | null = null
  let closeTimer: ReturnType<typeof setTimeout> | null = null

  function openMega() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
    panel!.hidden = false
    trigger!.setAttribute('aria-expanded', 'true')
  }

  function closeMega() {
    panel!.hidden = true
    trigger!.setAttribute('aria-expanded', 'false')
  }

  // Hover open with 200ms delay
  trigger.addEventListener('mouseenter', () => {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
    hoverTimer = setTimeout(openMega, 200)
  })
  trigger.addEventListener('mouseleave', () => {
    if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null }
    closeTimer = setTimeout(closeMega, 120)
  })
  panel.addEventListener('mouseenter', () => {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
  })
  panel.addEventListener('mouseleave', () => {
    closeTimer = setTimeout(closeMega, 120)
  })

  // Click toggle
  trigger.addEventListener('click', (e) => {
    e.stopPropagation()
    const expanded = trigger.getAttribute('aria-expanded') === 'true'
    if (expanded) { closeMega() } else { openMega() }
  })

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      closeMega()
      trigger.focus()
    }
  })

  // Outside click
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !panel.contains(e.target as Node) && e.target !== trigger) {
      closeMega()
    }
  })

  // Category tabs: hover/focus/click switches the right panel (data-idx pairs tab ↔ panel by DOM order).
  const tabs = Array.from(panel.querySelectorAll<HTMLElement>('[data-lb-cat-tab]'))
  const panels = Array.from(panel.querySelectorAll<HTMLElement>('.lb-mega__panel'))

  function activate(idx: number) {
    tabs.forEach((t, i) => {
      t.classList.toggle('is-active', i === idx)
      t.setAttribute('aria-selected', i === idx ? 'true' : 'false')
    })
    panels.forEach((p, i) => p.classList.toggle('is-active', i === idx))
  }

  tabs.forEach((t, i) => {
    t.addEventListener('mouseenter', () => activate(i))
    t.addEventListener('focus', () => activate(i))
    // 触屏没有 hover:点分类只切换右侧文章列表，不跳页(分类页已取消)
    t.addEventListener('click', () => activate(i))
  })

})()


// ── Region switch (I11) ────────────────────────────────────────────────────
;(function initRegion() {
  const trigger = document.querySelector<HTMLButtonElement>('[data-lb-region-trigger]')
  const menu    = document.getElementById('lb-region-menu')
  if (!trigger || !menu) return

  function openRegion() {
    menu!.hidden = false
    trigger!.setAttribute('aria-expanded', 'true')
  }

  function closeRegion() {
    menu!.hidden = true
    trigger!.setAttribute('aria-expanded', 'false')
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation()
    const expanded = trigger.getAttribute('aria-expanded') === 'true'
    if (expanded) { closeRegion() } else { openRegion() }
  })

  document.addEventListener('click', (e) => {
    if (!menu.hidden && !menu.contains(e.target as Node) && e.target !== trigger) {
      closeRegion()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      closeRegion()
      trigger.focus()
    }
  })

})()


// ── Theme toggle ───────────────────────────────────────────────────────────
;(function initTheme() {
  const btn = document.querySelector<HTMLButtonElement>('[data-lb-theme-toggle]')
  if (!btn) return

  btn.addEventListener('click', () => {
    const current = (window as any).lbGetThemeMode?.() ?? 'light'
    const next = current === 'dark' ? 'light' : 'dark';
    (window as any).lbSetThemeMode?.(next, true)
  })
})()


// ── 语言偏好 ────────────────────────────────────────────────────────────────
// 点任一语言切换链接(头部 / 抽屉 / 页脚，均带 hreflang)时写官网同名 locale cookie,
// 否则回到不带语言段的默认路径会被 BaseLayout 的 cookie 跳转弹回旧语言。写法对齐官网 @web/cookie setCookie。
;(function initLocalePref() {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a[hreflang]')
    const l = a?.getAttribute('hreflang')
    if (!l || !config.locales.includes(l)) return
    const host = location.hostname
    const domain = host === 'localhost' || host === '127.0.0.1' ? '' : `; domain=.${host.split('.').slice(-2).join('.')}`
    const secure = location.protocol === 'https:' ? '; secure' : ''
    document.cookie = `locale=${encodeURIComponent(l)}; path=/; max-age=${30 * 86400}; samesite=lax${domain}${secure}`
  }, true)
})()
