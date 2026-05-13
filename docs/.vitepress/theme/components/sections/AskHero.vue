<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vitepress'
import { hotSearchTags } from '../../data/featured-asks'
import UiInput from '../ui/Input.vue'
import UiButton from '../ui/Button.vue'
import HeroGridBg from '../HeroGridBg.vue'
import { useI18n } from '../../../i18n/useI18n'

const openAIModal = inject<(q: string) => void>('openAIModal', () => {})
const router = useRouter()
const { t } = useI18n()

const inputValue = ref('')
const searchPlaceholder = computed(() => t('askHero.placeholder'))
const searchExample = computed(() => t('askHero.placeholderExample'))

function submit() {
  const q = inputValue.value.trim()
  openAIModal(q || searchExample.value)
  inputValue.value = ''
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    submit()
  }
}

function askHot(tag: { q: string; initialPrompt: string }) {
  openAIModal(tag.initialPrompt)
}

function browseAllDocs() {
  router.go('/zh-CN/')
}
</script>

<template>
  <section class="ask-hero">
    <!-- 环境光晕渐变 -->
    <div class="ask-hero__bg" aria-hidden="true" />
    <!-- 科技感网格动画 -->
    <HeroGridBg />

    <div class="ask-hero__inner">
      <!-- 主标题：两行 -->
      <div class="ask-hero__heading">
        <h1 class="ask-hero__title">
          <span class="ask-hero__title-dark">{{ t('askHero.title') }}</span>
          <span class="ask-hero__title-brand">{{ t('askHero.titleEm') }}</span>
        </h1>
        <p class="ask-hero__subtitle">{{ t('askHero.subtitle') }}</p>
      </div>

      <!-- 搜索区 -->
      <div class="ask-hero__search-area">
        <!-- 搜索栏 -->
        <div class="ask-hero__search-bar">
          <svg
            class="ask-hero__search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <UiInput
            v-model="inputValue"
            :placeholder="searchPlaceholder"
            class="ask-hero__search-input"
            @keydown="handleKeydown"
          />
          <UiButton
            size="search"
            class="ask-hero__search-btn"
            @click="submit"
          >
            {{ t('askHero.search') }}
          </UiButton>
        </div>

        <!-- 热搜标签 -->
        <div class="ask-hero__hot-row">
          <svg
            class="ask-hero__hot-icon"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          <span class="ask-hero__hot-label">{{ t('askHero.hotSearchLabel') }}</span>
          <UiButton
            v-for="tag in hotSearchTags"
            :key="tag.q"
            variant="outline"
            size="pill-sm"
            @click="askHot(tag)"
          >
            {{ t(tag.q) }}
          </UiButton>
        </div>
      </div>

      <!-- CTA 按钮组 -->
      <div class="ask-hero__cta">
        <UiButton variant="brand" size="pill" @click="openAIModal('')">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M7.111 2.34728C7.29334 1.80026 8.06709 1.80026 8.24942 2.34728L9.5054 6.1152C9.56512 6.29437 9.70571 6.43496 9.88487 6.49468L13.6528 7.75065C14.1998 7.93299 14.1998 8.70673 13.6528 8.88907L9.88487 10.145C9.70571 10.2048 9.56512 10.3454 9.5054 10.5245L8.24942 14.2924C8.06709 14.8395 7.29334 14.8395 7.111 14.2924L5.85503 10.5245C5.79531 10.3454 5.65472 10.2048 5.47556 10.145L1.70763 8.88907C1.16061 8.70673 1.16061 7.93299 1.70763 7.75065L5.47556 6.49468C5.65472 6.43496 5.79531 6.29437 5.85503 6.1152L7.111 2.34728Z" fill="currentColor"/>
            <path d="M13.0648 1.0138C13.1937 0.665555 13.6862 0.665555 13.8151 1.0138L14.0676 1.69612C14.1081 1.80561 14.1944 1.89194 14.3039 1.93245L14.9862 2.18493C15.3345 2.31379 15.3345 2.80635 14.9862 2.93521L14.3039 3.18769C14.1944 3.22821 14.1081 3.31453 14.0676 3.42402L13.8151 4.10634C13.6862 4.45459 13.1937 4.45459 13.0648 4.10634L12.8123 3.42402C12.7718 3.31453 12.6855 3.22821 12.576 3.18769L11.8937 2.93521C11.5454 2.80635 11.5454 2.31379 11.8937 2.18493L12.576 1.93245C12.6855 1.89194 12.7718 1.80561 12.8123 1.69612L13.0648 1.0138Z" fill="currentColor"/>
          </svg>
          {{ t('askHero.askAi') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </UiButton>
        <UiButton variant="outline" size="pill" @click="browseAllDocs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          {{ t('askHero.browse') }}
        </UiButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── 基础 ─── */
.ask-hero {
  position: relative;
  overflow: hidden;
  background: var(--vp-c-bg);
  padding: 96px 48px 88px;
  text-align: center;
}

/* 背景渐变装饰（顶部中心向下扩散的淡青绿晕光） */
.ask-hero__bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 560px;
  background: radial-gradient(
    ellipse 70% 60% at 50% 0%,
    rgba(0, 184, 184, 0.10) 0%,
    rgba(0, 240, 196, 0.05) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

/* 内容区 z-index 提到背景之上 */
.ask-hero__inner {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* ─── 标题 ─── */
.ask-hero__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.ask-hero__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 0;
  font-size: clamp(52px, 8vw, 88px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.ask-hero__title-dark {
  color: var(--vp-c-text-1);
}

.ask-hero__title-brand {
  color: var(--vp-c-brand-1);
}

.ask-hero__subtitle {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  max-width: 520px;
}

/* ─── 搜索区 ─── */
.ask-hero__search-area {
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* 搜索栏容器 —— 负责整体外边框和视觉形状 */
.ask-hero__search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 6px 0 20px;
  gap: 8px;
  border: 1px solid var(--vp-c-border);
  border-radius: 99px;
  background: var(--vp-c-bg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: border-color 150ms ease-out, box-shadow 150ms ease-out;
}

.ask-hero__search-bar:focus-within {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(0, 184, 184, 0.10);
}

/* 搜索图标 */
.ask-hero__search-icon {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
}

/* 覆盖 UiInput 的边框/背景 —— 在 search-bar 容器内做裸输入框 */
.ask-hero__search-input {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
  border-radius: 0 !important;
  height: 100%;
  padding: 0 4px !important;
  flex: 1;
  min-width: 0;
  font-size: 15px !important;
}

/* 搜索按钮 —— 覆盖圆角到稍圆的矩形 */
.ask-hero__search-btn {
  flex-shrink: 0;
  border-radius: 99px !important;
  font-weight: 600;
}

/* ─── 热搜行 ─── */
.ask-hero__hot-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ask-hero__hot-icon {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.ask-hero__hot-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

/* ─── CTA ─── */
.ask-hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

/* ─── 响应式 ─── */
@media (max-width: 768px) {
  .ask-hero {
    padding: 72px 20px 64px;
  }

  .ask-hero__search-area {
    max-width: 100%;
  }

  .ask-hero__subtitle {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .ask-hero {
    padding: 56px 16px 56px;
  }

  .ask-hero__search-bar {
    height: 52px;
    padding: 0 5px 0 16px;
  }

  .ask-hero__cta {
    flex-direction: column;
    align-items: stretch;
  }
}

/* ── Hero 入场动画 ── */
.ask-hero {
  --anim-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes hero-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes sweep-pass {
  from { transform: translateX(-100%); }
  to   { transform: translateX(300%); }
}

@keyframes search-glow {
  0%, 100% { box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05); }
  50%      { box-shadow: 0 0 0 6px rgba(0, 184, 184, 0.14); }
}

/* 整体内容淡入 */
.ask-hero__inner {
  animation: hero-fade-in 400ms var(--anim-ease) both;
}

/* 品牌字光扫:伪元素白光从左到右划过一次 */
.ask-hero__title-brand {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.ask-hero__title-brand::after {
  content: '';
  position: absolute;
  inset: 0;
  left: -80%;
  width: 60%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.35) 40%,
    rgba(255, 255, 255, 0.50) 50%,
    rgba(255, 255, 255, 0.35) 60%,
    transparent 100%
  );
  animation: sweep-pass 900ms 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 1;
  pointer-events: none;
}

.dark .ask-hero__title-brand::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 240, 196, 0.25) 40%,
    rgba(0, 240, 196, 0.45) 50%,
    rgba(0, 240, 196, 0.25) 60%,
    transparent 100%
  );
}

/* 搜索栏入场后微闪一次 */
.ask-hero__search-bar {
  animation: search-glow 700ms 750ms ease-out 1;
}

@media (prefers-reduced-motion: reduce) {
  .ask-hero__inner,
  .ask-hero__title-brand::after,
  .ask-hero__search-bar {
    animation: none !important;
  }
}
</style>
