import { ApiClient } from '@/services/ApiClient.ts'
import { AccountDetails, FavoriteMoviesResponse, MovieAccountState } from '@/types/account.ts'

export class AccountApi extends ApiClient {
  async getAccountDetails(sessionId: string): Promise<AccountDetails> {
    return this.request<AccountDetails>('/account', {
      params: {
        session_id: sessionId,
      },
    })
  }

  async getFavoriteMovies(accountId: number, sessionId: string, page: number = 1): Promise<FavoriteMoviesResponse> {
    return this.request<FavoriteMoviesResponse>(`/account/${accountId}/favorite/movies`, {
      params: {
        session_id: sessionId,
        page,
      },
    })
  }

  async addToFavorites(accountId: number, sessionId: string, movieId: number, favorite: boolean): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/account/${accountId}/favorite`, {
      method: 'POST',
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        favorite,
      }),
      params: {
        session_id: sessionId,
      },
    })
  }

  async getMovieAccountStates(movieId: number, sessionId: string): Promise<MovieAccountState> {
    return this.request<{ id: number; favorite: boolean; rated: boolean | { value: number }; watchlist: boolean }>(`/movie/${movieId}/account_states`, {
      params: {
        session_id: sessionId,
      },
    })
  }
}

export const accountApi = new AccountApi()
