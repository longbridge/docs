<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vitepress'
import { newUserSteps } from '../../data/new-user-path'
import { useI18n } from '../../../i18n/useI18n'

const router = useRouter()
const { t } = useI18n()
const currentStep = ref(0)

function navigate(path: string) {
  router.go(path)
}

function selectStep(index: number) {
  currentStep.value = index
}

function nextStep() {
  if (currentStep.value < newUserSteps.length - 1) {
    currentStep.value += 1
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value -= 1
  }
}
</script>

<template>
  <section class="new-user-path">
    <div class="new-user-path__inner">

      <!-- 标题区 -->
      <div class="new-user-path__header">
        <span class="new-user-path__eyebrow">{{ t('newUserPath.eyebrow') }}</span>
        <h2 class="new-user-path__title">{{ t('newUserPath.title') }}</h2>
        <p class="new-user-path__caption">{{ t('newUserPath.caption') }}</p>
      </div>

      <!-- Segmented Tabs -->
      <div class="nup-tabs" role="tablist">
        <button
          v-for="(step, i) in newUserSteps"
          :key="step.id"
          class="nup-tab"
          :class="{ 'nup-tab--active': currentStep === i }"
          role="tab"
          :aria-selected="currentStep === i"
          @click="selectStep(i)"
        >
          <span class="nup-tab__dot"></span>
          <span class="nup-tab__text">{{ step.num }} {{ step.title }}</span>
        </button>
      </div>

      <!-- Step Panel -->
      <Transition name="nup-panel" mode="out-in">
        <div :key="currentStep" class="nup-panel">
          <div class="nup-panel__num">{{ newUserSteps[currentStep].num }}</div>
          <div class="nup-panel__body">
            <div class="nup-panel__title">{{ newUserSteps[currentStep].title }}</div>
            <div class="nup-panel__sub">{{ newUserSteps[currentStep].subtitle }}</div>
            <div class="nup-panel__meta">
              <span class="nup-panel__time">预计 {{ newUserSteps[currentStep].durationLabel }}</span>
              <button
                class="nup-panel__cta"
                @click="navigate(newUserSteps[currentStep].path)"
              >
                查看文档 →
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Navigation -->
      <div class="nup-nav">
        <button
          class="nup-nav__btn"
          :disabled="currentStep === 0"
          @click="prevStep"
        >
          ← 上一步
        </button>
        <span class="nup-nav__progress">第 {{ currentStep + 1 }} 步 / 共 {{ newUserSteps.length }} 步</span>
        <button
          class="nup-nav__btn"
          :disabled="currentStep === newUserSteps.length - 1"
          @click="nextStep"
        >
          下一步 →
        </button>
      </div>

      <p class="nup-note">每步点击可跳转到对应文档，所有步骤均可独立进入</p>

    </div>
  </section>
</template>

<style scoped>
/* ── 外层 ── */
.new-user-path {
  background: var(--vp-c-bg-alt);
  padding: 80px 48px;
}

.new-user-path__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

/* ── 标题区 ── */
.new-user-path__header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 640px;
}

.new-user-path__eyebrow {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--vp-c-brand-1);
}

.new-user-path__title {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: var(--vp-c-text-1);
  margin: 0;
}

.new-user-path__caption {
  font-size: 15px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ── Segmented Tabs ── */
.nup-tabs {
  display: flex;
  gap: 4px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 4px;
  width: fit-content;
}

.nup-tab {
  all: unset;
  height: 36px;
  border-radius: 9px;
  padding: 0 12px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 150ms ease-out, color 150ms ease-out, box-shadow 150ms ease-out;
  white-space: nowrap;
}

.nup-tab:hover:not(.nup-tab--active) {
  background: rgba(0, 184, 184, 0.08);
  color: var(--vp-c-text-1);
}

.nup-tab.nup-tab--active {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.nup-tab__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.nup-tab__text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Step Panel ── */
.nup-panel {
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  background: var(--vp-c-bg);
  min-height: 160px;
}

.nup-panel__num {
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  flex-shrink: 0;
  width: 90px;
  text-align: center;
}

.nup-panel__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nup-panel__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.nup-panel__sub {
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.nup-panel__meta {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
  flex-wrap: wrap;
}

.nup-panel__time {
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.nup-panel__cta {
  all: unset;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  background: rgba(0, 184, 184, 0.12);
  border: 1px solid rgba(0, 184, 184, 0.2);
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
  transition: background 150ms ease-out, border-color 150ms ease-out;
  white-space: nowrap;
}

.nup-panel__cta:hover {
  background: rgba(0, 184, 184, 0.20);
  border-color: rgba(0, 184, 184, 0.4);
  color: var(--vp-c-brand-1);
}

/* ── Navigation ── */
.nup-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.nup-nav__btn {
  all: unset;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: none;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
  transition: border-color 150ms ease-out, color 150ms ease-out;
  white-space: nowrap;
}

.nup-nav__btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.nup-nav__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nup-nav__progress {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.nup-note {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-align: center;
  margin: 0;
  margin-top: 8px;
}

/* ── Transition ── */
.nup-panel-enter-active,
.nup-panel-leave-active {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}

.nup-panel-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.nup-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ── 响应式 ── */
@media (max-width: 768px) {
  .new-user-path {
    padding: 64px 16px;
  }

  .new-user-path__inner {
    gap: 28px;
  }

  .nup-tabs {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .nup-tabs::-webkit-scrollbar {
    display: none;
  }

  .nup-tab {
    flex-shrink: 0;
    font-size: 12px;
  }

  .nup-panel {
    flex-direction: column;
    padding: 24px;
    min-height: auto;
    gap: 16px;
  }

  .nup-panel__num {
    width: 100%;
    text-align: left;
  }

  .nup-nav {
    justify-content: center;
  }

  .nup-nav__btn {
    font-size: 12px;
    padding: 5px 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nup-tab,
  .nup-panel,
  .nup-nav__btn,
  .nup-panel__cta {
    transition: none !important;
  }
}
</style>
