<template>
  <component
    :is="tag"
    :class="headingClasses"
  >
    <slot/>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SIZES, COLORS, type Size, type Color } from '@/constants/ui.ts'

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: Size
  color?: Color
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  size: SIZES.m,
  color: COLORS.default,
})

const tag = computed(() => `h${props.level}`)

const headingClasses = computed(() => {
  const baseClasses = 'font-sans'

  const sizeClasses: Record<string, string> = {
    [SIZES.s]: 'text-sm',
    [SIZES.m]: 'text-lg',
    [SIZES.l]: 'text-2xl',
  }

  const colorClasses: Record<string, string> = {
    [COLORS.default]: 'text-theme-text',
    [COLORS.muted]: 'text-theme-muted',
    [COLORS.accent]: 'text-theme-accent',
    [COLORS.highlight]: 'text-theme-highlight',
  }

  return [baseClasses, sizeClasses[props.size], colorClasses[props.color]].filter(Boolean).join(' ')
})
</script>
