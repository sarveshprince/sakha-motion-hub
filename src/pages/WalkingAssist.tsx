import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Activity, TrendingUp, Clock, Target, PlayCircle, PauseCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import legMechanism from "@/assets/exosuit-leg-mechanism.jpg";

const WalkingAssist = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [gaitPhase, setGaitPhase] = useState("Stance");
  const [stepCadence, setStepCadence] = useState(110);
  const [strideLength, setStrideLength] = useState(1.2);
  const [assistTiming, setAssistTiming] = useState([30]); // % of gait cycle
  const [propulsionBoost, setPropulsionBoost] = useState([60]);
  const [balanceSupport, setBalanceSupport] = useState(true);
  
  const [metrics, setMetrics] = useState({
    steps: 0,
    distance: 0,
    speed: 0,
    efficiency: 85,
  });

  // Simulate gait cycle
  useEffect(() => {
    if (!isActive) return;
    
    const phases = ["Heel Strike", "Stance", "Toe-off", "Swing"];
    let phaseIndex = 0;
    
    const interval = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setGaitPhase(phases[phaseIndex]);
      
      setMetrics(prev => ({
        steps: prev.steps + (phaseIndex === 0 ? 1 : 0),
        distance: prev.distance + (phaseIndex === 0 ? strideLength : 0),
        speed: (60 / stepCadence) * strideLength,
        efficiency: Math.min(95, prev.efficiency + Math.random() - 0.4),
      }));
    }, (60000 / stepCadence) / 4);

    return () => clearInterval(interval);
  }, [isActive, stepCadence, strideLength]);

  const handleStart = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "Walking Assist Paused" : "Walking Assist Active",
      description: isActive ? "Gait assistance paused" : "Real-time gait optimization enabled",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              Walking Assist Mode
            </h1>
            <p className="text-muted-foreground mt-1">
              Gait optimization and propulsion support
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={handleStart}
            className={isActive ? "bg-destructive hover:bg-destructive/90" : ""}
          >
            {isActive ? <PauseCircle className="h-5 w-5 mr-2" /> : <PlayCircle className="h-5 w-5 mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Gait Parameters</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Cadence</span>
                    <span className="text-sm font-semibold">{stepCadence} steps/min</span>
                  </div>
                  <Slider 
                    value={[stepCadence]} 
                    onValueChange={(v) => setStepCadence(v[0])}
                    min={80}
                    max={140}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Stride Length</span>
                    <span className="text-sm font-semibold">{strideLength.toFixed(1)}m</span>
                  </div>
                  <Slider 
                    value={[strideLength * 10]} 
                    onValueChange={(v) => setStrideLength(v[0] / 10)}
                    min={8}
                    max={18}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Assist Timing</span>
                    <span className="text-sm font-semibold">{assistTiming[0]}% of cycle</span>
                  </div>
                  <Slider 
                    value={assistTiming} 
                    onValueChange={setAssistTiming}
                    min={0}
                    max={100}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Propulsion Boost</span>
                    <span className="text-sm font-semibold">{propulsionBoost[0]}%</span>
                  </div>
                  <Slider 
                    value={propulsionBoost} 
                    onValueChange={setPropulsionBoost}
                    min={0}
                    max={100}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Balance Support</span>
                  <Switch checked={balanceSupport} onCheckedChange={setBalanceSupport} />
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <img 
                src={legMechanism} 
                alt="Leg mechanism" 
                className="w-full rounded-lg"
              />
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Cable-driven leg actuator system
              </p>
            </Card>
          </div>

          {/* Center Panel - Live Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Current Gait Phase</h3>
                <Badge variant="default" className="text-lg px-4 py-2">
                  {gaitPhase}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <Activity className="h-5 w-5 text-primary mb-2" />
                  <p className="text-2xl font-bold">{metrics.steps}</p>
                  <p className="text-xs text-muted-foreground">Steps</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
                  <Target className="h-5 w-5 text-secondary mb-2" />
                  <p className="text-2xl font-bold">{metrics.distance.toFixed(1)}m</p>
                  <p className="text-xs text-muted-foreground">Distance</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                  <Clock className="h-5 w-5 text-accent mb-2" />
                  <p className="text-2xl font-bold">{metrics.speed.toFixed(1)} m/s</p>
                  <p className="text-xs text-muted-foreground">Speed</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
                  <TrendingUp className="h-5 w-5 text-success mb-2" />
                  <p className="text-2xl font-bold">{metrics.efficiency.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Gait Cycle Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Stance Phase (60%)</span>
                    <span className="text-primary">Active</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Swing Phase (40%)</span>
                    <span className="text-secondary">Monitored</span>
                  </div>
                  <Progress value={40} className="h-3" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Heel Strike</p>
                    <p className="text-sm font-semibold">0-10%</p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Toe-off</p>
                    <p className="text-sm font-semibold">60%</p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Mid-swing</p>
                    <p className="text-sm font-semibold">80%</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Assistance Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Propulsion Enhancement</h4>
                  <p className="text-sm text-muted-foreground">
                    Cable actuation during toe-off phase
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Stride Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Dynamic stride length adjustment
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Energy Recovery</h4>
                  <p className="text-sm text-muted-foreground">
                    Series elastic actuator spring return
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Balance Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time posture stabilization
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkingAssist;
