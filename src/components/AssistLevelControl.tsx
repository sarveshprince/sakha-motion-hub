import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";

interface AssistLevelControlProps {
  level: number;
  onLevelChange: (level: number) => void;
}

const levelLabels = ["Off", "Minimal", "Low", "Medium", "High", "Maximum"];
const levelColors = ["text-muted-foreground", "text-success", "text-success", "text-warning", "text-warning", "text-destructive"];

export const AssistLevelControl = ({ level, onLevelChange }: AssistLevelControlProps) => {
  return (
    <Card className="glass-card p-5">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Assistance Level</h3>
          </div>
          <Badge variant="secondary" className={levelColors[level]}>
            {levelLabels[level]}
          </Badge>
        </div>

        <div className="space-y-3">
          <Slider
            value={[level]}
            onValueChange={(value) => onLevelChange(value[0])}
            max={5}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            {levelLabels.map((label, idx) => (
              <span 
                key={idx}
                className={idx === level ? "text-primary font-semibold" : ""}
              >
                {idx}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Adjusts the intensity of motion assistance provided by the exosuit actuators.
          </p>
        </div>
      </div>
    </Card>
  );
};
