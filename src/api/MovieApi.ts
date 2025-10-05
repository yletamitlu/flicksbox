import { ApiClient } from '@/services/ApiClient.ts'
import type { MovieDetails, SearchResponse } from '@/types/movie'

export class MovieApi extends ApiClient {
  async searchMovies(query: string, page: number = 1): Promise<SearchResponse> {
    return this.request<SearchResponse>('/search/movie', {
      params: {
        query,
        page,
      },
    })
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.request<MovieDetails>(`/movie/${movieId}`, {
      params: {
        append_to_response: 'images,credits',
      },
    })
  }

  async getPopularMovies(page: number = 1): Promise<SearchResponse> {
    return this.request<SearchResponse>('/movie/popular', {
      params: { page },
    })
  }
}

export const movieApi = new MovieApi()
