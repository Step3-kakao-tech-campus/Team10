import React from "react";

const styles = {
  long: "block w-96 h-14 p-4 bg-sky-500 text-white font-semibold rounded-xl",
  longwhite: "block w-96 h-14 p-4 bg-white text-black font-semibold rounded-xl",
  small: "block h-14 p-4 bg-sky-100 text-primary font-semibold rounded-xl",
  addPhoto:
    "flex items-center px-3.5 py-1 border border-gray-300 bg-gray-100 rounded-full text-xs",
  deletePhoto: " w-6 h-6 bg-gray-100 rounded-full text-xs",
  withTextInput: "w-28 h-14 px-4 rounded-xl bg-sky-100 text-sky-500",
  cta: "block px-7 py-4 bg-primary text-white font-semibold rounded-full",
};

const Button = ({ type = "button", style, className, ...props }) => {
  return (
    <button
      type={type}
      className={`${styles[style]} ${className}`}
      {...props}></button>
  );
};

export default Button;
