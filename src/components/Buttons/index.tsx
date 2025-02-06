"use client";
import React from "react";
import PrimaryIcon from "../Icons/PrimaryIcon";
import SecondaryIcon from "../Icons/SecondaryIcon";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode; 
  handleClick?: () => void; 
  variant?: "primary" | "secondary" | "outline" | "text" | "fullWidth"; 
  customIcon?: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  handleClick,
  variant = "primary", 
  customIcon,
}) => {
  const baseStyles =
    "inline-flex items-center gap-[6px] font-medium transition-all duration-300 rounded-[6px] text-[14px] leading-[20px] font-[500]";

  // Variants
  const variants = {
    primary: "bg-[#1D1D22] px-[10px] py-[6px] min-w-[152px] h-[32px] hover:bg-[#333333] text-[#FFF] justify-center", // min-w ensures it scales with text
    secondary: "bg-[#007AFF1A] px-[10px] py-[6px] min-w-[121px] h-[32px] text-[#007AFF] hover:bg-[#007AFF33] justify-center",
    outline: "border-2 border-[#1D1D22] text-[#1D1D22] px-[10px] py-[6px] bg-transparent hover:bg-[#1D1D22] hover:text-[#FFF] min-w-[152px] h-[32px] flex items-center justify-center rounded-[6px]",
    text: "bg-transparent text-[#007AFF] hover:text-[#005BB5] hover:underline p-0 m-0 h-auto justify-center", 
    fullWidth: "bg-[#1D1D22] px-[10px] py-[14px] w-full min-w-[152px] h-[48px] justify-center items-center rounded-[10px] gap-[10px] flex hover:bg-[#333333] text-[#FFF]",
  };
 
  // Variant-specific icons
  const variantIcon = {
    primary: customIcon,
    secondary: customIcon,
    outline: customIcon,
    text: customIcon, 
    fullWidth: customIcon,
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(baseStyles, variants[variant])}
      
    >
      {variantIcon[variant]}
      {children}
    </button>
  );
};

export default Button;
