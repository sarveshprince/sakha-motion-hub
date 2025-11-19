import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ruler, CircuitBoard, Hammer } from "lucide-react";

interface CalibrationPanelProps {
  onCalibrate: (type: string) => void;
}

export const CalibrationPanel = ({ onCalibrate }: CalibrationPanelProps) => {
  return (
    <Card className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        Quick Calibration
      </h3>
      
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          size="sm"
          onClick={() => onCalibrate('size')}
        >
          <Ruler className="h-4 w-4 mr-2" />
          Size & Straps
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          size="sm"
          onClick={() => onCalibrate('sensor')}
        >
          <CircuitBoard className="h-4 w-4 mr-2" />
          Sensor Zero
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          size="sm"
          onClick={() => onCalibrate('strap')}
        >
          <Hammer className="h-4 w-4 mr-2" />
          Strap Tension Guide
        </Button>
      </div>
    </Card>
  );
};
