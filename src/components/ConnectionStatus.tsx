import React from "react";

const ConnectionStatus = ({
  connectionStatus,
}: {
  connectionStatus: string;
}) => {
  return (
    <div className="flex items-center">
      <div
        className={`flex items-center px-3 py-1 rounded-full text-xs ${
          connectionStatus === "connected"
            ? "bg-green-100 text-green-800"
            : connectionStatus === "connecting"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full mr-2 ${
            connectionStatus === "connected"
              ? "bg-green-500"
              : connectionStatus === "connecting"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        />
        {connectionStatus === "connected"
          ? "Real-time Connected"
          : connectionStatus === "connecting"
          ? "Connecting..."
          : "Disconnected"}
      </div>
    </div>
  );
};

export default ConnectionStatus;
