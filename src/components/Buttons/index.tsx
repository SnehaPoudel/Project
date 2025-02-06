"use client";
import React from "react";
// Define the props for the Button component
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void; // Handle click event
  variant?: "primary" | "secondary" | "outline"; // Variants for button styles
  className?: string; // Custom className for additional styling
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary", // Default variant is "primary"
  
  className = "",
}) => {
  // Define the base button styles
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-300";

  // Define styles for each variant
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
  };

  // Apply styles conditionally
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      
    >
      {children}
    </button>
  );
};

export default Button;
