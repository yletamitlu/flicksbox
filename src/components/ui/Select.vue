<template>
  <div class="w-full">
    <Listbox
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="handleChange"
    >
      <div class="relative">
        <ListboxLabel
          v-if="label"
          class="mb-2 block text-sm font-medium text-theme-text"
        >
          {{ label }}
        </ListboxLabel>

        <ListboxButton :class="buttonClasses">
          <span class="block truncate text-left text-theme-highlight">
            {{ selectedOption?.label || placeholder || "Выберите опцию" }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              class="h-5 w-5 text-theme-muted"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <TransitionRoot
          as="template"
          leave="transition duration-100 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <ListboxOptions :class="optionsClasses">
            <ListboxOption
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              as="template"
              v-slot="{ selected, active }"
            >
              <li :class="[active ? 'bg-theme-accent text-white' : 'text-theme-text', selected ? 'font-semibold' : 'font-normal', 'cursor-pointer relative select-none py-2 pl-10 pr-4']">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                  {{ option.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-theme-accent"
                >
                  <CheckIcon
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </TransitionRoot>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { SIZES, type Size } from '@/constants/ui.ts'

interface Option {
  value: string | number
  label: string
}

interface Props {
  options: Option[]
  label?: string
  placeholder?: string
  disabled?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  placeholder: undefined,
  required: false,
  size: SIZES.m,
})

const modelValue = defineModel<string | number>({ required: true })

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === modelValue.value)
})

const buttonClasses = computed(() => {
  const baseClasses = 'border-theme-muted bg-theme-accent text-theme-text cursor-pointer focus:ring-theme-accent focus:border-theme-accent relative w-full cursor-default rounded-small border py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none transition-colors'

  const sizeClasses: Record<string, string> = {
    [SIZES.s]: 'py-2 pl-3 pr-10 text-sm',
    [SIZES.m]: 'py-2 pl-3 pr-10 text-sm',
    [SIZES.l]: 'py-3 pl-3 pr-10 text-base',
  }

  return [baseClasses, sizeClasses[props.size]].filter(Boolean).join(' ')
})

const optionsClasses = computed(() => {
  return 'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-theme-card py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
})

const handleChange = (value: string | number) => {
  modelValue.value = value
}
</script>
