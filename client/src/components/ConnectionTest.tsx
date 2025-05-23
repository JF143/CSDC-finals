"use client"

import { useEffect, useState } from "react"
import { axiosInstance } from "../utils/axiosInstance"

export const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>("Testing...")

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axiosInstance.get("/")
        if (response.data) {
          setConnectionStatus("✅ Connected to backend")
        }
      } catch (error) {
        setConnectionStatus("❌ Failed to connect to backend")
        console.error("Connection test failed:", error)
      }
    }

    testConnection()
  }, [])

  return (
    <div style={{ padding: "10px", backgroundColor: "#f0f0f0", margin: "10px" }}>
      <strong>Connection Status:</strong> {connectionStatus}
    </div>
  )
}
