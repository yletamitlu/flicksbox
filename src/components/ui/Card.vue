<template>
  <div :class="cardClasses">
    <div
      v-if="$slots.header"
      class="px-6 py-4"
    >
      <slot name="header"/>
    </div>
    <div :class="bodyClasses">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Size, SIZES } from '@/constants/ui.ts'

interface Props {
  padding?: Size
  hover?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: SIZES.m,
  hover: false,
  clickable: false,
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-theme-card rounded-lg transition-all duration-200'

  const hoverClasses = props.hover ? 'hover:shadow-md hover:ring-theme-accent' : ''
  const clickableClasses = props.clickable ? 'cursor-pointer' : ''

  return [baseClasses, hoverClasses, clickableClasses].filter(Boolean).join(' ')
})

const bodyClasses = computed(() => {
  const paddingClasses: Record<string, string> = {
    [SIZES.s]: 'p-3',
    [SIZES.m]: 'p-4',
    [SIZES.l]: 'p-6',
  }
  return paddingClasses[props.padding]
})
</script>
