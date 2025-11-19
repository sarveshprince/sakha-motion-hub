import { useState, useEffect } from "react";
import { ModeSelector } from "@/components/ModeSelector";
import { AssistLevelControl } from "@/components/AssistLevelControl";
import { DeviceStatus } from "@/components/DeviceStatus";
import { CalibrationPanel } from "@/components/CalibrationPanel";
import { LiveSensorStream } from "@/components/LiveSensorStream";
import { AssistAsNeeded } from "@/components/AssistAsNeeded";
import { GaitAnalytics } from "@/components/GaitAnalytics";
import { useToast } from "@/hooks/use-toast";
import exosuitHero from "@/assets/exosuit-hero.jpg";

const Index = () => {
  const { toast } = useToast();
  const [selectedMode, setSelectedMode] = useState("walking");
  const [assistLevel, setAssistLevel] = useState(2);
  const [isActive, setIsActive] = useState(false);
  
  // Simulated sensor data with dynamic updates
  const [sensorData, setSensorData] = useState({
    thighAngle: 45,
    shankAngle: 30,
    cableTorque: 42,
    footPressure: 125,
    stepCount: 1247,
    gaitSymmetry: 87,
  });

  const [aanData, setAanData] = useState({
    userEffort: 65,
    assistLevel: 35,
    dynamicStiffness: 320,
    dynamicDamping: 28,
  });

  const [gaitMetrics, setGaitMetrics] = useState({
    stepCount: 1247,
    strideTime: 1.12,
    fatigueIndex: 34,
    symmetryScore: 87,
  });

  const [deviceHealth, setDeviceHealth] = useState({
    batteryLevel: 78,
    temperature: 38,
    motorCurrent: 2.4,
  });

  // Simulate real-time data updates
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        thighAngle: Math.max(0, Math.min(90, prev.thighAngle + (Math.random() - 0.5) * 5)),
        shankAngle: Math.max(0, Math.min(90, prev.shankAngle + (Math.random() - 0.5) * 5)),
        cableTorque: Math.max(0, Math.min(100, prev.cableTorque + (Math.random() - 0.5) * 3)),
        footPressure: Math.max(0, Math.min(200, prev.footPressure + (Math.random() - 0.5) * 10)),
        stepCount: prev.stepCount + (Math.random() > 0.7 ? 1 : 0),
        gaitSymmetry: Math.max(70, Math.min(100, prev.gaitSymmetry + (Math.random() - 0.5) * 2)),
      }));

      setGaitMetrics(prev => ({
        ...prev,
        stepCount: sensorData.stepCount,
        symmetryScore: sensorData.gaitSymmetry,
      }));
    }, 500);

    return () => clearInterval(interval);
  }, [isActive, sensorData.stepCount, sensorData.gaitSymmetry]);

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    toast({
      title: "Mode Changed",
      description: `Switched to ${mode} mode`,
    });
  };

  const handleLevelChange = (level: number) => {
    setAssistLevel(level);
    setAanData(prev => ({
      ...prev,
      assistLevel: level * 20,
    }));
  };

  const handleActiveChange = (active: boolean) => {
    setIsActive(active);
    toast({
      title: active ? "System Activated" : "System Standby",
      description: active ? "Real-time assist is now active" : "Exosuit is in standby mode",
      variant: active ? "default" : "destructive",
    });
  };

  const handleCalibrate = (type: string) => {
    toast({
      title: "Calibration Started",
      description: `Running ${type} calibration routine...`,
    });
  };

  const handleAanCalibrate = () => {
    toast({
      title: "AAN Calibration",
      description: "Running adaptive control calibration routine...",
    });
  };

  const handleApplyProfile = () => {
    toast({
      title: "Profile Applied",
      description: "Assist profile has been applied successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
        <img 
          src={exosuitHero} 
          alt="Synthera Exoflex" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Synthera Exoflex
          </h1>
          <p className="text-xl text-white/90 max-w-2xl drop-shadow-md">
            Advanced Soft Exoskeleton Control System
          </p>
          <div className="mt-4 flex gap-4 text-sm text-white/80">
            <span>• Cable-Driven Actuation</span>
            <span>• Real-time Adaptation</span>
            <span>• Biomechanics Monitoring</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-3 space-y-6">
            <ModeSelector 
              selectedMode={selectedMode} 
              onModeChange={handleModeChange} 
            />
            <AssistLevelControl 
              level={assistLevel} 
              onLevelChange={handleLevelChange} 
            />
            <CalibrationPanel onCalibrate={handleCalibrate} />
            <DeviceStatus 
              isActive={isActive}
              onActiveChange={handleActiveChange}
              batteryLevel={deviceHealth.batteryLevel}
              temperature={deviceHealth.temperature}
              motorCurrent={deviceHealth.motorCurrent}
            />
          </div>

          {/* Center Panel - Live Data */}
          <div className="lg:col-span-6 space-y-6">
            <LiveSensorStream data={sensorData} />
            <AssistAsNeeded 
              data={aanData}
              onCalibrate={handleAanCalibrate}
              onApplyProfile={handleApplyProfile}
            />
          </div>

          {/* Right Panel - Analytics */}
          <div className="lg:col-span-3 space-y-6">
            <GaitAnalytics metrics={gaitMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
