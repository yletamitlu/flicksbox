import { ApiClient } from '@/services/ApiClient.ts'
import type { Genre } from '@/types/movie'

export class GenreApi extends ApiClient {
  async getGenres(): Promise<{ genres: Genre[] }> {
    return this.request<{ genres: Genre[] }>('/genre/movie/list')
  }
}

export const genreApi = new GenreApi()
