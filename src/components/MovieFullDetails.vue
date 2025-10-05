<template>
  <div
    v-if="isFetching"
    class="py-8 text-center"
  >
    <div class="py-8 text-center">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Загрузка фильма...</p>
    </div>
  </div>

  <div
    v-else-if="isError"
    class="rounded-lg border border-red-200 bg-red-50 p-4"
  >
    <p class="text-red-600">Ошибка: {{ error?.message }}</p>
  </div>

  <div
    v-else-if="movie"
    class="overflow-hidden rounded-lg bg-theme-card shadow-sm"
  >
    <div class="relative h-96 bg-gray-900">
      <img
        v-if="backdropUrl"
        :src="backdropUrl"
        :alt="movie.title"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h1 class="mb-2 text-4xl font-bold">{{ movie.title }}</h1>
        <p
          v-if="movie.original_title && movie.original_title !== movie.title"
          class="mb-2 text-xl text-gray-300"
        >
          ({{ movie.original_title }})
        </p>
        <p
          v-if="movie.tagline"
          class="mb-4 text-lg italic text-gray-200"
        >
          «{{ movie.tagline }}»
        </p>
        <div class="flex items-center space-x-4 text-lg">
          <span>{{ formatDate(movie.release_date) }}</span>
          <span>•</span>
          <span>{{ movie.runtime }} мин</span>
          <span>•</span>
          <div class="flex items-center">
            <StarSolidIcon class="mr-1 h-5 w-5 text-yellow-400"/>
            <span>{{ movie.vote_average.toFixed(1) }} ({{ movie.vote_count.toLocaleString() }})</span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="mb-6">
            <h2 class="mb-4 text-2xl font-bold">Описание</h2>
            <p class="leading-relaxed text-theme-text">{{ movie.overview }}</p>
          </div>

          <div
            v-if="movie.genres?.length"
            class="mb-6"
          >
            <h3 class="mb-2 text-lg font-semibold">Жанры</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="genre in movie.genres"
                :key="genre.id"
                class="rounded-full bg-theme-secondary px-3 py-1 text-sm text-theme-text"
              >
                {{ genre.name }}
              </span>
            </div>
          </div>

          <div
            v-if="movie.production_countries?.length"
            class="mb-6"
          >
            <h3 class="mb-2 text-lg font-semibold">Страны производства</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="country in movie.production_countries"
                :key="country.iso_3166_1"
                class="rounded-full bg-theme-accent px-3 py-1 text-sm text-white"
              >
                {{ country.name }}
              </span>
            </div>
          </div>

          <div
            v-if="movie.credits?.cast?.length"
            class="mb-6"
          >
            <h3 class="mb-4 text-lg font-semibold">В ролях</h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="actor in topCast"
                :key="actor.id"
                class="flex items-center space-x-3 rounded-lg bg-theme-secondary p-3 transition-colors"
              >
                <div class="flex-shrink-0">
                  <img
                    v-if="actor.profile_path"
                    :src="getProfileUrl(actor.profile_path) || ''"
                    :alt="actor.name"
                    class="h-12 w-12 rounded-full object-cover"
                  />
                  <div
                    v-else
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-400"
                  >
                    <span class="text-sm font-semibold text-white">{{ actor.name.charAt(0) }}</span>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium text-theme-text">{{ actor.name }}</p>
                  <p class="truncate text-xs text-theme-muted">{{ actor.character }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="movie.production_companies?.length"
            class="mb-6"
          >
            <h3 class="mb-2 text-lg font-semibold">Производство</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="company in movie.production_companies"
                :key="company.id"
                class="rounded-full bg-theme-secondary px-3 py-1 text-sm text-theme-text"
              >
                {{ company.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="text-center">
            <img
              v-if="posterUrl"
              :src="posterUrl"
              :alt="movie.title"
              class="mx-auto h-96 w-64 rounded-lg object-cover shadow-lg"
            />
            <div
              v-else
              class="mx-auto flex h-96 w-64 items-center justify-center rounded-lg bg-gray-200"
            >
              <span class="text-gray-400">Нет постера</span>
            </div>
          </div>

          <div class="space-y-4">
            <Button
              v-if="isAuthenticated"
              class="w-full"
              :loading="isPending || accountStateFetching"
              @click="handleToggleFavorite"
            >
              <template #icon>
                <HeartSolidIcon
                  v-if="isCurrentlyFavorite"
                  class="mr-2 h-5 w-5"
                />
                <HeartIcon
                  v-else
                  class="mr-2 h-5 w-5"
                />
              </template>
              {{ isCurrentlyFavorite ? "Удалить из избранного" : "Добавить в избранное" }}
            </Button>

            <a
              v-if="movie.homepage"
              :href="movie.homepage"
              target="_blank"
              class="block w-full rounded-small bg-blue-500 px-4 py-3 text-center text-white transition-colors hover:bg-blue-600"
            >
              Официальный сайт
            </a>
          </div>

          <div class="rounded-lg bg-theme-secondary p-4">
            <h3 class="mb-4 text-lg font-semibold">Статистика</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-theme-text">Рейтинг:</span>
                <span class="font-semibold">{{ movie.vote_average.toFixed(1) }}/10 ({{ movie.vote_count.toLocaleString() }})</span>
              </div>
              <div class="flex justify-between">
                <span class="text-theme-text">Популярность:</span>
                <span class="font-semibold">{{ movie.popularity.toFixed(0) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-theme-text">Статус:</span>
                <span class="font-semibold">{{ movie.status }}</span>
              </div>
              <div
                v-if="movie.budget > 0"
                class="flex justify-between"
              >
                <span class="text-theme-text">Бюджет:</span>
                <span class="font-semibold">${{ movie.budget.toLocaleString() }}</span>
              </div>
              <div
                v-if="movie.revenue > 0"
                class="flex justify-between"
              >
                <span class="text-theme-text">Сборы:</span>
                <span class="font-semibold">${{ movie.revenue.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { HeartIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { movieApi } from '@/api/MovieApi.ts'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid'
import { useQuery } from '@tanstack/vue-query'
import { accountApi } from '@/api/AccountApi'
import { ACCOUNT_STATE_KEY, DETAILS_KEY, MOVIE_KEY } from '@/constants/queryKeys'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { getBackdropUrl, getPosterUrl, getProfileUrl } from '@/utils/getImage.ts'
import { useFavoriteMovie } from '@/composables/useFavoriteMovie.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { CACHE_TIME } from '@/constants/times.ts'
import { storeToRefs } from 'pinia'
import { SIZES } from '@/constants/ui.ts'

interface Props {
  id: string
}

const props = defineProps<Props>()

const { isAuthenticated, sessionId } = storeToRefs(useAuthStore())

const { data: accountState, isFetching: accountStateFetching } = useQuery({
  queryKey: [ACCOUNT_STATE_KEY, props.id],
  queryFn: () => accountApi.getMovieAccountStates(Number(props.id), sessionId.value!),
  enabled: computed(() => isAuthenticated.value && !!sessionId.value && !!props.id),
  staleTime: Infinity,
  gcTime: CACHE_TIME,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
})

const {
  data: movie,
  isFetching,
  isError,
  error,
} = useQuery({
  queryKey: [MOVIE_KEY, DETAILS_KEY, props.id],
  queryFn: () => movieApi.getMovieDetails(Number(props.id)),
  enabled: !!props.id,
})

const { isCurrentlyFavorite, handleToggleFavorite, isPending } = useFavoriteMovie(movie, accountState)

const posterUrl = computed(() => {
  return getPosterUrl(movie.value?.poster_path || null, SIZES.l)
})

const backdropUrl = computed(() => {
  return getBackdropUrl(movie.value?.backdrop_path || null)
})

const topCast = computed(() => {
  if (!movie.value?.credits?.cast) return []
  return movie.value.credits.cast.slice(0, 15)
})
</script>
