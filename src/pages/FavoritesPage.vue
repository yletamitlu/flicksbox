<template>
  <MoviesGrid
    :title="`Избранные фильмы (${favoritesStore.totalResults})`"
    :is-fetching="favoritesStore.isFetching"
    :total-pages="favoritesStore.totalPages || 1"
    v-model:page="favoritesStore.currentPage"
    :movies="favoritesStore.favorites"
  >
    <template #empty-content>
      <div class="flex-col items-center py-12 text-center">
        <div class="mb-4 text-6xl">💔</div>
        <Heading
          :level="2"
          :size="SIZES.l"
          :color="COLORS.default"
          class="mb-2 text-center"
        >
          Нет избранных фильмов
        </Heading>
        <p class="mb-6 text-theme-muted">Добавьте фильмы в избранное, чтобы они появились здесь</p>
        <Button
          :variant="VARIANTS.primary"
          :size="SIZES.l"
          @click="$router.push({ name: Routes.Home })"
        >
          Найти фильмы
        </Button>
      </div>
    </template>
    <template #error>
      <Alert
        title="Что-то пошло не так"
        button-text="Попробовать снова"
        :message="favoritesStore.error || 'Ошибка загрузки избранных'"
        @action-click="favoritesStore.loadFavorites()"
      />
    </template>
  </MoviesGrid>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Routes } from '@/constants/routes.ts'
import { SIZES, VARIANTS, COLORS } from '@/constants/ui.ts'
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'
import MoviesGrid from '@/components/MoviesGrid.vue'
import Alert from '@/components/ui/Alert.vue'
import { useFavoritesStore } from '@/stores/useFavoritesStore.ts'

const favoritesStore = useFavoritesStore()

onMounted(() => {
  favoritesStore.loadFavorites()
})
</script>
