<template>
  <Card class="mb-8">
    <template #header>
      <Heading
        :level="2"
        :size="SIZES.l"
        :color="COLORS.default"
      >
        Поиск фильмов
      </Heading>
    </template>

    <div class="flex gap-4">
      <Input
        v-model="searchInputValue"
        @keyup.enter="handleSearch"
        placeholder="Введите название фильма..."
        class="flex-1"
      />
      <Button
        :disabled="!searchInputValue.trim()"
        :variant="VARIANTS.primary"
        @click="handleSearch"
      >
        Поиск
      </Button>
    </div>
  </Card>

  <MoviesGrid
    v-if="searchQuery"
    :title="searchedMoviesData?.total_results && !isSearchedMoviesFetching ? `Найдено: ${searchedMoviesData.total_results} фильмов` : ''"
    :is-fetching="isSearchedMoviesFetching"
    :total-pages="searchedMoviesData?.total_pages"
    v-model:page="currentSearchedPage"
    :movies="searchedMoviesData?.results || []"
  >
    <template #empty-content>
      <div class="py-8 text-center">
        <div class="mb-4">
          <img
            src="/src/assets/images/vincent.gif"
            alt="No movies found"
            class="mx-auto h-32 w-32 rounded-full"
          />
        </div>
        <Heading
          :level="1"
          :size="SIZES.l"
          :color="COLORS.default"
          class="mb-4 text-center"
        >
          Фильмы не найдены
        </Heading>
      </div>
    </template>
  </MoviesGrid>

  <MoviesGrid
    v-else
    title="Популярные фильмы"
    :movies="popularMoviesData?.results"
    :is-fetching="isPopularMoviesFetching"
    :total-pages="popularMoviesData?.total_pages"
    v-model:page="currentPopularPage"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { SIZES, VARIANTS, COLORS } from '@/constants/ui.ts'
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Card from '@/components/ui/Card.vue'
import MoviesGrid from '@/components/MoviesGrid.vue'
import { useQuery } from '@tanstack/vue-query'
import { MOVIE_KEY, POPULAR_KEY, SEARCH_KEY } from '@/constants/queryKeys.ts'
import { movieApi } from '@/api/MovieApi.ts'
import { INITIAL_PAGE } from '@/constants/pagination.ts'

const searchQuery = ref('')
const searchInputValue = ref('')

const handleSearch = () => {
  searchQuery.value = searchInputValue.value
  currentSearchedPage.value = INITIAL_PAGE
}

const currentPopularPage = ref(INITIAL_PAGE)

const { data: popularMoviesData, isFetching: isPopularMoviesFetching } = useQuery({
  queryKey: [MOVIE_KEY, POPULAR_KEY, currentPopularPage],
  queryFn: () => movieApi.getPopularMovies(currentPopularPage.value),
})

const currentSearchedPage = ref(INITIAL_PAGE)

const { data: searchedMoviesData, isFetching: isSearchedMoviesFetching } = useQuery({
  queryKey: [MOVIE_KEY, SEARCH_KEY, currentSearchedPage, searchQuery],
  queryFn: () => movieApi.searchMovies(searchQuery.value, currentSearchedPage.value),
  enabled: computed(() => searchQuery.value.length > 0)
})
</script>
