import React, { useEffect, useState } from "react";
import Badge from "../atoms/Badge";
import { useController } from "react-hook-form";

const KeyPointSelector = ({ pointLabels, control, name }) => {
  const { field } = useController({
    control,
    name,
  });

  const [value, setValue] = useState(field.value || []);

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 outline-none w-96 rounded-xl">
      <div className="flex flex-wrap justify-center gap-4">
        {pointLabels.map((label, index) => (
          <Badge
            key={index}
            onChange={(e) => {
              const valueCopy = [...value];

              if (e.target.checked) {
                valueCopy.push(index);
              } else {
                valueCopy.splice(valueCopy.indexOf(index), 1);
              }

              valueCopy.sort((a, b) => a - b);

              field.onChange(valueCopy);
              setValue(valueCopy);
            }}>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default KeyPointSelector;
