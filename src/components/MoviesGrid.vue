<template>
  <div class="mb-6 flex items-center justify-between">
    <Heading
      :level="2"
      :size="SIZES.l"
      :color="COLORS.highlight"
    >
      {{ title }}
    </Heading>
    <Pagination
      v-if="showPagination"
      :current-page="currentPage"
      :total-pages="totalPages || 1"
      @page-change="handlePageChange"
    />
  </div>

  <div
    v-if="isFetching"
    class="flex flex-col items-center justify-center gap-6 py-48"
  >
    <Spinner :size="SIZES.m"/>
    <p class="mt-2 text-theme-muted">Загрузка фильмов...</p>
  </div>

  <div
    v-else-if="error"
    class="flex min-h-[60vh] items-center justify-center"
  >
    <slot name="error">
      <Alert
        title="Что-то пошло не так"
        :message="error || 'Ошибка загрузки избранных'"
      />
    </slot>
  </div>

  <div
    v-else-if="movies?.length"
    class="space-y-6"
  >
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @click="$emit('movieClick', movie)"
      />
    </div>

    <div
      v-if="showPagination"
      class="flex justify-center"
    >
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages || 1"
        @page-change="handlePageChange"
      />
    </div>
  </div>
  <slot
    v-else
    name="empty-content"
  />
</template>

<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { Movie } from '@/types/movie.ts'
import Pagination from '@/components/ui/Pagination.vue'
import { COLORS, SIZES } from '@/constants/ui.ts'
import Heading from '@/components/ui/Heading.vue'
import { computed } from 'vue'
import Spinner from '@/components/ui/Spinner.vue'
import Alert from '@/components/ui/Alert.vue'

interface Props {
  movies?: Movie[]
  isFetching: boolean
  totalPages?: number
  title: string
  error?: string
}

interface Emits {
  (event: 'movieClick', movie: Movie): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const currentPage = defineModel<number>('page', { required: true })

const showPagination = computed(() => props.movies && props.totalPages && props.totalPages > 1 && !props.isFetching)

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>
