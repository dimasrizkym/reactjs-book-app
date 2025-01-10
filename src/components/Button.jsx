import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  fullWidth = false,
  icon,
  ...props
}) => {
  const baseStyles =
    "py-2 px-4 rounded font-medium transition-all duration-300 outline-none focus:outline-none";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    success: "bg-green-500 text-white hover:bg-green-600 ",
    danger: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  const styles = `
    ${baseStyles} 
    ${variants[variant]} 
    ${fullWidth ? "w-full text-center" : ""}
    ${className}
  `;

  return (
    <button type={type} onClick={onClick} className={styles} {...props}>
      <div className="w-full flex items-center justify-between space-x-2">
        <span className="w-full text-center">{children}</span>
        {icon && <span>{icon}</span>}
      </div>
    </button>
  );
};

export default Button;
