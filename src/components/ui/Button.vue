<template>
  <button
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="emit('click', $event)"
  >
    <div class="flex items-center gap-xs">
      <Spinner
        v-if="loading"
        :size="spinnerSize"
      />
      <slot
        v-else
        name="icon"
      />
      <slot/>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SIZES, VARIANTS, type Variant, type Size } from '@/constants/ui.ts'
import Spinner from '@/components/ui/Spinner.vue'

interface Props {
  variant?: Variant
  size?: Size
  disabled?: boolean
  fullWidth?: boolean
  loading?: boolean
  circular?: boolean
}

interface Emits {
  (e: 'click', value: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: VARIANTS.primary,
  size: SIZES.m,
  disabled: false,
  fullWidth: false,
  loading: false,
  circular: false,
})

const emit = defineEmits<Emits>()

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none'

  const roundingClass = props.circular ? 'rounded-full' : 'rounded-small'

  const sizeClasses: Record<string, string> = {
    [SIZES.s]: props.circular ? 'w-8 h-8 p-0' : 'px-3 py-1.5 text-sm',
    [SIZES.m]: props.circular ? 'w-10 h-10 p-0' : 'px-4 py-2 text-sm',
    [SIZES.l]: props.circular ? 'w-12 h-12 p-0' : 'px-6 py-3 text-base',
  }

  const variantClasses: Record<string, string> = {
    [VARIANTS.primary]: 'text-white bg-theme-accent hover:bg-theme-highlight focus:ring-theme-accent/50',
    [VARIANTS.secondary]: 'text-theme-text bg-theme-secondary hover:bg-theme-muted focus:ring-theme-secondary/50',
    [VARIANTS.outline]: 'text-theme-text bg-transparent border border-theme-muted hover:bg-theme-secondary focus:ring-theme-muted/50',
    [VARIANTS.ghost]: 'text-theme-text bg-transparent hover:bg-theme-secondary focus:ring-theme-muted/50',
  }

  const fullWidthClass = props.fullWidth ? 'w-full' : ''

  return [baseClasses, roundingClass, sizeClasses[props.size], variantClasses[props.variant], fullWidthClass].filter(Boolean).join(' ')
})

const spinnerSize = computed(() => {
  const sizeMap: Record<string, Size> = {
    [SIZES.s]: SIZES.s,
    [SIZES.m]: SIZES.s,
    [SIZES.l]: SIZES.m,
  }
  return sizeMap[props.size]
})
</script>
