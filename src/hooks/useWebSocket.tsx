"use client";
import { useEffect, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import { DashboardDataType } from "@/types/types";

const useWebSocket = (
  url: string,
  topic: string,
  setRealTimeData: (data: DashboardDataType) => void
) => {
  const [client, setClient] = useState<Client | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");

  useEffect(() => {
    setConnectionStatus("connecting");

    const stompClient = new Client({
      brokerURL: url,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("✅ WebSocket connected successfully.");
        setConnectionStatus("connected");

        stompClient.subscribe(topic, (message: IMessage) => {
          if (message.body) {
            try {
              const data: DashboardDataType = JSON.parse(message.body);
              console.log("📡 WebSocket message received:", data);
              setRealTimeData(data);
            } catch (error) {
              console.error("❌ Failed to parse websocket message:", error);
            }
          }
        });
      },
      onDisconnect: () => {
        console.log("⚠️ WebSocket disconnected.");
        setConnectionStatus("disconnected");
      },
      onStompError: (frame) => {
        console.error(
          "❌ WebSocket connection error:",
          frame.headers?.message,
          frame.body
        );
        setConnectionStatus("disconnected");
      },
      onWebSocketError: (error) => {
        console.error("❌ WebSocket error:", error);
        setConnectionStatus("disconnected");
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [url, topic, setRealTimeData]);

  return { client, connectionStatus };
};

export default useWebSocket;
