import { Menu, X, Cpu, LogOut } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  to: string
}

const publicNavItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
  { label: "Documentation", to: "/#docs" }
]

const dashboardNavItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Modes", to: "/dashboard#modes" },
  { label: "Sensors", to: "/dashboard#sensors" },
  { label: "Assist Control", to: "/dashboard#assist-control" },
  { label: "Analytics", to: "/dashboard#analytics" },
  { label: "Device Status", to: "/dashboard#device-status" },
  { label: "Calibration", to: "/dashboard#calibration" }
]

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const navItems = isAuthenticated ? dashboardNavItems : publicNavItems

  const handleSignOut = async () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    setIsSigningOut(true)
    try {
      await logout()
      navigate("/")
    } finally {
      setIsSigningOut(false)
      setMobileOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-105">
            <Cpu className="h-5 w-5" />
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-tight">Sakha Motion Hub</p>
            <p className="text-xs text-muted-foreground">ExoFlex Platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-accent/40 hover:text-foreground",
                  isActive && (item.to === "/" || item.to === "/dashboard") ? "bg-accent/45 text-foreground" : ""
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <Button size="sm" variant="outline" className="gap-1" onClick={() => void handleSignOut()} disabled={isSigningOut}>
              <LogOut className="h-4 w-4" />
              {isSigningOut ? "Signing Out" : "Sign Out"}
            </Button>
          ) : (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent/40 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border/70 bg-background/95 px-4 py-4 backdrop-blur md:hidden">
          <div className="container space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2">
              {isAuthenticated ? (
                <Button className="w-full" variant="outline" onClick={() => void handleSignOut()} disabled={isSigningOut}>
                  {isSigningOut ? "Signing Out" : "Sign Out"}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register" onClick={() => setMobileOpen(false)}>
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
