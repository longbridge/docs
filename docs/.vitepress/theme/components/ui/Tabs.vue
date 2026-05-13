<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger } from 'radix-vue'

defineProps<{
  modelValue: string
  tabs: {
    value: string
    label: string
    badge?: string | number
  }[]
  ariaLabel?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <TabsRoot
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <TabsList
      class="
        flex items-center gap-0
        border-b border-vp-divider
        overflow-x-auto scrollbar-none
        -webkit-overflow-scrolling-touch
      "
      :aria-label="ariaLabel"
    >
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="
          group
          inline-flex items-center gap-1.5
          px-3 py-2 mb-[-1px]
          text-base font-medium whitespace-nowrap
          text-vp-text1
          border-b-2 border-transparent
          outline-none select-none cursor-pointer
          transition-colors duration-150
          hover:text-vp-text1
          data-[state=active]:text-brand
          data-[state=active]:border-brand
        "
      >
        <slot :name="`label-${tab.value}`">{{ tab.label }}</slot>
        <span
          v-if="tab.badge !== undefined"
          class="
            text-xs font-medium tabular-nums
            px-1.5 py-0.5 rounded-full
            text-vp-text3 bg-transparent
            transition-colors duration-150
            group-data-[state=active]:text-brand group-data-[state=active]:bg-brand-soft
          "
        >
          {{ tab.badge }}
        </span>
      </TabsTrigger>
    </TabsList>
    <slot />
  </TabsRoot>
</template>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
