import React from "react";

const Spinner = ({ size = 12 }: { size?: number }) => {
  return (
    <div
      className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-l-2 border-[#4C8876]`}
    ></div>
  );
};

export default Spinner;
