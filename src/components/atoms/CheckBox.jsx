import React from "react";

const Checkbox = ({ checked, onChange, disabled, children }) => {
  return (
    <label className="text-gray-700 select-none">
      <input
        type="checkbox"
        className="mr-2"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default Checkbox;
