import React, { useState } from "react";

const Badge = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

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
    <div className="field">
      <label className={getType(isChecked ? "onclicked" : "unclicked")}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheckbox}
          className="hidden"
        />
        <span className="select-none">{label}</span>
      </label>
    </div>
  );
};

export default Badge;
