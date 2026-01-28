import React from "react";

const PillSvg = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-teal-600">
      <ellipse
        cx="70"
        cy="70"
        rx="25"
        ry="15"
        fill="currentColor"
        transform="rotate(45 70 70)"
      />
      <ellipse
        cx="130"
        cy="70"
        rx="25"
        ry="15"
        fill="currentColor"
        transform="rotate(-45 130 70)"
      />
      <ellipse
        cx="70"
        cy="130"
        rx="25"
        ry="15"
        fill="currentColor"
        transform="rotate(-45 70 130)"
      />
      <ellipse
        cx="130"
        cy="130"
        rx="25"
        ry="15"
        fill="currentColor"
        transform="rotate(45 130 130)"
      />

      <circle cx="100" cy="40" r="8" fill="currentColor" />
      <circle cx="160" cy="100" r="8" fill="currentColor" />
      <circle cx="100" cy="160" r="8" fill="currentColor" />
      <circle cx="40" cy="100" r="8" fill="currentColor" />
    </svg>
  );
};

export default PillSvg;
