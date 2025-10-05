<template>
  <svg
    :class="iconClasses"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SIZES, type Size } from '@/constants/ui.ts'

interface Props {
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  size: SIZES.m,
})

const iconClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    [SIZES.s]: 'w-4 h-4',
    [SIZES.m]: 'w-5 h-5',
    [SIZES.l]: 'w-6 h-6',
  }

  return sizeClasses[props.size]
})
</script>
