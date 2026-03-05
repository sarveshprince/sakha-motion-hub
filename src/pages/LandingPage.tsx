import { Activity, Binary, Gauge, LockKeyhole, Orbit, RadioTower } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import exosuitHero from "@/assets/exosuit-hero.jpg"

const features = [
  {
    title: "Real-Time Sensor Monitoring",
    description: "Track IMU, torque, and pressure streams with sub-second refresh across connected exoskeleton devices.",
    icon: RadioTower
  },
  {
    title: "AI Motion Analytics",
    description: "Model-assisted gait diagnostics and movement scoring for rehab and industrial assist workflows.",
    icon: Activity
  },
  {
    title: "Device Telemetry Dashboard",
    description: "Unified command layer for device health, mode switching, and performance trends in one interface.",
    icon: Gauge
  },
  {
    title: "Secure User Management",
    description: "Role-based access and authenticated endpoints keep robotic operations and clinical data protected.",
    icon: LockKeyhole
  }
]

const techStack = [
  {
    title: "Edge AI",
    description: "Low-latency inference near the device for adaptive assistive response.",
    icon: Orbit
  },
  {
    title: "Sensor Fusion",
    description: "Combining multimodal data for robust movement interpretation.",
    icon: Binary
  },
  {
    title: "Real-Time Streaming",
    description: "Continuous telemetry channels for mission-critical feedback loops.",
    icon: RadioTower
  },
  {
    title: "Cloud Analytics",
    description: "Historical tracking and reporting pipelines for operations and research.",
    icon: Gauge
  }
]

const LandingPage = () => {
  return (
    <div className="pb-16">
      <section className="container grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div className="space-y-8 animate-[fade-in_700ms_ease-out]">
          <p className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-700">
            Robotics Intelligence Platform
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Real-Time Motion Intelligence for Exoskeleton Systems
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Sakha Motion Hub gives research teams and operators a modern command surface for motion analytics,
              telemetry orchestration, and secure device lifecycle management.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="shadow-soft" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white/50" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="relative animate-[fade-in_1000ms_ease-out]">
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-blue-700/10 blur-3xl" />
          <Card className="glass-card border-slate-200/80 bg-white/70">
            <CardHeader>
              <CardTitle className="text-xl">Live Ops Snapshot</CardTitle>
              <CardDescription>Connected exoskeleton fleet and movement analytics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Devices Online</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">24</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Session Latency</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">34ms</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">AI Confidence</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">98.2%</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Alerts</p>
                  <p className="mt-2 text-2xl font-semibold text-cyan-700">2 Active</p>
                </div>
              </div>
              <div className="h-24 rounded-xl border border-slate-200 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:24px_24px] p-3">
                <div className="h-full rounded-lg bg-gradient-to-r from-cyan-500/20 via-blue-500/25 to-indigo-500/15" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="features" className="container py-12 md:py-16">
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Platform Features</h2>
          <p className="max-w-2xl text-slate-600">Purpose-built modules for clinicians, robotics engineers, and operations teams.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <Card key={feature.title} className="glass-card border-slate-200/80 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      <section id="about" className="container py-12 md:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-soft">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Technology Stack</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            ExoFlex combines edge intelligence and cloud analytics so motion data can be interpreted, visualized, and acted on in real time.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech) => {
              const Icon = tech.icon

              return (
                <div key={tech.title} className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:shadow-soft">
                  <Icon className="h-5 w-5 text-cyan-700" />
                  <h3 className="mt-3 font-medium text-slate-900">{tech.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{tech.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-card">
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Platform Preview</h2>
            <p className="max-w-3xl text-slate-600">
              A unified control surface for motion telemetry, assist profiles, and real-time exoskeleton operations.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
            <div className="flex items-center gap-2 border-b border-slate-700/80 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs tracking-wide text-slate-300">ExoFlex Live Dashboard</span>
            </div>
            <div className="relative">
              <img src={exosuitHero} alt="Dashboard preview" className="h-[280px] w-full object-cover md:h-[380px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-500/40 bg-slate-900/60 p-3 text-slate-100 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-slate-300">Data Throughput</p>
                  <p className="mt-1 text-xl font-semibold">1.2k/s</p>
                </div>
                <div className="rounded-lg border border-slate-500/40 bg-slate-900/60 p-3 text-slate-100 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-slate-300">Avg Inference</p>
                  <p className="mt-1 text-xl font-semibold">28ms</p>
                </div>
                <div className="rounded-lg border border-slate-500/40 bg-slate-900/60 p-3 text-slate-100 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-slate-300">Session Accuracy</p>
                  <p className="mt-1 text-xl font-semibold">98.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="docs" className="container py-12 md:py-16">
        <div className="rounded-3xl border border-slate-900 bg-slate-950 px-8 py-10 text-slate-100 shadow-card">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Ready to deploy</p>
            <h2 className="text-3xl font-semibold tracking-tight">Start Monitoring Motion Data in Real Time</h2>
            <p className="text-slate-300">
              Create an account to access secured telemetry dashboards, device-level controls, and role-based workflows.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3" id="api">
            <Button size="lg" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800" asChild>
              <Link to="/login">Sign In to Workspace</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
