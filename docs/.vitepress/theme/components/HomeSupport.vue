<script setup lang="ts">
import { provide } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import AskHero from './sections/AskHero.vue'
import DividerCopy from './sections/DividerCopy.vue'
import AnswerShowcase from './sections/AnswerShowcase.vue'
import NewUserPath from './sections/NewUserPath.vue'
import TaskIndex from './sections/TaskIndex.vue'
import FooterMini from './sections/FooterMini.vue'
import { useAIModal } from '../composables/useAIModal'
import { type Market } from '../data/journey'

const { openAIModal } = useAIModal()
const activeMarket = useLocalStorage<Market>('lb-journey-market', 'hk')

provide('openAIModal', openAIModal)
provide('journeyMarket', activeMarket)
</script>

<template>
  <div class="home-support">
    <AskHero />
    <DividerCopy />
    <AnswerShowcase />
    <NewUserPath />
    <TaskIndex />
    <FooterMini />
  </div>
</template>

<style scoped>
.home-support {
  min-height: 100vh;
}
</style>
