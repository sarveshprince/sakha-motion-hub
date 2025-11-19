import { NavLink } from "@/components/NavLink";
import { Activity, Dumbbell, Move, Heart, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/walking", label: "Walking", icon: Activity },
  { path: "/lifting", label: "Lifting", icon: Dumbbell },
  { path: "/squat", label: "Squat", icon: Move },
  { path: "/rehab", label: "Rehab", icon: Heart },
];

export const Navigation = () => {
  return (
    <nav className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <img
                src="public/favicon.ico"   // <-- put your uploaded image path here
                alt="Logo"
                className="h-6 w-6 object-contain"
              />
            </div> 
            <div>
              <h1 className="font-bold text-lg gradient-text">Synthera Exoflex</h1>
              <p className="text-xs text-muted-foreground">Control System</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
                    "transition-all duration-200 hover:bg-muted/50"
                  )}
                  activeClassName="bg-primary text-primary-foreground shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
