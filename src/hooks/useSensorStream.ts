import { useEffect, useState } from "react"
import { socket } from "../lib/socket"

export interface SensorData {
  deviceId: string
  imuX: number
  imuY: number
  imuZ: number
  torque: number
  pressure: number
  timestamp: string
}

export function useSensorStream() {
  const [data, setData] = useState<SensorData | null>(null)

  useEffect(() => {
    socket.on("sensor-update", (payload: SensorData) => {
      setData(payload)
    })

    return () => {
      socket.off("sensor-update")
    }
  }, [])

  return data
}