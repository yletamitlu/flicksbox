import { API_CONFIG, IMAGE_SIZES } from '@/config/api.ts'
import { SIZES } from '@/constants/ui.ts'

export const getImageUrl = (path: string | null, size: string = 'w500'): string | null => {
  if (!path) return null
  return `${API_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}

export const getPosterUrl = (path: string | null, size: keyof typeof IMAGE_SIZES.POSTER = SIZES.m): string | null => {
  return getImageUrl(path, IMAGE_SIZES.POSTER[size])
}

export const getBackdropUrl = (path: string | null, size: keyof typeof IMAGE_SIZES.BACKDROP = SIZES.l): string | null => {
  return getImageUrl(path, IMAGE_SIZES.BACKDROP[size])
}

export const getProfileUrl = (path: string | null, size: keyof typeof IMAGE_SIZES.PROFILE = SIZES.m): string | null => {
  return getImageUrl(path, IMAGE_SIZES.PROFILE[size])
}
