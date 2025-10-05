import { SIZES } from '@/constants/ui.ts'

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN as string | undefined
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_TMDB_API_BASE || 'https://api.themoviedb.org/3',
  API_KEY: API_KEY || '',
  READ_ACCESS_TOKEN: READ_ACCESS_TOKEN || '',
  LANGUAGE: import.meta.env.VITE_DEFAULT_LANG || 'ru-RU',
  IMAGE_BASE_URL: import.meta.env.VITE_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p',
} as const

export const IMAGE_SIZES = {
  POSTER: {
    [SIZES.s]: 'w185',
    [SIZES.m]: 'w500',
    [SIZES.l]: 'w780',
  },
  BACKDROP: {
    [SIZES.s]: 'w300',
    [SIZES.m]: 'w780',
    [SIZES.l]: 'w1280',
  },
  PROFILE: {
    [SIZES.s]: 'w45',
    [SIZES.m]: 'w185',
    [SIZES.l]: 'h632',
  },
}
