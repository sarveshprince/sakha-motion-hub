import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { apiRequest, ApiError, clearAuthToken, setAuthToken, TOKEN_STORAGE_KEY } from "@/lib/api"

export type UserRole = "ADMIN" | "USER"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload extends LoginPayload {
  name: string
}

interface AuthResponse {
  token: string
  user: AuthUser
}

interface MeResponse {
  user: AuthUser
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  checkTokenValidity: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const response = await apiRequest<MeResponse>("/auth/me")
      setUser(response.user)
    } catch (error) {
      const apiError = error as ApiError
      if (apiError.status === 401) {
        clearAuthToken()
      }
      setUser(null)
      throw error
    }
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    })

    setAuthToken(response.token)
    setUser(response.user)
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    })

    setAuthToken(response.token)
    setUser(response.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiRequest<{ message: string }>("/auth/logout", {
        method: "POST"
      })
    } finally {
      clearAuthToken()
      setUser(null)
    }
  }, [])

  const checkTokenValidity = useCallback(async () => {
    try {
      await refreshUser()
      return true
    } catch {
      return false
    }
  }, [refreshUser])

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY)

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        await refreshUser()
      } finally {
        setIsLoading(false)
      }
    }

    void bootstrapAuth()
  }, [refreshUser])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
      checkTokenValidity
    }),
    [checkTokenValidity, isLoading, login, logout, refreshUser, register, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
