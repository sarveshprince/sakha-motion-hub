import { Cpu, ShieldCheck, RadioTower, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

const stats = [
  { label: "Connected Nodes", value: "24", icon: RadioTower },
  { label: "Inference Streams", value: "96", icon: Cpu },
  { label: "Compliance Score", value: "99.1%", icon: ShieldCheck },
  { label: "Active Sessions", value: "42", icon: BarChart3 }
]

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <section className="container py-12 md:py-16">
      <div className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white/75 p-8 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            ExoFlex Operations Overview
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            This is a placeholder dashboard route. Use it to wire real telemetry widgets and operator workflows.
          </p>

          {!isAuthenticated ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-700">
              Signed in as <span className="font-semibold">{user?.name}</span> ({user?.role})
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-slate-200 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/10 text-cyan-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm font-medium text-slate-600">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
