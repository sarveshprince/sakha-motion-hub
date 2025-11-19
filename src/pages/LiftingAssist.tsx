import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Weight, AlertTriangle, CheckCircle2, ArrowUp, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import bodyComponents from "@/assets/exosuit-body-components.jpg";

const LiftingAssist = () => {
  const { toast } = useToast();
  const [loadWeight, setLoadWeight] = useState([25]); // kg
  const [supportLevel, setSupportLevel] = useState([70]);
  const [spinalAngle, setSpinalAngle] = useState(15);
  const [hipAngle, setHipAngle] = useState(85);
  const [kneeAngle, setKneeAngle] = useState(90);
  const [isLifting, setIsLifting] = useState(false);
  
  const [metrics, setMetrics] = useState({
    totalLifts: 0,
    totalLoad: 0,
    avgPosture: 92,
    safetyScore: 95,
  });

  const postureStatus = spinalAngle < 30 && hipAngle > 70 ? "Good" : "Caution";

  const handleStartLift = () => {
    setIsLifting(!isLifting);
    if (!isLifting) {
      setMetrics(prev => ({
        ...prev,
        totalLifts: prev.totalLifts + 1,
        totalLoad: prev.totalLoad + loadWeight[0],
      }));
      toast({
        title: "Lift Initiated",
        description: `${supportLevel[0]}% assistance active`,
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
              <Dumbbell className="h-8 w-8 text-primary" />
              Lifting Assist Mode
            </h1>
            <p className="text-muted-foreground mt-1">
              Load distribution and ergonomic support
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={handleStartLift}
            variant={isLifting ? "destructive" : "default"}
          >
            <ArrowUp className="h-5 w-5 mr-2" />
            {isLifting ? "Complete Lift" : "Start Lift"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Weight className="h-5 w-5 text-primary" />
                Load Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Expected Load</span>
                    <span className="text-sm font-semibold">{loadWeight[0]} kg</span>
                  </div>
                  <Slider 
                    value={loadWeight} 
                    onValueChange={setLoadWeight}
                    min={5}
                    max={100}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Support Level</span>
                    <span className="text-sm font-semibold text-primary">{supportLevel[0]}%</span>
                  </div>
                  <Slider 
                    value={supportLevel} 
                    onValueChange={setSupportLevel}
                    min={0}
                    max={100}
                  />
                </div>

                <div className="p-3 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">User Load</span>
                    <span className="text-lg font-bold text-accent">
                      {((loadWeight[0] * (100 - supportLevel[0])) / 100).toFixed(1)} kg
                    </span>
                  </div>
                  <Progress value={100 - supportLevel[0]} className="h-2 mt-2" />
                </div>

                <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Exosuit Load</span>
                    <span className="text-lg font-bold text-primary">
                      {((loadWeight[0] * supportLevel[0]) / 100).toFixed(1)} kg
                    </span>
                  </div>
                  <Progress value={supportLevel[0]} className="h-2 mt-2" />
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <img 
                src={bodyComponents} 
                alt="Exosuit components" 
                className="w-full rounded-lg"
              />
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Waist-mounted support structure
              </p>
            </Card>
          </div>

          {/* Center Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Posture Monitor</h3>
                <Badge variant={postureStatus === "Good" ? "default" : "destructive"}>
                  {postureStatus === "Good" ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <AlertTriangle className="h-4 w-4 mr-1" />}
                  {postureStatus}
                </Badge>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Spinal Angle</span>
                    <span className={`text-sm font-semibold ${spinalAngle < 30 ? "text-success" : "text-warning"}`}>
                      {spinalAngle}°
                    </span>
                  </div>
                  <Progress value={(spinalAngle / 90) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: &lt; 30°</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Hip Angle</span>
                    <span className={`text-sm font-semibold ${hipAngle > 70 ? "text-success" : "text-warning"}`}>
                      {hipAngle}°
                    </span>
                  </div>
                  <Progress value={(hipAngle / 180) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: &gt; 70°</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Knee Angle</span>
                    <span className="text-sm font-semibold text-secondary">{kneeAngle}°</span>
                  </div>
                  <Progress value={(kneeAngle / 180) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">Monitored</p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-4 gap-4">
              <Card className="glass-card p-5">
                <Dumbbell className="h-5 w-5 text-primary mb-2" />
                <p className="text-2xl font-bold">{metrics.totalLifts}</p>
                <p className="text-xs text-muted-foreground">Total Lifts</p>
              </Card>

              <Card className="glass-card p-5">
                <Weight className="h-5 w-5 text-secondary mb-2" />
                <p className="text-2xl font-bold">{metrics.totalLoad}</p>
                <p className="text-xs text-muted-foreground">Total Load (kg)</p>
              </Card>

              <Card className="glass-card p-5">
                <CheckCircle2 className="h-5 w-5 text-success mb-2" />
                <p className="text-2xl font-bold">{metrics.avgPosture}%</p>
                <p className="text-xs text-muted-foreground">Avg Posture</p>
              </Card>

              <Card className="glass-card p-5">
                <Shield className="h-5 w-5 text-accent mb-2" />
                <p className="text-2xl font-bold">{metrics.safetyScore}%</p>
                <p className="text-xs text-muted-foreground">Safety Score</p>
              </Card>
            </div>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Lifting Assistance Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Spinal Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduces lower back strain by 60%
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Hip Torque Assist</h4>
                  <p className="text-sm text-muted-foreground">
                    Cable-driven hip extension support
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Load Distribution</h4>
                  <p className="text-sm text-muted-foreground">
                    Transfers load from spine to frame
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">✓ Posture Feedback</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time ergonomic guidance
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 bg-warning/5 border-warning/20">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-2">Ergonomic Guidelines</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Keep load close to body</li>
                    <li>• Maintain neutral spine position (&lt; 30° forward bend)</li>
                    <li>• Use leg drive for lifting motion</li>
                    <li>• Allow exosuit to reach full support before load transfer</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiftingAssist;
