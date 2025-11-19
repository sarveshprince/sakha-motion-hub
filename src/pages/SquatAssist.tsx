import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Move, TrendingDown, Target, Zap, PlayCircle, PauseCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import legMechanism from "@/assets/exosuit-leg-mechanism.jpg";

const SquatAssist = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [squatPhase, setSquatPhase] = useState("Standing");
  const [targetDepth, setTargetDepth] = useState([90]); // degrees
  const [assistPower, setAssistPower] = useState([65]);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [kneeTorque, setKneeTorque] = useState(0);
  const [hipTorque, setHipTorque] = useState(0);
  
  const [metrics, setMetrics] = useState({
    totalReps: 0,
    avgDepth: 0,
    peakTorque: 0,
    formQuality: 0,
  });

  // Simulate squat cycle
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentDepth(prev => {
        if (prev < targetDepth[0] && squatPhase === "Descending") {
          return Math.min(prev + 5, targetDepth[0]);
        } else if (prev >= targetDepth[0] && squatPhase === "Descending") {
          setSquatPhase("Bottom");
          setTimeout(() => setSquatPhase("Ascending"), 500);
          return prev;
        } else if (prev > 0 && squatPhase === "Ascending") {
          return Math.max(prev - 5, 0);
        } else if (prev === 0 && squatPhase === "Ascending") {
          setSquatPhase("Standing");
          setMetrics(m => ({
            ...m,
            totalReps: m.totalReps + 1,
            avgDepth: (m.avgDepth * m.totalReps + targetDepth[0]) / (m.totalReps + 1),
            formQuality: Math.min(95, m.formQuality + 1),
          }));
          setTimeout(() => setSquatPhase("Descending"), 1000);
          return 0;
        }
        return prev;
      });

      setKneeTorque(currentDepth * 0.8 * (assistPower[0] / 100));
      setHipTorque(currentDepth * 1.2 * (assistPower[0] / 100));
      setMetrics(m => ({
        ...m,
        peakTorque: Math.max(m.peakTorque, kneeTorque + hipTorque),
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, currentDepth, squatPhase, targetDepth, assistPower, kneeTorque, hipTorque]);

  const handleToggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setSquatPhase("Descending");
      toast({
        title: "Squat Assist Active",
        description: "Begin your squat motion",
      });
    } else {
      setSquatPhase("Standing");
      setCurrentDepth(0);
      toast({
        title: "Squat Assist Paused",
        description: "Exercise paused",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Move className="h-8 w-8 text-primary" />
              Squat Assist Mode
            </h1>
            <p className="text-muted-foreground mt-1">
              Lower body motion assistance and form tracking
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={handleToggle}
            variant={isActive ? "destructive" : "default"}
          >
            {isActive ? <PauseCircle className="h-5 w-5 mr-2" /> : <PlayCircle className="h-5 w-5 mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Squat Parameters</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Depth</span>
                    <span className="text-sm font-semibold">{targetDepth[0]}°</span>
                  </div>
                  <Slider 
                    value={targetDepth} 
                    onValueChange={setTargetDepth}
                    min={45}
                    max={110}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Parallel</span>
                    <span>Full Depth</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Assist Power</span>
                    <span className="text-sm font-semibold text-primary">{assistPower[0]}%</span>
                  </div>
                  <Slider 
                    value={assistPower} 
                    onValueChange={setAssistPower}
                    min={0}
                    max={100}
                  />
                </div>

                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Current Phase</p>
                    <Badge variant="default" className="text-lg px-4 py-2">
                      {squatPhase}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-3">Current Depth</h3>
              <div className="text-center">
                <p className="text-5xl font-bold text-primary mb-2">{currentDepth.toFixed(0)}°</p>
                <Progress value={(currentDepth / targetDepth[0]) * 100} className="h-4" />
                <p className="text-sm text-muted-foreground mt-2">
                  {((currentDepth / targetDepth[0]) * 100).toFixed(0)}% of target
                </p>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <img 
                src={legMechanism} 
                alt="Leg mechanism" 
                className="w-full rounded-lg"
              />
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Knee & hip joint actuators
              </p>
            </Card>
          </div>

          {/* Center & Right Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="glass-card p-5">
                <Move className="h-5 w-5 text-primary mb-2" />
                <p className="text-2xl font-bold">{metrics.totalReps}</p>
                <p className="text-xs text-muted-foreground">Total Reps</p>
              </Card>

              <Card className="glass-card p-5">
                <TrendingDown className="h-5 w-5 text-secondary mb-2" />
                <p className="text-2xl font-bold">{metrics.avgDepth.toFixed(0)}°</p>
                <p className="text-xs text-muted-foreground">Avg Depth</p>
              </Card>

              <Card className="glass-card p-5">
                <Zap className="h-5 w-5 text-accent mb-2" />
                <p className="text-2xl font-bold">{metrics.peakTorque.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Peak Torque</p>
              </Card>

              <Card className="glass-card p-5">
                <Target className="h-5 w-5 text-success mb-2" />
                <p className="text-2xl font-bold">{metrics.formQuality.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">Form Quality</p>
              </Card>
            </div>

            <Card className="glass-card p-6">
              <h3 className="font-bold text-lg mb-4">Real-time Torque Support</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Knee Torque Assist</span>
                    <span className="text-sm font-semibold text-primary">{kneeTorque.toFixed(1)} N⋅m</span>
                  </div>
                  <Progress value={(kneeTorque / 100) * 100} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Hip Torque Assist</span>
                    <span className="text-sm font-semibold text-secondary">{hipTorque.toFixed(1)} N⋅m</span>
                  </div>
                  <Progress value={(hipTorque / 150) * 100} className="h-3" />
                </div>

                <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Assist Torque</span>
                    <span className="text-2xl font-bold text-accent">
                      {(kneeTorque + hipTorque).toFixed(1)} N⋅m
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Squat Assistance Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Eccentric Control</h4>
                  <p className="text-sm text-muted-foreground">
                    Smooth descent with controlled deceleration
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Concentric Boost</h4>
                  <p className="text-sm text-muted-foreground">
                    Power assistance during ascent phase
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Form Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    IMU-based depth and angle monitoring
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Range Limiting</h4>
                  <p className="text-sm text-muted-foreground">
                    Prevents excessive depth for safety
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-3">Depth Markers</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Quarter</p>
                  <p className="text-lg font-bold">45°</p>
                </div>
                <div className="text-center p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Parallel</p>
                  <p className="text-lg font-bold text-primary">90°</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Deep</p>
                  <p className="text-lg font-bold">110°</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquatAssist;
