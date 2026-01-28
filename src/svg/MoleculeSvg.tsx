import React from "react";

const MoleculeSvg = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-600">
      <circle cx="100" cy="50" r="12" fill="currentColor" />
      <circle cx="60" cy="100" r="10" fill="currentColor" />
      <circle cx="140" cy="100" r="10" fill="currentColor" />
      <circle cx="80" cy="150" r="8" fill="currentColor" />
      <circle cx="120" cy="150" r="8" fill="currentColor" />
      <circle cx="100" cy="180" r="6" fill="currentColor" />

      <line
        x1="100"
        y1="50"
        x2="60"
        y2="100"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="50"
        x2="140"
        y2="100"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="60"
        y1="100"
        x2="80"
        y2="150"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="140"
        y1="100"
        x2="120"
        y2="150"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="80"
        y1="150"
        x2="100"
        y2="180"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="120"
        y1="150"
        x2="100"
        y2="180"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export default MoleculeSvg;
