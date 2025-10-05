import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { FAVORITES_KEY } from '@/constants/queryKeys'
import { accountApi } from '@/api/AccountApi'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import type { Movie } from '@/types/movie'
import { INITIAL_PAGE } from '@/constants/pagination.ts'

export const useFavoritesStore = defineStore('favorites', () => {
  const { isAuthenticated, sessionId, accountId } = storeToRefs(useAuthStore())

  const favorites = ref<Movie[]>([])
  const totalResults = ref(0)
  const totalPages = ref(0)
  const currentPage = ref(INITIAL_PAGE)
  const error = ref<string | null>(null)
  const favoritesCount = computed(() => totalResults.value)

  const isFavorite = (movieId: number) => {
    return favorites.value.some((movie) => movie.id === movieId)
  }

  const {
    data,
    isFetching,
    error: errorFromApi,
    refetch,
  } = useQuery({
    queryKey: [accountId.value, currentPage, FAVORITES_KEY],
    queryFn: async () => {
      if (!accountId.value || !sessionId.value) {
        throw new Error('нет авторизации!!')
      }
      return accountApi.getFavoriteMovies(accountId.value, sessionId.value, currentPage.value)
    },
    enabled: computed(() => isAuthenticated.value && !!accountId.value),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  watch(
    () => data.value,
    (data) => {
      if (data?.results) {
        favorites.value = data.results
        totalResults.value = data.total_results || 0
        totalPages.value = data.total_pages || 0
      }
    },
    { immediate: true },
  )

  watch(
    () => errorFromApi.value,
    (err) => {
      error.value = err?.message || null
    },
  )

  const onSuccessToggleFavorites = (movie: Movie, favorite: boolean) => {
    if (favorite) {
      totalResults.value += 1
    } else {
      totalResults.value = Math.max(0, totalResults.value - 1)
      const removeId = Number(movie.id)
      favorites.value = favorites.value.filter((fav) => Number(fav.id) !== removeId)
    }
  }

  const loadFavorites = () => {
    if (isAuthenticated.value) {
      refetch()
    }
  }

  const clearFavorites = () => {
    favorites.value = []
    totalResults.value = 0
    totalPages.value = 0
    currentPage.value = INITIAL_PAGE
  }

  return {
    isFetching,
    favorites,
    totalResults,
    totalPages,
    currentPage,
    error,

    favoritesCount,
    isFavorite,

    loadFavorites,
    clearFavorites,
    onSuccessToggleFavorites,
  }
})
