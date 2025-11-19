import { Card } from "@/components/ui/card";
import { Activity, Timer, TrendingUp, Scale } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GaitMetrics {
  stepCount: number;
  strideTime: number;
  fatigueIndex: number;
  symmetryScore: number;
}

interface GaitAnalyticsProps {
  metrics: GaitMetrics;
}

export const GaitAnalytics = ({ metrics }: GaitAnalyticsProps) => {
  const getFatigueColor = (index: number) => {
    if (index < 30) return "text-success";
    if (index < 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-lg">Gait Analytics</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Step Count */}
          <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Steps</span>
            </div>
            <p className="text-2xl font-bold text-primary">{metrics.stepCount}</p>
          </div>

          {/* Stride Time */}
          <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="h-4 w-4 text-secondary" />
              <span className="text-xs font-medium text-muted-foreground">Stride Time</span>
            </div>
            <p className="text-2xl font-bold text-secondary">{metrics.strideTime}s</p>
          </div>

          {/* Fatigue Index */}
          <div className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg border border-warning/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-warning" />
              <span className="text-xs font-medium text-muted-foreground">Fatigue Index</span>
            </div>
            <p className={`text-2xl font-bold ${getFatigueColor(metrics.fatigueIndex)}`}>
              {metrics.fatigueIndex}%
            </p>
            <Progress value={metrics.fatigueIndex} className="h-1.5 mt-2" />
          </div>

          {/* Symmetry Score */}
          <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-4 w-4 text-success" />
              <span className="text-xs font-medium text-muted-foreground">Symmetry</span>
            </div>
            <p className="text-2xl font-bold text-success">{metrics.symmetryScore}%</p>
            <Progress value={metrics.symmetryScore} className="h-1.5 mt-2" />
          </div>
        </div>

        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Real-time analysis of gait patterns and motion quality. Higher symmetry and lower fatigue indicate optimal performance.
          </p>
        </div>
      </div>
    </Card>
  );
};
