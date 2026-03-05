import { useEffect, useRef, useState } from "react";
import { ModeSelector } from "@/components/ModeSelector";
import { AssistLevelControl } from "@/components/AssistLevelControl";
import { DeviceStatus } from "@/components/DeviceStatus";
import { CalibrationPanel } from "@/components/CalibrationPanel";
import { LiveSensorStream } from "@/components/LiveSensorStream";
import { AssistAsNeeded } from "@/components/AssistAsNeeded";
import { GaitAnalytics } from "@/components/GaitAnalytics";
import { useToast } from "@/hooks/use-toast";
import exosuitHero from "@/assets/exosuit-hero.jpg";

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

const Index = () => {
  const { toast } = useToast();
  const [selectedMode, setSelectedMode] = useState("walking");
  const [assistLevel, setAssistLevel] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const phaseRef = useRef(0);
  const fatigueRef = useRef(34);
  
  // Simulated sensor data with bounded and rounded updates
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

  // Simulate smooth real-time telemetry updates.
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      phaseRef.current += 0.22;
      const t = phaseRef.current;
      const jitter = (Math.random() - 0.5) * 0.8;

      let nextStepCount = 0;
      let nextSymmetry = 0;
      let nextTorque = 0;

      setSensorData((prev) => {
        const thighAngle = clamp(round(45 + Math.sin(t) * 18 + jitter), 0, 90);
        const shankAngle = clamp(round(30 + Math.sin(t + 0.8) * 15 + jitter), 0, 90);
        const cableTorque = clamp(round(42 + Math.sin(t * 1.2 + 0.4) * 12 + jitter * 2), 0, 100);
        const footPressure = clamp(round(125 + Math.sin(t * 1.1 - 0.6) * 28 + jitter * 4), 0, 200);
        const gaitSymmetry = clamp(round(87 + Math.sin(t * 0.35) * 2.5 + jitter * 0.5), 70, 100);
        const cadenceSignal = Math.sin(t * 1.6);
        const stepIncrement = cadenceSignal > 0.72 ? 1 : 0;
        const stepCount = prev.stepCount + stepIncrement;

        nextStepCount = stepCount;
        nextSymmetry = gaitSymmetry;
        nextTorque = cableTorque;

        return {
          ...prev,
          thighAngle,
          shankAngle,
          cableTorque,
          footPressure,
          gaitSymmetry,
          stepCount,
        };
      });

      setGaitMetrics((prev) => {
        const strideTime = clamp(round(1.12 + Math.sin(t * 0.5) * 0.06 + jitter * 0.02), 0.8, 1.6);
        fatigueRef.current = clamp(round(fatigueRef.current + 0.03 + Math.max(0, nextTorque - 60) * 0.002), 0, 100);

        return {
          ...prev,
          stepCount: nextStepCount,
          strideTime,
          fatigueIndex: round(fatigueRef.current),
          symmetryScore: round(nextSymmetry),
        };
      });

      setAanData((prev) => ({
        ...prev,
        userEffort: clamp(round(50 + nextTorque * 0.35 + Math.sin(t * 0.9) * 8), 0, 100),
        dynamicStiffness: clamp(round(280 + assistLevel * 30 + Math.sin(t * 0.8) * 15), 200, 500),
        dynamicDamping: clamp(round(20 + assistLevel * 2 + Math.cos(t * 0.6) * 2), 10, 50),
      }));

      setDeviceHealth((prev) => {
        const temperature = clamp(round(37.5 + Math.sin(t * 0.45) * 1.4 + nextTorque * 0.01), 30, 55);
        const motorCurrent = clamp(round(2.1 + nextTorque * 0.014 + Math.sin(t * 1.3) * 0.2), 0.3, 8);
        const batteryLevel = clamp(round(prev.batteryLevel - 0.01), 0, 100);

        return {
          ...prev,
          batteryLevel,
          temperature,
          motorCurrent,
        };
      });
    }, 500);

    return () => clearInterval(interval);
  }, [assistLevel, isActive]);

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
      assistLevel: round(level * 20),
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_46%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.18),transparent_52%)]" />

      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 opacity-95" />
        <img 
          src={exosuitHero} 
          alt="Synthera Exoflex" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70"
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Synthera Exoflex
          </h1>
          <p className="text-xl text-white/90 max-w-2xl drop-shadow-md">
            Advanced Soft Exoskeleton Control System
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-500/60 bg-slate-900/55 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur">
              <span className={isActive ? "relative flex h-2.5 w-2.5" : "h-2.5 w-2.5 rounded-full bg-slate-500"}>
                {isActive ? (
                  <>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </>
                ) : null}
              </span>
              {isActive ? "LIVE" : "STANDBY"}
            </span>
            <span className="rounded-full border border-slate-500/60 bg-slate-900/55 px-3 py-1 text-xs text-slate-100 backdrop-blur">
              System: {isActive ? "Active" : "Standby"}
            </span>
            <span className="rounded-full border border-slate-500/60 bg-slate-900/55 px-3 py-1 text-xs text-slate-100 backdrop-blur">
              Battery: {round(deviceHealth.batteryLevel)}%
            </span>
            <span className="rounded-full border border-slate-500/60 bg-slate-900/55 px-3 py-1 text-xs text-slate-100 backdrop-blur">
              Temp: {round(deviceHealth.temperature)} C
            </span>
            <span className="rounded-full border border-slate-500/60 bg-slate-900/55 px-3 py-1 text-xs text-slate-100 backdrop-blur">
              Motor: {round(deviceHealth.motorCurrent)} A
            </span>
          </div>
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
          <div className="lg:col-span-3 space-y-6 [&>*]:rounded-2xl [&>*]:border [&>*]:border-neutral-800 [&>*]:bg-slate-900/70 [&>*]:backdrop-blur-sm [&>*]:shadow-xl [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:-translate-y-0.5 [&>*]:hover:shadow-cyan-500/20">
            <div id="modes">
              <ModeSelector 
                selectedMode={selectedMode} 
                onModeChange={handleModeChange} 
              />
            </div>
            <div id="assist-control">
              <AssistLevelControl 
                level={assistLevel} 
                onLevelChange={handleLevelChange} 
              />
            </div>
            <div id="calibration">
              <CalibrationPanel onCalibrate={handleCalibrate} />
            </div>
            <div id="device-status">
              <DeviceStatus 
                isActive={isActive}
                onActiveChange={handleActiveChange}
                batteryLevel={round(deviceHealth.batteryLevel)}
                temperature={round(deviceHealth.temperature)}
                motorCurrent={round(deviceHealth.motorCurrent)}
              />
            </div>
          </div>

          {/* Center Panel - Live Data */}
          <div className="lg:col-span-6 space-y-6 [&>*]:rounded-2xl [&>*]:border [&>*]:border-neutral-800 [&>*]:bg-slate-900/70 [&>*]:backdrop-blur-sm [&>*]:shadow-xl [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:-translate-y-0.5 [&>*]:hover:shadow-cyan-500/20">
            <div id="sensors">
              <LiveSensorStream data={sensorData} />
            </div>
            <div>
              <AssistAsNeeded 
                data={aanData}
                onCalibrate={handleAanCalibrate}
                onApplyProfile={handleApplyProfile}
              />
            </div>
          </div>

          {/* Right Panel - Analytics */}
          <div className="lg:col-span-3 space-y-6 [&>*]:rounded-2xl [&>*]:border [&>*]:border-neutral-800 [&>*]:bg-slate-900/70 [&>*]:backdrop-blur-sm [&>*]:shadow-xl [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:-translate-y-0.5 [&>*]:hover:shadow-cyan-500/20">
            <div id="analytics">
              <GaitAnalytics metrics={gaitMetrics} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
