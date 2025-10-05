<template>
  <div class="flex items-center">
    <div :class="spinnerClasses"></div>
  </div>
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

const spinnerClasses = computed(() => {
  const baseClasses = 'inline-block animate-spin rounded-full border-b-2 border-blue-500'

  const sizeClasses: Record<string, string> = {
    [SIZES.s]: 'h-4 w-4',
    [SIZES.m]: 'h-8 w-8',
    [SIZES.l]: 'h-12 w-12',
  }

  return [baseClasses, sizeClasses[props.size]].join(' ')
})
</script>
