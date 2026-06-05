import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress'
import 'virtual:uno.css'
import 'markstream-vue/index.css'
import './tailwind.css'
import './style/index.css'
import Layout from './layouts/Layout.vue'
import HomeCards from './components/HomeCards.vue'
import Tabs from './components/Tabs.vue'
import TabItem from './components/TabItem.vue'
import LinkGraph from './components/LinkGraph.vue'
import HomeSupport from './components/HomeSupport.vue'
import HomeNavbar from './components/HomeNavbar.vue'
import Callout from './components/ui/Callout.vue'
import CliCommand from './components/ui/CliCommand.vue'
import Stepper from './components/ui/Stepper.vue'
import StepperPanel from './components/ui/StepperPanel.vue'
import QuickstartList from './components/ui/QuickstartList.vue'
import QuickstartItem from './components/ui/QuickstartItem.vue'
import { i18n } from '../i18n'

// Register Cmd/Ctrl+K interceptor BEFORE any VitePress component mounts,
// so our handler always wins the capture-phase race.
if (inBrowser) {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      e.stopImmediatePropagation()
      window.dispatchEvent(new CustomEvent('lb:search:toggle'))
    }
  }, { capture: true, passive: false })

  // 必须在 VitePress router 注册其全局 click 拦截之前监听，否则点 group link
  // 时 VitePress 会先 router.go() 跳转，我们的 preventDefault 已经晚了。
  // 行为：点击 group 始终触发 caret toggle（展开/收起切换），同时让 VitePress
  // 继续跳转到 overview。跳转完成后路由切换会让目标 group 变 active，VitePress
  // 内置 watchPostEffect 会把它强制展开 —— 由 Layout.vue 的 applyCollapsedPreference
  // 在 post route 阶段把用户的折叠偏好再次应用回 DOM。
  window.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (!target) return
    const link = target.closest<HTMLAnchorElement>('.VPSidebar a.link')
    if (!link) return
    const item = link.parentElement
    if (!item || !item.classList.contains('item')) return
    const group = item.parentElement as HTMLElement | null
    if (!group || !group.classList.contains('VPSidebarItem')) return
    if (!group.classList.contains('collapsible')) return
    const caret = group.querySelector<HTMLElement>(':scope > .item > .caret')
    if (!caret) return
    caret.click()
    window.dispatchEvent(new CustomEvent('lb:sidebar:group-toggled', { detail: { group } }))
  }, { capture: true })
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(i18n)
    app.component('HomeSupport', HomeSupport)
    app.component('HomeNavbar', HomeNavbar)
    app.component('HomeCards', HomeCards)
    app.component('Tabs', Tabs)
    app.component('TabItem', TabItem)
    app.component('LinkGraph', LinkGraph)
    app.component('Callout', Callout)
    app.component('CliCommand', CliCommand)
    app.component('Stepper', Stepper)
    app.component('StepperPanel', StepperPanel)
    app.component('QuickstartList', QuickstartList)
    app.component('QuickstartItem', QuickstartItem)
  },
} satisfies Theme
