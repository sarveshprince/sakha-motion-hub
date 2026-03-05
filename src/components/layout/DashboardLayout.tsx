import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/ui/Navbar"

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative flex min-h-screen flex-col overflow-x-clip">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

