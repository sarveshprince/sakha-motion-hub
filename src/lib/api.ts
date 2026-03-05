export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000" || "https://exo-flex-backend.vercel.app"
export const TOKEN_STORAGE_KEY = "exoflex_auth_token"

export interface ApiError extends Error {
  status: number
}

function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers = new Headers(init.headers)

  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include"
  })

  if (!response.ok) {
    let message = "Request failed"

    try {
      const errorBody = (await response.json()) as { error?: string }
      if (errorBody.error) {
        message = errorBody.error
      }
    } catch {
      message = response.statusText || message
    }

    const error = new Error(message) as ApiError
    error.status = response.status
    throw error
  }

  if (response.status === 204) {
    return {} as T
  }

  return (await response.json()) as T
}
