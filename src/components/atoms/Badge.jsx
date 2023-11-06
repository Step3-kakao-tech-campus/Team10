import React, { useState } from "react";

const Badge = ({ value, onChange, children, props }) => {
  const [isChecked, setIsChecked] = useState(value);

  const getType = (type) => {
    const commonStyle =
      "align-middle px-3.5 py-1 border rounded-full text-center";

    switch (type) {
      case "unclicked":
        return `${commonStyle} bg-white text-black border-gray-300`;
      case "onclicked":
        return `${commonStyle} bg-primary text-white border-primary`;
      default:
        return "";
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={getType(isChecked ? "onclicked" : "unclicked")}>
      <input
        type="checkbox"
        checked={isChecked}
        hidden
        onChange={(e) => {
          toggleCheckbox();
          onChange(e);
        }}
        {...props}
      />
      {children}
    </label>
  );
};

export default Badge;
