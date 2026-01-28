import React from "react";

const MedicalCrossSvg = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500">
      <rect x="80" y="20" width="40" height="160" rx="8" fill="currentColor" />
      <rect x="20" y="80" width="160" height="40" rx="8" fill="currentColor" />
      <circle
        cx="100"
        cy="100"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
};

export default MedicalCrossSvg;
