import { Activity, Dumbbell, Move, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Mode {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const modes: Mode[] = [
  { id: "walking", name: "Walking Assist", icon: Activity, description: "Gait support and optimization" },
  { id: "lifting", name: "Lifting Assist", icon: Dumbbell, description: "Load sharing and support" },
  { id: "squat", name: "Squat Assist", icon: Move, description: "Lower body motion assist" },
  { id: "rehab", name: "Rehabilitation", icon: Heart, description: "Therapeutic motion support" },
];

interface ModeSelectorProps {
  selectedMode: string;
  onModeChange: (mode: string) => void;
}

export const ModeSelector = ({ selectedMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        Assist Mode
      </h3>
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = selectedMode === mode.id;
        
        return (
          <Card
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={cn(
              "p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]",
              isActive 
                ? "glass-card border-primary bg-gradient-to-br from-primary/10 to-secondary/10 glow" 
                : "bg-card hover:bg-muted/50"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className={cn(
                  "font-semibold text-sm mb-1",
                  isActive && "text-primary"
                )}>
                  {mode.name}
                </h4>
                <p className="text-xs text-muted-foreground">{mode.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
