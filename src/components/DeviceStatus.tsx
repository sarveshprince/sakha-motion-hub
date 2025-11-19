import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Battery, Power, Thermometer, Zap, Settings2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DeviceStatusProps {
  isActive: boolean;
  onActiveChange: (active: boolean) => void;
  batteryLevel: number;
  temperature: number;
  motorCurrent: number;
}

export const DeviceStatus = ({ 
  isActive, 
  onActiveChange, 
  batteryLevel,
  temperature,
  motorCurrent 
}: DeviceStatusProps) => {
  const getBatteryColor = (level: number) => {
    if (level > 60) return "text-success";
    if (level > 30) return "text-warning";
    return "text-destructive";
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 40) return "text-success";
    if (temp < 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Power className={isActive ? "h-5 w-5 text-primary" : "h-5 w-5 text-muted-foreground"} />
          <h3 className="font-semibold">Device Status</h3>
        </div>
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Standby"}
        </Badge>
      </div>

      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
        <span className="text-sm font-medium">Real-time Assist</span>
        <Switch checked={isActive} onCheckedChange={onActiveChange} />
      </div>

      <div className="space-y-3 pt-2 border-t border-border/50">
        {/* Battery */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className={`h-4 w-4 ${getBatteryColor(batteryLevel)}`} />
              <span className="text-sm">Battery</span>
            </div>
            <span className={`text-sm font-semibold ${getBatteryColor(batteryLevel)}`}>
              {batteryLevel}%
            </span>
          </div>
          <Progress value={batteryLevel} className="h-2" />
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className={`h-4 w-4 ${getTemperatureColor(temperature)}`} />
              <span className="text-sm">Temperature</span>
            </div>
            <span className={`text-sm font-semibold ${getTemperatureColor(temperature)}`}>
              {temperature}°C
            </span>
          </div>
          <Progress value={(temperature / 80) * 100} className="h-2" />
        </div>

        {/* Motor Current */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm">Motor Current</span>
            </div>
            <span className="text-sm font-semibold text-accent">
              {motorCurrent.toFixed(2)}A
            </span>
          </div>
          <Progress value={(motorCurrent / 5) * 100} className="h-2" />
        </div>
      </div>

      <Button variant="outline" className="w-full" size="sm">
        <Settings2 className="h-4 w-4 mr-2" />
        View Diagnostics
      </Button>
    </Card>
  );
};
