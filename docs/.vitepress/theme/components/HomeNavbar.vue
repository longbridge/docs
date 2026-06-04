<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useData, inBrowser } from 'vitepress'
import { MoreVertical, ExternalLink, Sun, Moon, Globe, Github } from 'lucide-vue-next'
import { NAV_TABS } from '../../../.vitepress/tabs.config'
import { useAIModal } from '../composables/useAIModal'
import { useSearchDialog } from '../composables/useSearchDialog'
import { useColorMode } from '../composables/useColorMode'
import { useI18n } from '../../i18n/useI18n'

const route = useRoute()
const { lang } = useData()
const { toggleAIModal } = useAIModal()
const { open: openSearch } = useSearchDialog()
const { isDark, toggle: toggleTheme } = useColorMode()
const { t } = useI18n()

// ── Language switcher ─────────────────────────────────────────
const LANGS = [
  { code: 'en',    label: 'English',   link: '/' },
  { code: 'zh-CN', label: '简体中文', link: '/zh-CN/' },
  { code: 'zh-HK', label: '繁體中文', link: '/zh-HK/' },
]

const langOpen = ref(false)
const langBtnRef = ref<HTMLButtonElement>()
const langPopoverRef = ref<HTMLElement>()

function toggleLang() {
  langOpen.value = !langOpen.value
}

const currentLang = computed(() => {
  const p = route.path
  if (p.startsWith('/zh-CN/')) return 'zh-CN'
  if (p.startsWith('/zh-HK/')) return 'zh-HK'
  return 'en'
})

function switchLang(target: typeof LANGS[number]) {
  if (target.code === currentLang.value) {
    langOpen.value = false
    return
  }
  if (!inBrowser) return
  // 仅切换 locale 前缀，保留后续路径
  const p = route.path
  let rest = p
  for (const code of ['zh-CN', 'zh-HK']) {
    if (rest.startsWith(`/${code}/`)) {
      rest = rest.slice(`/${code}`.length)
      break
    }
  }
  if (!rest.startsWith('/')) rest = '/' + rest
  const nextPath = target.link.replace(/\/$/, '') + rest
  window.location.href = nextPath
}

const activeTab = computed(() => {
  const p = route.path
  const tab = NAV_TABS.find(t =>
    p === t.path || t.categories.some(c => p.startsWith('/' + c + '/'))
  )
  return tab?.path ?? null
})

// ── Kebab "more" menu ─────────────────────────────────────────
const moreOpen = ref(false)
const moreBtnRef = ref<HTMLButtonElement>()
const morePopoverRef = ref<HTMLElement>()

function toggleMore() {
  moreOpen.value = !moreOpen.value
}

function onDocClick(e: MouseEvent) {
  const target = e.target as Node
  if (moreOpen.value) {
    if (!moreBtnRef.value?.contains(target) && !morePopoverRef.value?.contains(target)) {
      moreOpen.value = false
    }
  }
  if (langOpen.value) {
    if (!langBtnRef.value?.contains(target) && !langPopoverRef.value?.contains(target)) {
      langOpen.value = false
    }
  }
}

function onDocKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    moreOpen.value = false
    langOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onDocKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onDocKey)
})
</script>

<template>
  <nav class="hn-root" :aria-label="t('brand.mainNavAriaLabel')">
    <!-- 第一行 -->
    <div class="hn-top-bar">
      <div class="hn-container">
        <!-- Logo -->
        <a href="/" class="hn-logo" :aria-label="t('brand.homeAriaLabel')">
          <img
            src="https://assets.lbctrl.com/uploads/34ee0a83-6f70-4aea-aa49-7ba5df3c64c4/longbridge-light.png"
            :alt="t('brand.logoAlt')"
            class="hn-logo-img hn-logo-img--light"
          />
          <img
            src="https://assets.lbctrl.com/uploads/e8c481df-25aa-4e17-baee-953f9ae2cecf/longbridge-dark.png"
            :alt="t('brand.logoAlt')"
            class="hn-logo-img hn-logo-img--dark"
          />
        </a>

        <!-- 搜索 + Ask AI -->
        <div class="hn-center">
          <button class="hn-search-btn" @click="openSearch" :aria-label="t('common.search')">
            <svg class="hn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="7" cy="7" r="4.5"/>
              <path d="m10.5 10.5 2.5 2.5" stroke-linecap="round"/>
            </svg>
            <span class="hn-search-label">{{ t('common.search') }}</span>
            <kbd class="hn-kbd">⌘K</kbd>
          </button>
          <button class="hn-askai-btn" @click="toggleAIModal()" :aria-label="t('common.askAi')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="hn-sparkle flex-shrink-0" aria-hidden="true">
              <path d="M7.111 2.34728C7.29334 1.80026 8.06709 1.80026 8.24942 2.34728L9.5054 6.1152C9.56512 6.29437 9.70571 6.43496 9.88487 6.49468L13.6528 7.75065C14.1998 7.93299 14.1998 8.70673 13.6528 8.88907L9.88487 10.145C9.70571 10.2048 9.56512 10.3454 9.5054 10.5245L8.24942 14.2924C8.06709 14.8395 7.29334 14.8395 7.111 14.2924L5.85503 10.5245C5.79531 10.3454 5.65472 10.2048 5.47556 10.145L1.70763 8.88907C1.16061 8.70673 1.16061 7.93299 1.70763 7.75065L5.47556 6.49468C5.65472 6.43496 5.79531 6.29437 5.85503 6.1152L7.111 2.34728Z" fill="currentColor"/>
              <path d="M13.0648 1.0138C13.1937 0.665555 13.6862 0.665555 13.8151 1.0138L14.0676 1.69612C14.1081 1.80561 14.1944 1.89194 14.3039 1.93245L14.9862 2.18493C15.3345 2.31379 15.3345 2.80635 14.9862 2.93521L14.3039 3.18769C14.1944 3.22821 14.1081 3.31453 14.0676 3.42402L13.8151 4.10634C13.6862 4.45459 13.1937 4.45459 13.0648 4.10634L12.8123 3.42402C12.7718 3.31453 12.6855 3.22821 12.576 3.18769L11.8937 2.93521C11.5454 2.80635 11.5454 2.31379 11.8937 2.18493L12.576 1.93245C12.6855 1.89194 12.7718 1.80561 12.8123 1.69612L13.0648 1.0138Z" fill="currentColor"/>
            </svg>
            <span class="max-md:hidden">{{ t('brand.askAiBtn') }}</span>
          </button>
        </div>

        <!-- 右侧操作区 -->
        <div class="hn-actions">
          <!-- 语言切换（点击展开） -->
          <div class="hn-lang">
            <button
              ref="langBtnRef"
              type="button"
              class="hn-icon-btn"
              :aria-label="t('common.switchLanguage')"
              :aria-expanded="langOpen"
              aria-haspopup="true"
              @click="toggleLang"
            >
              <Globe :size="16" />
            </button>
            <Transition name="hn-lang-fade">
              <div
                v-if="langOpen"
                ref="langPopoverRef"
                class="hn-lang-popover"
                role="menu"
              >
                <a
                  v-for="l in LANGS"
                  :key="l.code"
                  href="#"
                  class="hn-lang-item"
                  :class="{ 'is-active': l.code === currentLang }"
                  role="menuitem"
                  @click.prevent="switchLang(l)"
                >
                  {{ l.label }}
                </a>
              </div>
            </Transition>
          </div>

          <!-- 主题切换 -->
          <button
            type="button"
            class="hn-icon-btn"
            :aria-label="isDark ? t('common.switchToLight') : t('common.switchToDark')"
            @click="toggleTheme"
          >
            <Sun v-if="isDark" :size="16" />
            <Moon v-else :size="16" />
          </button>

          <!-- GitHub -->
          <a
            class="hn-icon-btn"
            href="https://github.com/longbridge/docs"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <Github :size="16" />
          </a>

          <!-- Kebab 更多菜单（md 以下显示） -->
          <div class="hn-more">
            <button
              ref="moreBtnRef"
              class="hn-more-btn"
              :aria-label="t('common.more')"
              :aria-expanded="moreOpen"
              aria-haspopup="true"
              @click="toggleMore"
            >
              <MoreVertical :size="18" />
            </button>
            <Transition name="hn-more-fade">
              <div v-if="moreOpen" ref="morePopoverRef" class="hn-more-popover" role="menu">
                <a
                  href="https://open.longbridge.com"
                  class="hn-more-item"
                  target="_blank"
                  rel="noopener"
                  role="menuitem"
                  @click="moreOpen = false"
                >
                  {{ t('brand.devPlatformLabel') }}
                  <ExternalLink :size="13" />
                </a>
                <div class="hn-more-divider" />
                <a
                  v-for="tab in NAV_TABS"
                  :key="tab.path"
                  :href="tab.path"
                  class="hn-more-item"
                  :class="{ 'is-active': activeTab === tab.path }"
                  role="menuitem"
                  @click="moreOpen = false"
                >{{ t(tab.label) }}</a>
              </div>
            </Transition>
          </div>

        </div>
      </div>
    </div>

  </nav>
</template>
