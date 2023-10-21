import React from "react";

const commonStyle =
  "flex flex-col justify-center items-center gap-4 border border-gray-300 rounded-xl";

const Box = ({ className, children }) => {
  return (
    <div className={`bg-white rounded-xl shadow-2xl ${className}`}>
      {children}
    </div>
  );
};

export default Box;
