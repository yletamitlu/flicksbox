import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/AuthApi'
import { accountApi, type AccountDetails } from '@/api/AccountApi'
import { useFavoritesStore } from '@/stores/useFavoritesStore.ts'

export const useAuthStore = defineStore('auth', () => {
  const sessionId = ref<string | null>(null)
  const accountDetails = ref<AccountDetails | null>(null)
  const isFetching = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!sessionId.value)
  const username = computed(() => accountDetails.value?.username || null)
  const accountId = computed(() => accountDetails.value?.id || null)

  const loadFromStorage = () => {
    try {
      const storedSessionId = sessionStorage.getItem('tmdb_session_id')
      const storedAccountDetails = sessionStorage.getItem('tmdb_account_details')

      if (storedSessionId) {
        sessionId.value = storedSessionId
      }

      if (storedAccountDetails) {
        accountDetails.value = JSON.parse(storedAccountDetails)
      }
    } catch (error) {
      console.error(error)
      clearAuth()
    }
  }

  const saveToStorage = () => {
    if (sessionId.value) {
      sessionStorage.setItem('tmdb_session_id', sessionId.value)
    } else {
      sessionStorage.removeItem('tmdb_session_id')
    }

    if (accountDetails.value) {
      sessionStorage.setItem('tmdb_account_details', JSON.stringify(accountDetails.value))
    } else {
      sessionStorage.removeItem('tmdb_account_details')
    }
  }

  const login = async (username: string, password: string) => {
    isFetching.value = true
    error.value = null

    try {
      const tokenResponse = await authApi.createRequestToken()

      if (!tokenResponse.success) {
        throw new Error('token err')
      }

      const validateResponse = await authApi.validateRequestToken(username, password, tokenResponse.request_token)

      if (!validateResponse.success) {
        throw new Error('login error')
      }

      const sessionResponse = await authApi.createSession(validateResponse.request_token)

      if (!sessionResponse.success) {
        throw new Error('session error')
      }

      const account = await accountApi.getAccountDetails(sessionResponse.session_id)

      sessionId.value = sessionResponse.session_id
      accountDetails.value = account
      saveToStorage()

      return { success: true }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: error.value }
    } finally {
      isFetching.value = false
    }
  }

  const logout = async () => {
    isFetching.value = true

    try {
      if (sessionId.value) {
        await authApi.deleteSession(sessionId.value)
      }
    } catch (err) {
      console.error(err)
    } finally {
      clearAuth()

      const favoritesStore = useFavoritesStore()
      favoritesStore.clearFavorites()

      isFetching.value = false
    }
  }

  const clearAuth = () => {
    sessionId.value = null
    accountDetails.value = null
    error.value = null
    sessionStorage.removeItem('tmdb_session_id')
    sessionStorage.removeItem('tmdb_account_details')
  }

  const clearError = () => {
    error.value = null
  }

  loadFromStorage()

  return {
    sessionId,
    accountDetails,
    isFetching,
    error,

    isAuthenticated,
    username,
    accountId,

    login,
    logout,
    clearAuth,
    clearError,
    loadFromStorage,
  }
})
