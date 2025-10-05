<template>
  <div class="flex min-h-[60vh] items-center justify-center">
    <Card
      class="w-full max-w-md text-center"
      :padding="SIZES.l"
    >
      <img
        v-if="withImage"
        src="/src/assets/images/matthew-mcconaughey-crying-in-interstellar.jpg"
        alt="No movies found"
        class="mx-auto w-64 rounded-m"
      />
      <Heading
        :level="1"
        :size="SIZES.l"
        :color="COLORS.default"
        class="mb-4 text-center"
      >
        {{ title }}
      </Heading>
      <p class="mb-6 text-theme-muted">
        {{ message || "Произошла ошибка при загрузке данных" }}
      </p>
      <div
        v-if="buttonText"
        class="space-y-3"
      >
        <Button
          @click="$emit('actionClick')"
          :variant="VARIANTS.secondary"
          :full-width="true"
        >
          {{ buttonText }}
        </Button>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Heading from '@/components/ui/Heading.vue'
import Card from '@/components/ui/Card.vue'
import { COLORS, SIZES, VARIANTS } from '@/constants/ui.ts'

interface Props {
  title?: string
  message?: string
  buttonText?: string
  withImage?: boolean
}

interface Emits {
  (e: 'actionClick'): void
}

withDefaults(defineProps<Props>(), {
  title: 'Что-то пошло не так',
  message: '',
  buttonText: '',
})

defineEmits<Emits>()
</script>
