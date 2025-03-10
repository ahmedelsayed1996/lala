import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const Button: React.FC<ButtonProps> = ({ variant = "default", children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${
        variant === "outline" ? "border border-gray-500 text-gray-700" : "bg-blue-600 text-white"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
