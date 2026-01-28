import React from "react";

const StethoscopeSvg = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-blue-700">
      <path
        d="M50 50 Q50 30 70 30 Q90 30 90 50 L90 100 Q90 130 110 130 Q130 130 130 100 L130 50 Q130 30 150 30 Q170 30 170 50"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="50"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle
        cx="170"
        cy="50"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle cx="110" cy="150" r="20" fill="currentColor" />
      <circle cx="110" cy="150" r="12" fill="white" />
    </svg>
  );
};

export default StethoscopeSvg;
