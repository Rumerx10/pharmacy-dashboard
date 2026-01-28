import React from "react";

const MicroscopeSvg = () => {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-purple-600">
      <rect x="20" y="80" width="60" height="8" rx="4" fill="currentColor" />
      <rect x="45" y="20" width="10" height="60" fill="currentColor" />
      <circle cx="50" cy="25" r="8" fill="currentColor" />
      <circle cx="50" cy="45" r="6" fill="currentColor" />
      <path
        d="M35 35 L50 45 L65 35"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
};

export default MicroscopeSvg;
