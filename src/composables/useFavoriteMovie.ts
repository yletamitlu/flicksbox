import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { accountApi } from '@/api/AccountApi.ts'
import { computed, type Ref } from 'vue'
import { Movie } from '@/types/movie.ts'
import { useFavoritesStore } from '@/stores/useFavoritesStore.ts'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { Routes } from '@/constants/routes.ts'
import { useRoute } from 'vue-router'
import { FAVORITES_KEY } from '@/constants/queryKeys.ts'
import { storeToRefs } from 'pinia'
import { MovieAccountState } from '@/types/account.ts'

export const useFavoriteMovie = (movie: Ref<Movie | undefined>, accountState: Ref<MovieAccountState | undefined>) => {
  const route = useRoute()
  const { accountId, sessionId } = storeToRefs(useAuthStore())
  const queryClient = useQueryClient()
  const { isFavorite, onSuccessToggleFavorites } = useFavoritesStore()

  const isCurrentlyFavorite = computed(() => {
    if (!movie.value) {
      return false
    }

    if (route.name === Routes.Favorites) {
      return isFavorite(movie.value.id)
    }

    if (accountState.value) {
      return accountState.value.favorite
    }

    return isFavorite(movie.value.id)
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ movie, favorite }: { movie: Movie; favorite: boolean }) => {
      if (!accountId.value || !sessionId.value) {
        throw new Error('нет авторизации!!')
      }

      await accountApi.addToFavorites(accountId.value, sessionId.value, movie.id, favorite)
    },
    onSuccess: (_, { movie, favorite }) => {
      onSuccessToggleFavorites(movie, favorite)
      queryClient.setQueryData(['account_states', movie.id], {
        id: movie.id,
        favorite,
        rated: false,
        watchlist: false,
      })
      queryClient.invalidateQueries({ queryKey: [FAVORITES_KEY] })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleToggleFavorite = async () => {
    if (movie.value) {
      await mutateAsync({
        movie: movie.value,
        favorite: !isCurrentlyFavorite.value,
      })
    }
  }

  return {
    isPending,
    isCurrentlyFavorite,
    handleToggleFavorite,
  }
}
