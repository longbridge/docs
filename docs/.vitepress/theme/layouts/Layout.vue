<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useData, useRoute, inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeNavbar from '../components/HomeNavbar.vue'
import PageHero from '../components/PageHero.vue'
import PageFeedback from '../components/PageFeedback.vue'
import AiChatDrawer from '../components/AiChatDrawer.vue'
import SearchDialog from '../components/SearchDialog.vue'
import { useAIModal } from '../composables/useAIModal'
import { useI18n } from '../../i18n/useI18n'

const { frontmatter } = useData()

const isDocPage = computed(() => {
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc'
})

const isHomePage = computed(() => frontmatter.value.layout === 'page')

const { modalOpen, initialQuery, openAIModal } = useAIModal()
const { t } = useI18n()

function syncHomeClass(val: boolean) {
  if (!inBrowser) return
  document.documentElement.classList.toggle('home-page-layout', val)
}
watch(isHomePage, syncHomeClass, { immediate: true })
onMounted(() => {
  if (!inBrowser) return
  document.documentElement.classList.add('custom-nav-layout')
  syncHomeClass(isHomePage.value)
})
onBeforeUnmount(() => {
  if (!inBrowser) return
  document.documentElement.classList.remove('custom-nav-layout')
  document.documentElement.classList.remove('home-page-layout')
})

watch(modalOpen, (open) => {
  if (!inBrowser) return
  document.documentElement.classList.toggle('ai-drawer-open', open)
}, { immediate: true })

// 文章页：把侧边栏激活项滚动到视口中间（仅初次进入或路由切换时执行一次）
const route = useRoute()
async function centerActiveSidebarItem() {
  if (!inBrowser) return
  await nextTick()
  // 等 sidebar 渲染完毕（VitePress 切换路由后，is-active 类是异步打的）
  requestAnimationFrame(() => {
    const sidebar = document.querySelector<HTMLElement>('.VPSidebar')
    if (!sidebar) return
    const active = sidebar.querySelector<HTMLElement>('.VPSidebarItem.is-active > .item > .link, .VPSidebarItem.is-active .link.active, a.link.active, .VPSidebarItem.is-active')
    if (!active) return
    const sRect = sidebar.getBoundingClientRect()
    const aRect = active.getBoundingClientRect()
    // 把激活项相对 sidebar 顶部的偏移移到 sidebar 视口高度的一半
    const target = sidebar.scrollTop + (aRect.top - sRect.top) - sRect.height / 2 + aRect.height / 2
    sidebar.scrollTo({ top: Math.max(0, target), behavior: 'auto' })
  })
}
watch(() => route.path, centerActiveSidebarItem, { immediate: true })
onMounted(centerActiveSidebarItem)
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <HomeNavbar />
    </template>
    <template #doc-before>
      <PageHero v-if="isDocPage" />
    </template>
    <template #doc-after>
      <PageFeedback v-if="isDocPage" />
    </template>
    <template #layout-bottom>
      <SearchDialog />
      <AiChatDrawer v-model="modalOpen" :initial-query="initialQuery" />
      <button
        v-if="!isHomePage"
        v-show="!modalOpen"
        class="ai-fab-mobile fixed bottom-7 right-7 w-12 h-12 rounded-full bg-brand-1 text-white border-0 cursor-pointer flex items-center justify-center z-[999] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5"
        style="box-shadow: 0 4px 16px var(--vp-c-brand-soft);"
        @click="openAIModal()"
        :aria-label="t('common.openAiAssistant')"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
            fill="currentColor" />
        </svg>
      </button>
    </template>
  </DefaultTheme.Layout>
</template>
