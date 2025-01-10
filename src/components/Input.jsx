import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...rest
}) => {
  const isCheckbox = type === "checkbox";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${
        isCheckbox ? "" : "w-full"
      } px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
      {...rest}
    />
  );
};

export default Input;
