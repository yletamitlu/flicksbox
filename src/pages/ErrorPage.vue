<template>
  <div class="flex min-h-[60vh] items-center justify-center">
    <Alert
      title="Что-то пошло не так"
      button-text="На главную"
      :message="errorMessage"
      with-image
      @action-click="goHome"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Routes } from '@/constants/routes.ts'
import Alert from '@/components/ui/Alert.vue'

const router = useRouter()
const errorMessage = ref<string>('')

onMounted(() => {
  const query = router.currentRoute.value.query
  errorMessage.value = (query.message as string) || ''
})

const goHome = () => {
  router.push({ name: Routes.Home })
}
</script>
