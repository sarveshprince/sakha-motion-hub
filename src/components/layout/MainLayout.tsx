import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Navbar } from "@/components/ui/Navbar"

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative flex min-h-screen flex-col overflow-x-clip">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(22,78,99,0.16),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.12),transparent_46%)]" />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
