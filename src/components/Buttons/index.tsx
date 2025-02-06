"use client";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void; 
  variant?: "primary" | "secondary" | "outline"; 
 
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary", 
  
}) => {

  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-300";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
  };


  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} `}
    >
      {children}
    </button>
  );
};

export default Button;
