<template>
  <div class="mb-6">
    <Button
      :variant="VARIANTS.outline"
      :size="SIZES.s"
      @click="goBack"
    >
      Назад
    </Button>
  </div>

  <MovieFullDetails :id="id"/>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { SIZES, VARIANTS } from '@/constants/ui.ts'
import Button from '@/components/ui/Button.vue'
import MovieFullDetails from '@/components/MovieFullDetails.vue'

interface Props {
  id: string
}

defineProps<Props>()

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>
