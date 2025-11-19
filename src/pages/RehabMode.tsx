import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Activity, TrendingUp, Target, PlayCircle, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import legDiagram from "@/assets/leg-diagram.png";

const RehabMode = () => {
  const { toast } = useToast();
  const [exercise, setExercise] = useState("rom");
  const [sessionActive, setSessionActive] = useState(false);
  const [resistanceLevel, setResistanceLevel] = useState([30]);
  const [targetROM, setTargetROM] = useState([80]);
  const [currentROM, setCurrentROM] = useState(0);
  const [repCount, setRepCount] = useState(0);
  
  const [metrics, setMetrics] = useState({
    sessionsCompleted: 0,
    totalReps: 0,
    romImprovement: 0,
    painLevel: 2,
  });

  const exercises = [
    { id: "rom", name: "Range of Motion", description: "Joint mobility exercises" },
    { id: "strength", name: "Strength Building", description: "Progressive resistance training" },
    { id: "gait", name: "Gait Training", description: "Walking pattern re-education" },
    { id: "balance", name: "Balance Training", description: "Proprioception and stability" },
  ];

  const handleStartSession = () => {
    setSessionActive(!sessionActive);
    if (!sessionActive) {
      toast({
        title: "Rehabilitation Session Started",
        description: `Beginning ${exercises.find(e => e.id === exercise)?.name}`,
      });
    } else {
      setMetrics(prev => ({
        ...prev,
        sessionsCompleted: prev.sessionsCompleted + 1,
        totalReps: prev.totalReps + repCount,
      }));
      toast({
        title: "Session Complete",
        description: `Great work! ${repCount} reps completed`,
      });
      setRepCount(0);
      setCurrentROM(0);
    }
  };

  const handleRep = () => {
    setRepCount(prev => prev + 1);
    setCurrentROM(prev => {
      const newROM = Math.min(prev + 10, targetROM[0]);
      if (newROM >= targetROM[0]) {
        toast({
          title: "Target Reached!",
          description: "Full range achieved",
        });
      }
      return newROM;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              Rehabilitation Mode
            </h1>
            <p className="text-muted-foreground mt-1">
              Therapeutic motion support and recovery tracking
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={handleStartSession}
            variant={sessionActive ? "destructive" : "default"}
          >
            {sessionActive ? <RotateCcw className="h-5 w-5 mr-2" /> : <PlayCircle className="h-5 w-5 mr-2" />}
            {sessionActive ? "End Session" : "Start Session"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Exercise Selection</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exercise Type</label>
                  <Select value={exercise} onValueChange={setExercise}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {exercises.map(ex => (
                        <SelectItem key={ex.id} value={ex.id}>
                          {ex.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {exercises.find(e => e.id === exercise)?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Resistance Level</span>
                    <span className="text-sm font-semibold">{resistanceLevel[0]}%</span>
                  </div>
                  <Slider 
                    value={resistanceLevel} 
                    onValueChange={setResistanceLevel}
                    min={0}
                    max={100}
                    disabled={!sessionActive}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target ROM</span>
                    <span className="text-sm font-semibold text-primary">{targetROM[0]}°</span>
                  </div>
                  <Slider 
                    value={targetROM} 
                    onValueChange={setTargetROM}
                    min={30}
                    max={120}
                    step={5}
                    disabled={!sessionActive}
                  />
                </div>

                {sessionActive && (
                  <Button 
                    className="w-full" 
                    onClick={handleRep}
                    variant="outline"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Complete Rep
                  </Button>
                )}
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-3">Current Progress</h3>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-primary">{currentROM}°</p>
                <p className="text-sm text-muted-foreground">Current ROM</p>
              </div>
              <Progress value={(currentROM / targetROM[0]) * 100} className="h-3 mb-2" />
              <p className="text-xs text-center text-muted-foreground">
                {((currentROM / targetROM[0]) * 100).toFixed(0)}% of target
              </p>
            </Card>

            <Card className="glass-card p-6">
              <img 
                src={legDiagram} 
                alt="Joint diagram" 
                className="w-full rounded-lg opacity-90"
              />
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Joint angle monitoring
              </p>
            </Card>
          </div>

          {/* Center & Right Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="glass-card p-5">
                <Heart className="h-5 w-5 text-primary mb-2" />
                <p className="text-2xl font-bold">{metrics.sessionsCompleted}</p>
                <p className="text-xs text-muted-foreground">Sessions</p>
              </Card>

              <Card className="glass-card p-5">
                <Activity className="h-5 w-5 text-secondary mb-2" />
                <p className="text-2xl font-bold">{repCount}</p>
                <p className="text-xs text-muted-foreground">Current Reps</p>
              </Card>

              <Card className="glass-card p-5">
                <TrendingUp className="h-5 w-5 text-success mb-2" />
                <p className="text-2xl font-bold">+{metrics.romImprovement}°</p>
                <p className="text-xs text-muted-foreground">ROM Gain</p>
              </Card>

              <Card className="glass-card p-5">
                <Target className="h-5 w-5 text-accent mb-2" />
                <p className="text-2xl font-bold">{metrics.totalReps}</p>
                <p className="text-xs text-muted-foreground">Total Reps</p>
              </Card>
            </div>

            <Card className="glass-card p-6">
              <h3 className="font-bold text-lg mb-4">Rehabilitation Protocol</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-2">Phase 1: Passive ROM</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Exosuit guides joint through motion with minimal user effort
                  </p>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
                  <h4 className="font-semibold mb-2">Phase 2: Active-Assisted</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Patient initiates movement, exosuit provides support
                  </p>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-muted-foreground">Phase 3: Active-Resistive</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Patient works against controlled resistance
                  </p>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Therapeutic Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Controlled Motion</h4>
                  <p className="text-sm text-muted-foreground">
                    Smooth, safe range of motion guidance
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Progressive Loading</h4>
                  <p className="text-sm text-muted-foreground">
                    Gradual strength building protocol
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Pain Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Integrated feedback and safety limits
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Progress Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed recovery metrics and analytics
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Recovery Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">ROM Improvement</span>
                    <span className="text-sm font-semibold text-success">
                      {metrics.romImprovement > 0 ? "+" : ""}{metrics.romImprovement}°
                    </span>
                  </div>
                  <Progress value={(metrics.romImprovement / 45) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Pain Level</span>
                    <Badge variant={metrics.painLevel < 3 ? "default" : "destructive"}>
                      {metrics.painLevel}/10
                    </Badge>
                  </div>
                  <Progress value={(metrics.painLevel / 10) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Session Consistency</span>
                    <span className="text-sm font-semibold text-primary">
                      {metrics.sessionsCompleted}/10
                    </span>
                  </div>
                  <Progress value={(metrics.sessionsCompleted / 10) * 100} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehabMode;
