import React, { forwardRef } from "react";

const TextInput = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`block w-96 h-14 px-4 text-black rounded-xl border border-gray-300 bg-gray-100 outline-none ${className}`}
      ref={ref}
      {...props}></input>
  );
});

export default TextInput;
