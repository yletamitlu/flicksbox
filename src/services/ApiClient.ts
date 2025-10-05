import { API_CONFIG } from '@/config/api.ts'

export abstract class ApiClient {
  protected async request<T>(
    endpoint: string,
    options: {
      params?: Record<string, string | number>
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
      body?: string
      headers?: Record<string, string>
    } = {},
  ): Promise<T> {
    const { params = {}, method = 'GET', body, headers = {} } = options

    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`)

    if (API_CONFIG.API_KEY) {
      url.searchParams.set('api_key', API_CONFIG.API_KEY)
    }

    url.searchParams.set('language', API_CONFIG.LANGUAGE)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    })

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(API_CONFIG.READ_ACCESS_TOKEN ? { Authorization: `Bearer ${API_CONFIG.READ_ACCESS_TOKEN}` } : {}),
        ...headers,
      },
    }

    if (body) {
      requestOptions.body = body
    }

    const response = await fetch(url.toString(), requestOptions)

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage = `API Error: ${response.status} ${response.statusText}`

      const errorData = JSON.parse(errorText)
      if (errorData.status_message) {
        errorMessage = errorData.status_message
      }

      throw new Error(errorMessage)
    }

    return response.json()
  }
}
