import React from "react";
import Badge from "../atoms/Badge";

const KeyPointSelector = ({ pointLabels, selectedPoints }) => {
  return (
    <div className="p-4 bg-gray-100 border border-gray-300 outline-none w-96 rounded-xl">
      <div className="flex flex-wrap justify-center gap-4">
        {pointLabels.map((label, index) => (
          <Badge
            key={index}
            label={label}
            onClick={() => handlePointClick(label)}
            isChecked={selectedPoints.includes(label)}
          />
        ))}
      </div>
    </div>
  );
};

export default KeyPointSelector;
