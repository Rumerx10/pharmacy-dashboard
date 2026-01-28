import React from "react";

const HeartRateSvg = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-red-500">
      <path
        d="M20 100 L60 100 L70 60 L80 140 L90 80 L100 120 L110 100 L180 100"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="100" r="4" fill="currentColor" />
      <circle cx="180" cy="100" r="4" fill="currentColor" />
    </svg>
  );
};

export default HeartRateSvg;
