import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AANData {
  userEffort: number;
  assistLevel: number;
  dynamicStiffness: number;
  dynamicDamping: number;
}

interface AssistAsNeededProps {
  data: AANData;
  onCalibrate: () => void;
  onApplyProfile: () => void;
}

export const AssistAsNeeded = ({ data, onCalibrate, onApplyProfile }: AssistAsNeededProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-lg">Assist-as-Needed (AAN)</h3>
          </div>
          <Badge variant="secondary" className="text-primary">
            Adaptive Control
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Real-time adaptation based on IMU angles, torque sensing, and foot pressure fusion.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* User Effort */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">User Effort</span>
              <span className="text-sm font-semibold">{data.userEffort}%</span>
            </div>
            <Progress value={data.userEffort} className="h-2" />
          </div>

          {/* Assist Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Assist Level</span>
              <span className="text-sm font-semibold text-primary">{data.assistLevel}%</span>
            </div>
            <Progress value={data.assistLevel} className="h-2" />
          </div>

          {/* Dynamic Stiffness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Dyn. Stiffness</span>
              <span className="text-sm font-semibold text-secondary">{data.dynamicStiffness}</span>
            </div>
            <Progress value={(data.dynamicStiffness / 500) * 100} className="h-2" />
          </div>

          {/* Dynamic Damping */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Dyn. Damping</span>
              <span className="text-sm font-semibold text-accent">{data.dynamicDamping}</span>
            </div>
            <Progress value={(data.dynamicDamping / 50) * 100} className="h-2" />
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-border/50">
          <Button variant="outline" className="flex-1" size="sm" onClick={onCalibrate}>
            <Settings className="h-4 w-4 mr-2" />
            Run Calibration
          </Button>
          <Button className="flex-1" size="sm" onClick={onApplyProfile}>
            <Play className="h-4 w-4 mr-2" />
            Apply Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};
