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
