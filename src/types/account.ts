export interface AccountDetails {
    id: number
    username: string
    name: string
    include_adult: boolean
    avatar: {
        gravatar: {
            hash: string
        }
        tmdb: {
            avatar_path: string | null
        }
    }
}

export interface FavoriteMoviesResponse {
    page: number
    results: any[]
    total_pages: number
    total_results: number
}

export interface MovieAccountState {
    id: number
    favorite: boolean
    rated: boolean | { value: number }
    watchlist: boolean
}
