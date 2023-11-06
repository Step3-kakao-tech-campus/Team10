import React, { useState } from "react";
import Badge from "../atoms/Badge";

const KeyPointSelector = ({ value, pointLabels, handleChange }) => {
  const [selected, setSelected] = useState(value || []);

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 outline-none w-96 rounded-xl">
      <div className="flex flex-wrap justify-center gap-4">
        {pointLabels.map((label, index) => (
          <Badge
            key={index}
            value={selected.includes(index)}
            onChange={(e) => {
              const valueCopy = [...selected];
              if (e.target.checked) {
                valueCopy.push(index);
              } else {
                valueCopy.splice(valueCopy.indexOf(index), 1);
              }
              valueCopy.sort((a, b) => a - b);
              setSelected(valueCopy);
              handleChange("keypoint", valueCopy);
            }}>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default KeyPointSelector;
