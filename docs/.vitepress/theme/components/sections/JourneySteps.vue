<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import { pipelineNodes, type Market } from '../../data/journey'
import { useI18n } from '../../../i18n/useI18n'
import PipelineNode from './PipelineNode.vue'

const { t } = useI18n()

const openAIModal = inject<(q: string) => void>('openAIModal', () => {})

const mainNodes = pipelineNodes.filter(n => n.kind === 'main')
const branchNode = pipelineNodes.find(n => n.kind === 'branch')

function askAI() {
  openAIModal('关于长桥进阶功能，比如期权、融资融券或税务申报，我想了解更多。')
}
</script>

<template>
  <div class="pipeline-section">
    <div class="pipeline-inner">

      <!-- Desktop horizontal pipeline track -->
      <div class="pipeline-track">
        <!-- Animated line (desktop only) -->
        <div class="pipeline-line" aria-hidden="true">
          <div class="pipeline-dot" aria-hidden="true" />
        </div>

        <!-- 5 main nodes in a 5-column grid -->
        <div class="pipeline-main">
          <PipelineNode
            v-for="(node, i) in mainNodes"
            :key="node.id"
            :node="node"
            :is-last-main="i === mainNodes.length - 1"
          />
        </div>
      </div>

      <!-- Mobile: vertical connector lines between nodes -->
      <div class="pipeline-mobile-connectors" aria-hidden="true">
        <span
          v-for="(_, i) in mainNodes.slice(0, -1)"
          :key="i"
          class="mobile-connector"
        />
      </div>

      <!-- Branch: advanced -->
      <div v-if="branchNode" class="pipeline-branch">
        <div class="branch-connector" aria-hidden="true">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" preserveAspectRatio="none">
            <path
              d="M 20 0 L 20 12 L 40 12"
              stroke="var(--vp-c-divider)"
              stroke-width="1"
              stroke-dasharray="4 3"
              fill="none"
            />
          </svg>
        </div>
        <div class="branch-node-wrap">
          <PipelineNode :node="branchNode" :is-branch="true" />
        </div>
      </div>

      <!-- Section-level AI CTA -->
      <div class="pipeline-footer">
        <span class="pipeline-footer__text">{{ t('journey.notFound') }}</span>
        <button class="pipeline-footer__btn" @click="askAI">{{ t('journey.askAi') }}</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Outer wrapper ─────────────────────────────────────────────── */
.pipeline-section {
  padding: 40px 48px 80px;
}

.pipeline-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Desktop pipeline track ────────────────────────────────────── */
.pipeline-track {
  position: relative;
}

/* Horizontal line overlay: sits at dot center (dot-area 24px / 2 = 12px) */
.pipeline-line {
  position: absolute;
  top: 12px;
  /* 1/10 of the grid = center of first node in 5-col equal grid */
  left: calc(100% / 10);
  right: calc(100% / 10);
  height: 1.5px;
  background: var(--vp-c-brand-1);
  z-index: 0;
  pointer-events: none;
}

/* Animated light dot */
.pipeline-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--vp-c-brand-aux);
  top: 50%;
  transform: translateY(-50%);
  animation: pipeline-flow 8s linear infinite;
}

@keyframes pipeline-flow {
  0%   { left: 0; opacity: 0; }
  6%   { opacity: 1; }
  94%  { opacity: 1; }
  100% { left: calc(100% - 4px); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .pipeline-dot { display: none; }
}

/* 5-column equal grid for main nodes */
.pipeline-main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  position: relative;
  z-index: 1;
  align-items: start;
}

/* ── Branch section ────────────────────────────────────────────── */
.pipeline-branch {
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin-top: 16px;
  padding-left: calc(100% * 4 / 5 + 100% / 10 - 20px);
}

.branch-connector {
  margin-top: 0;
  flex-shrink: 0;
}

.branch-node-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 200px;
  max-width: 240px;
}


/* ── Mobile connector lines ────────────────────────────────────── */
/* Hidden on desktop, used as a trick for mobile track lines */
.pipeline-mobile-connectors {
  display: none;
}

/* ── Footer CTA ────────────────────────────────────────────────── */
.pipeline-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.pipeline-footer__text {
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.pipeline-footer__btn {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 150ms;
}

.pipeline-footer__btn:hover {
  opacity: 0.75;
}

/* ── Tablet ────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .pipeline-section {
    padding: 40px 24px 72px;
  }
}

/* ── Mobile: switch to vertical timeline ──────────────────────── */
@media (max-width: 767px) {
  .pipeline-section {
    padding: 32px 16px 64px;
  }

  /* Hide desktop horizontal line + dot */
  .pipeline-line {
    display: none;
  }

  /* Stack nodes vertically */
  .pipeline-main {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }

  /* Vertical line using pseudo on pipeline-main */
  .pipeline-main::before {
    content: '';
    position: absolute;
    left: 4px; /* center of 8px dot (8/2 - 1.5/2 ≈ 4px) */
    top: 12px;
    bottom: 20px;
    width: 1.5px;
    background: var(--vp-c-brand-1);
    z-index: 0;
  }

  /* Branch: stack below main */
  .pipeline-branch {
    flex-direction: column;
    padding-left: 0;
    margin-top: 24px;
    border-top: 1px dashed var(--vp-c-divider);
    padding-top: 24px;
  }

  .branch-connector {
    display: none;
  }

  .branch-node-wrap {
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  /* Pad between pipeline-node items */
  .pipeline-main :deep(.pipeline-node) {
    padding-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  .pipeline-main :deep(.pipeline-node:last-child) {
    padding-bottom: 0;
  }
}
</style>
