<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vitepress'
import {
  UserPlus, Users, Layers, CircleHelp, ArrowLeftRight,
  ArrowDownToLine, Zap, RefreshCw, RefreshCcw, Send, Smartphone, Globe, Globe2,
  TrendingUp, TrendingDown, BookOpen, Receipt, BarChart2, BarChart3, Timer, ListOrdered,
  PieChart, FileText,
  ArrowUpFromLine, Building2, Shuffle,
  Flame, ShieldCheck, FileCheck, Wrench,
} from 'lucide-vue-next'
import type { TaskCard } from '../../data/journey'

const props = defineProps<{ task: TaskCard }>()

const router = useRouter()

const iconMap: Record<string, unknown> = {
  UserPlus, Users, Layers, CircleHelp, ArrowLeftRight,
  ArrowDownToLine, Zap, RefreshCw, RefreshCcw, Send, Smartphone, Globe, Globe2,
  TrendingUp, TrendingDown, BookOpen, Receipt, BarChart2, BarChart3, Timer, ListOrdered,
  PieChart, FileText,
  ArrowUpFromLine, Building2, Shuffle,
  Flame, ShieldCheck, FileCheck, Wrench,
}

const iconComponent = computed(() => iconMap[props.task.icon] ?? null)
</script>

<template>
  <article
    class="task-card"
    role="article"
    @click="router.go(task.href)"
  >
    <div class="task-card__header">
      <component
        :is="iconComponent"
        v-if="iconComponent"
        :size="16"
        class="task-card__icon"
      />
      <h3 class="task-card__title">{{ task.title }}</h3>
    </div>
    <p class="task-card__subtitle">{{ task.subtitle }}</p>
    <span class="task-card__arrow" aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </span>
  </article>
</template>

<style scoped>
.task-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  transition: transform 150ms ease-out,
              border-color 150ms ease-out,
              box-shadow 150ms ease-out;
  overflow: hidden;
}

.task-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.task-card:active {
  transform: scale(0.98);
  transition-duration: 80ms;
}

.task-card__header {
  display: flex;
  align-items: center;
  gap: 7px;
}

.task-card__icon {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
  opacity: 0.7;
  transition: opacity 150ms ease-out;
}

.task-card:hover .task-card__icon {
  opacity: 1;
}

.task-card__title {
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-card__subtitle {
  font-size: 13px;
  color: var(--vp-c-text-3);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.task-card__arrow {
  display: flex;
  align-items: center;
  margin-top: 4px;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}

.task-card:hover .task-card__arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>
