<script setup lang="ts">
import { inject } from 'vue'

const openAIModal = inject<(q: string) => void>('openAIModal', () => {})

function handleClick() {
  openAIModal('')
}
</script>

<template>
  <div class="divider-copy">
    <div class="divider-copy__inner">
      <div class="divider-copy__line" />
      <button type="button" class="divider-copy__text" @click="handleClick">
        不知道从哪开始？<span class="divider-copy__highlight">用一句话问 AI，直接给你答案</span>
      </button>
      <div class="divider-copy__line" />
    </div>
  </div>
</template>

<style scoped>
.divider-copy {
  background: var(--vp-c-bg);
  padding: 36px 32px;
}

.divider-copy__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
}

.divider-copy__line {
  flex: 1;
  height: 1px;
  background: var(--vp-c-border);
}

.divider-copy__text {
  flex-shrink: 0;
  font-size: 15px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  letter-spacing: 0.01em;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: color 0.15s;
}

.divider-copy__text:hover .divider-copy__highlight {
  color: var(--vp-c-brand-1);
}

.divider-copy__highlight {
  color: var(--vp-c-text-1);
  font-weight: 600;
  transition: color 0.15s;
}

@media (max-width: 768px) {
  .divider-copy__inner {
    flex-direction: column;
    gap: 16px;
  }
  .divider-copy__line {
    display: none;
  }
}
</style>
