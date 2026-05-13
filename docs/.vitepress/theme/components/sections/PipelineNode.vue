<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vitepress'
import { type PipelineNode, type Market, getNodeDetails, getNodeDocs } from '../../data/journey'
import { useI18n } from '../../../i18n/useI18n'

const { t } = useI18n()
const router = useRouter()

const props = defineProps<{
  node: PipelineNode
  isBranch?: boolean
  isLastMain?: boolean
}>()

const activeMarket = inject<Ref<Market>>('journeyMarket', ref('hk') as Ref<Market>)
const isExpanded = ref(false)

const details = computed(() => getNodeDetails(props.node, activeMarket.value))
const docs = computed(() => getNodeDocs(props.node, activeMarket.value))

function navigate(path: string) {
  router.go(path)
}
</script>

<template>
  <article
    class="pipeline-node"
    :class="{
      'pipeline-node--branch': isBranch,
      'pipeline-node--expanded': isExpanded,
    }"
  >
    <!-- Dot on horizontal pipeline line -->
    <div class="node-dot-area" aria-hidden="true">
      <div class="node-dot" />
    </div>

    <!-- Stem: vertical connector from dot to card -->
    <div class="node-stem" aria-hidden="true" />

    <!-- Card: header + details + doc toggle -->
    <div class="node-card">
      <!-- Header: step num · title — integrated identity -->
      <div class="node-header">
        <span class="node-num">{{ node.num }}</span>
        <span class="node-sep" aria-hidden="true">·</span>
        <span class="node-title">{{ t(node.title) }}</span>
      </div>

      <!-- Chips + meta; fade when market switches -->
      <Transition name="detail-fade" mode="out-in">
        <div :key="activeMarket.value" class="node-details">
          <div v-if="details.chips.length" class="node-chips">
            <span v-for="chip in details.chips" :key="chip" class="node-chip">{{ chip }}</span>
          </div>
          <div v-if="details.hours || details.settlement" class="node-meta">
            <span v-if="details.hours" class="node-meta-item">{{ details.hours }}</span>
            <span v-if="details.settlement" class="node-meta-item node-meta-item--settlement">{{ details.settlement }}</span>
          </div>
        </div>
      </Transition>

      <!-- Doc count toggle — pinned to card bottom -->
      <button
        class="node-doc-toggle"
        :aria-expanded="isExpanded"
        :aria-label="`${node.docCount}${t('journey.docCountSuffix')}文档`"
        @click="isExpanded = !isExpanded"
      >
        <span class="node-doc-count">{{ node.docCount }}{{ t('journey.docCountSuffix') }}</span>
        <svg
          class="node-toggle-icon"
          :class="{ 'is-open': isExpanded }"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <!-- Expandable doc list -->
      <Transition name="docs-expand">
        <ul v-if="isExpanded" class="node-docs">
          <li v-for="doc in docs" :key="doc.path">
            <button class="node-doc-link" @click="navigate(doc.path)">
              <span>{{ doc.title }}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        </ul>
      </Transition>
    </div>
  </article>
</template>

<style scoped>
/* ── Base (desktop-first) ──────────────────────────────────────── */
.pipeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 6px;
}

/* Dot: sits exactly on the horizontal pipeline line */
.node-dot-area {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 1;
}

.node-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  transition: width 150ms cubic-bezier(0.4, 0, 0.2, 1),
              height 150ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.pipeline-node:hover .node-dot,
.pipeline-node--expanded .node-dot {
  width: 12px;
  height: 12px;
  box-shadow: 0 0 0 1px var(--vp-c-brand-aux);
}

.pipeline-node--branch .node-dot {
  background: transparent;
  border: 1.5px solid var(--vp-c-brand-1);
  width: 8px;
  height: 8px;
}

/* Stem: short vertical line from dot to card top */
.node-stem {
  width: 1.5px;
  height: 10px;
  background: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.pipeline-node--branch .node-stem {
  background: repeating-linear-gradient(
    to bottom,
    var(--vp-c-divider) 0,
    var(--vp-c-divider) 3px,
    transparent 3px,
    transparent 6px
  );
}

/* Card */
.node-card {
  width: 100%;
  min-height: 144px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pipeline-node--branch .node-card {
  border-style: dashed;
  opacity: 0.85;
}

/* Card header: num · title */
.node-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 9px 12px 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.node-num {
  font-family: 'SF Pro Display', ui-monospace, monospace;
  font-size: 11px;
  font-weight: 400;
  color: var(--vp-c-text-3);
  line-height: 1;
}

.node-sep {
  font-size: 11px;
  color: var(--vp-c-text-3);
  line-height: 1;
}

.node-title {
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1;
}

/* Details */
.node-details {
  padding: 10px 12px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Chips */
.node-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.node-chip {
  font-family: 'SF Pro Display', ui-monospace, monospace;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  padding: 2px 6px;
  white-space: nowrap;
}

/* Meta (hours / settlement) */
.node-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.node-meta-item {
  font-family: 'SF Pro Display', ui-monospace, monospace;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.node-meta-item--settlement {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

/* Doc toggle: pinned to card bottom */
.node-doc-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  width: 100%;
  margin-top: auto;
  border-top: 1px solid var(--vp-c-divider);
}

.node-doc-count {
  font-family: 'SF Pro Display', ui-monospace, monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.node-toggle-icon {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.node-toggle-icon.is-open {
  transform: rotate(180deg);
}

/* Docs list */
.node-docs {
  list-style: none;
  padding: 0 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.node-doc-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: 100%;
  padding: 5px 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: color 150ms;
}

.node-doc-link:hover {
  color: var(--vp-c-brand-1);
}

/* ── Transitions ───────────────────────────────────────────────── */
.detail-fade-enter-active,
.detail-fade-leave-active {
  transition: opacity 200ms cubic-bezier(0.2, 0, 0, 1),
              transform 200ms cubic-bezier(0.2, 0, 0, 1);
}

.detail-fade-enter-from,
.detail-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.docs-expand-enter-active,
.docs-expand-leave-active {
  transition: opacity 200ms, transform 200ms cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;
}

.docs-expand-enter-from,
.docs-expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Mobile: vertical timeline ─────────────────────────────────── */
@media (max-width: 767px) {
  .pipeline-node {
    display: grid;
    grid-template-columns: 24px 1fr;
    grid-template-rows: auto auto;
    align-items: start;
    padding: 0;
  }

  /* Dot: left track column */
  .node-dot-area {
    grid-column: 1;
    grid-row: 1;
    height: auto;
    padding-top: 5px;
    align-items: flex-start;
  }

  /* Stem: hidden on mobile — left track line is the connector */
  .node-stem {
    display: none;
  }

  /* Card: right column, full height */
  .node-card {
    grid-column: 2;
    grid-row: 1 / 3;
    background: transparent;
    border: none;
    border-radius: 0;
    min-height: 0;
    overflow: visible;
  }

  .node-header {
    padding: 0 0 8px 12px;
    border-bottom: none;
  }

  .node-title {
    font-size: 14px;
    font-weight: 600;
  }

  .node-details {
    padding: 0 0 0 12px;
  }

  .node-doc-toggle {
    padding: 6px 0 6px 12px;
    border-top: 1px solid var(--vp-c-divider);
    margin-top: 8px;
  }

  .node-docs {
    padding: 0 0 0 12px;
  }

  .node-chip {
    font-size: 11px;
  }
}
</style>
