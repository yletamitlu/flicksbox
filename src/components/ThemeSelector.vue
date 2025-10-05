<template>
  <div class="flex w-[300px] items-center space-x-2">
    <label class="text-sm font-medium text-theme-text"> Тема: </label>
    <Select
      :model-value="currentTheme"
      :options="themeOptions"
      :size="SIZES.s"
      @update:model-value="handleThemeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SIZES } from '@/constants/ui.ts'
import { useTheme } from '@/composables/useTheme'
import Select from '@/components/ui/Select.vue'

const { currentTheme, availableThemes, setTheme } = useTheme()

const themeOptions = computed(() =>
  availableThemes.value.map((theme) => ({
    value: theme.value,
    label: theme.name,
  })),
)

const handleThemeChange = (value: string | number) => {
  setTheme(value as any)
}
</script>
