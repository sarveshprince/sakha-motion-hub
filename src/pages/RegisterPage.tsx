import { FormEvent, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationMessage = useMemo(() => {
    if (!confirmPassword) {
      return null
    }

    return password === confirmPassword ? null : "Passwords do not match"
  }, [confirmPassword, password])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    try {
      await register({ name, email, password })
      navigate("/dashboard", { replace: true })
    } catch (submitError: unknown) {
      const fallbackMessage = "Unable to create account."
      setError(submitError instanceof Error ? submitError.message : fallbackMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container flex min-h-[calc(100vh-16rem)] items-center justify-center py-12">
      <Card className="glass-card w-full max-w-md border-slate-200/80 bg-white/80 shadow-card animate-[fade-in_600ms_ease-out]">
        <CardHeader className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Create Workspace</p>
          <CardTitle className="text-2xl tracking-tight">Register for ExoFlex</CardTitle>
          <CardDescription>Set up your secure account to access robotics analytics.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-11 border-slate-200 bg-white/80"
                required
              />
            </div>

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
                autoComplete="new-password"
                value={password}
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 border-slate-200 bg-white/80"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="h-11 border-slate-200 bg-white/80"
                required
              />
            </div>

            {validationMessage ? <p className="text-sm text-red-600">{validationMessage}</p> : null}
            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            ) : null}

            <Button type="submit" className="h-11 w-full" disabled={isSubmitting || Boolean(validationMessage)}>
              {isSubmitting ? "Creating Account..." : "Register"}
            </Button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-cyan-700 transition-colors hover:text-cyan-600">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default RegisterPage
