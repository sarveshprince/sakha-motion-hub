import { Navigate, Outlet } from "react-router-dom"
import { useAuth, UserRole } from "@/hooks/useAuth"

interface ProtectedRouteProps {
  requiredRole?: UserRole
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading session...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
