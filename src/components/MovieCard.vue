<template>
  <div
    class="group flex h-full cursor-pointer flex-col rounded-lg bg-theme-card shadow-sm transition-shadow hover:shadow-md"
    @click="movieModalToggle(true)"
  >
    <div class="relative aspect-[2/3] overflow-hidden rounded-t-lg">
      <img
        v-if="posterUrl"
        :src="posterUrl"
        :alt="movie.title"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-gray-200"
      >
        <span class="text-sm text-gray-400">Нет постера</span>
      </div>

      <Button
        v-if="isAuthenticated"
        :loading="isPending || isFetching"
        circular
        class="absolute right-2 top-2 bg-theme-secondary bg-opacity-80 p-2 transition-all hover:bg-opacity-100"
        @click.stop="handleToggleFavorite"
      >
        <template #icon>
          <HeartSolidIcon
            v-if="isCurrentlyFavorite"
            class="h-5 w-5 text-red-500"
          />
          <HeartIcon
            v-else
            class="h-5 w-5 text-white"
          />
        </template>
      </Button>

      <div
        v-if="movie.vote_average > 0"
        class="absolute bottom-2 left-2 rounded-full bg-theme-highlight px-2 py-1 text-sm font-bold text-white"
      >
        {{ movie.vote_average.toFixed(1) }}
      </div>
    </div>

    <div class="flex flex-1 flex-col p-4">
      <h3 class="movie-card__title mb-2 font-semibold text-theme-text">
        {{ movie.title }}
      </h3>
      <h3
        v-if="movie.original_title && movie.original_title !== movie.title"
        class="movie-card__title mb-2 font-semibold text-theme-text"
      >
        ({{ movie.original_title }})
      </h3>
      <p class="mb-3 text-sm text-theme-highlight">
        {{ formatDate(movie.release_date) }}
      </p>
      <p class="movie-card__overview text-sm text-theme-text">
        {{ truncatedOverview }}
      </p>
    </div>

    <div class="mt-auto px-4 pb-4">
      <Button
        @click="goToDetails"
        :variant="VARIANTS.primary"
        :size="SIZES.s"
        :full-width="true"
      >
        Подробнее
      </Button>
    </div>
  </div>

  <MovieModal
    :movie="movie"
    v-model="movieModalOpen"
    @close="movieModalToggle(false)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Routes } from '@/constants/routes.ts'
import { SIZES, VARIANTS } from '@/constants/ui.ts'
import Button from '@/components/ui/Button.vue'
import type { Movie } from '@/types/movie'
import { HeartIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid'
import MovieModal from '@/components/MovieModal.vue'
import { toRefs, useToggle } from '@vueuse/core'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { useQuery } from '@tanstack/vue-query'
import { accountApi } from '@/api/AccountApi.ts'
import { ACCOUNT_STATE_KEY } from '@/constants/queryKeys'
import { getPosterUrl } from '@/utils/getImage.ts'
import { useFavoriteMovie } from '@/composables/useFavoriteMovie.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { CACHE_TIME } from '@/constants/times.ts'
import { storeToRefs } from 'pinia'

interface Props {
  movie: Movie
}

const props = defineProps<Props>()

const { movie } = toRefs(props)

const router = useRouter()
const route = useRoute()
const { isAuthenticated, sessionId } = storeToRefs(useAuthStore())
const [movieModalOpen, movieModalToggle] = useToggle()

const { data: accountState, isFetching } = useQuery({
  queryKey: [ACCOUNT_STATE_KEY, props.movie.id],
  queryFn: () => accountApi.getMovieAccountStates(movie.value.id, sessionId.value!),
  enabled: computed(() => isAuthenticated.value && !!sessionId.value && route.name !== Routes.Favorites),
  staleTime: Infinity,
  gcTime: CACHE_TIME,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
})

const { isCurrentlyFavorite, handleToggleFavorite, isPending } = useFavoriteMovie(movie, accountState)

const posterUrl = computed(() => {
  return getPosterUrl(movie.value.poster_path)
})

const truncatedOverview = computed(() => {
  const overview = movie.value.overview || ''
  const maxLength = 120

  if (overview.length <= maxLength) {
    return overview
  }

  return overview.substring(0, maxLength).trim() + '...'
})

const goToDetails = () => {
  router.push({ name: Routes.MovieDetail, params: { id: movie.value.id.toString() } })
}
</script>

<style scoped>
.movie-card__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.movie-card__overview {
  flex: 1;
  line-height: 1.4;
  word-wrap: break-word;
  word-break: break-word;
}
</style>
