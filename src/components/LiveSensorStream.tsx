import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Gauge, Footprints } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import legDiagram from "@/assets/leg-diagram.png";

interface SensorData {
  thighAngle: number;
  shankAngle: number;
  cableTorque: number;
  footPressure: number;
  stepCount: number;
  gaitSymmetry: number;
}

interface LiveSensorStreamProps {
  data: SensorData;
}

export const LiveSensorStream = ({ data }: LiveSensorStreamProps) => {
  return (
    <div className="space-y-4">
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Live Sensor Stream</h2>
          </div>
          <Badge variant="default" className="animate-pulse">
            Real-time
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Sensor readings */}
          <div className="space-y-4">
            {/* IMU Angles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Thigh IMU Angle</span>
                <span className="text-lg font-bold text-primary">{data.thighAngle}°</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Shank IMU Angle</span>
                <span className="text-lg font-bold text-secondary">{data.shankAngle}°</span>
              </div>
            </div>

            {/* Cable Torque */}
            <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">Cable Torque (SEA)</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-accent">{data.cableTorque}</span>
                <span className="text-sm text-muted-foreground">N⋅m</span>
              </div>
              <Progress value={(data.cableTorque / 100) * 100} className="h-2 mt-2" />
            </div>

            {/* Foot Pressure */}
            <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <Footprints className="h-4 w-4 text-secondary" />
                <span className="text-sm font-semibold">Foot Pressure</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-secondary">{data.footPressure}</span>
                <span className="text-sm text-muted-foreground">kPa</span>
              </div>
              <Progress value={(data.footPressure / 200) * 100} className="h-2 mt-2" />
            </div>
          </div>

          {/* Right: Visual diagram */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/30 rounded-lg p-4">
            <img 
              src={legDiagram} 
              alt="Leg sensor diagram" 
              className="w-full max-w-[280px] object-contain opacity-90"
            />
          </div>
        </div>
      </Card>

      {/* Gait Metrics */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass-card p-5">
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Step Count</span>
            <p className="text-3xl font-bold text-primary">{data.stepCount}</p>
            <p className="text-xs text-muted-foreground">steps taken</p>
          </div>
        </Card>

        <Card className="glass-card p-5">
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Gait Symmetry</span>
            <p className="text-3xl font-bold text-success">{data.gaitSymmetry}%</p>
            <Progress value={data.gaitSymmetry} className="h-2" />
          </div>
        </Card>
      </div>
    </div>
  );
};
