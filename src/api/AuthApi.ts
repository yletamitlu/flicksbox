import { ApiClient } from '../services/ApiClient.ts'

export interface RequestTokenResponse {
  success: boolean
  request_token: string
  expires_at: string
}

export interface SessionResponse {
  success: boolean
  session_id: string
}

export class AuthApi extends ApiClient {
  async createRequestToken(): Promise<RequestTokenResponse> {
    return this.request<RequestTokenResponse>('/authentication/token/new')
  }

  async validateRequestToken(username: string, password: string, requestToken: string): Promise<RequestTokenResponse> {
    return this.request<RequestTokenResponse>('/authentication/token/validate_with_login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        request_token: requestToken,
      }),
    })
  }

  async createSession(requestToken: string): Promise<SessionResponse> {
    return this.request<SessionResponse>('/authentication/session/new', {
      method: 'POST',
      body: JSON.stringify({
        request_token: requestToken,
      }),
    })
  }

  async deleteSession(sessionId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/authentication/session', {
      method: 'DELETE',
      body: JSON.stringify({
        session_id: sessionId,
      }),
    })
  }
}

export const authApi = new AuthApi()
