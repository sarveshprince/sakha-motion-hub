import { FormEvent, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/dashboard"

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (submitError: unknown) {
      const fallbackMessage = "Unable to sign in. Please check your credentials."
      setError(submitError instanceof Error ? submitError.message : fallbackMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container flex min-h-[calc(100vh-16rem)] items-center justify-center py-12">
      <Card className="glass-card w-full max-w-md border-slate-200/80 bg-white/80 shadow-card animate-[fade-in_600ms_ease-out]">
        <CardHeader className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Access Portal</p>
          <CardTitle className="text-2xl tracking-tight">Sign In to Sakha Motion Hub</CardTitle>
          <CardDescription>Use your workspace credentials to continue.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 border-slate-200 bg-white/80"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 border-slate-200 bg-white/80"
                required
              />
            </div>

            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            ) : null}

            <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-medium text-cyan-700 transition-colors hover:text-cyan-600">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default LoginPage
