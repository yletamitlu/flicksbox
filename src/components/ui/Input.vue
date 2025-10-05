<template>
  <div class="w-full">
    <div
      v-if="label"
      class="mb-2 block text-sm font-medium text-theme-text"
    >
      {{ label }}
    </div>
    <input
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      class="bg-theme-bg"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SIZES, type Size } from '@/constants/ui.ts'

interface Props {
  label?: string
  placeholder?: string
  disabled?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  placeholder: undefined,
  disabled: false,
  required: false,
  size: SIZES.m,
})

const modelValue = defineModel<string>({ required: true })

const inputClasses = computed(() => {
  const baseClasses = 'block w-full rounded-small border text-sm transition-colors focus:outline-none border-theme-muted text-theme-card placeholder-theme-muted focus:ring-theme-accent focus:border-theme-accent'

  const sizeClasses: Record<string, string> = {
    [SIZES.s]: 'p-2.5 text-sm',
    [SIZES.m]: 'p-2.5 text-sm',
    [SIZES.l]: 'p-3 text-base',
  }

  const disabledClasses = props.disabled ? 'bg-theme-secondary cursor-not-allowed' : ''

  return [baseClasses, sizeClasses[props.size], disabledClasses].filter(Boolean).join(' ')
})
</script>
