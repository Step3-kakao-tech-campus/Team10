import React from "react";

const getSizeClasses = (size) => {
  switch (size) {
    case "small": {
      return "w-577 h-625";
    }
    case "medium": {
      return "w-963 h-945";
    }
    case "register-intro": {
      return "w-96 h-[204px] px-4 ";
    }
    default: {
      return "w-393 h-187";
    }
  }
};

const BASE_INPUT_CLASSES =
  "border border-gray-300 resize-none bg-gray-100 rounded-xl py-4";

const TextArea = ({ placeholder, size, value, onChange, ...props }) => {
  const sizeClass = getSizeClasses(size);
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${BASE_INPUT_CLASSES} ${sizeClass}`}
      {...props}
    />
  );
};

export default TextArea;
