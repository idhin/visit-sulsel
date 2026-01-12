"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconPosition = "right",
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-gold to-gold-light text-deep-ocean hover:shadow-lg hover:shadow-gold/30",
    secondary:
      "bg-deep-ocean text-white hover:bg-deep-ocean-light",
    outline:
      "border-2 border-gold text-gold hover:bg-gold hover:text-deep-ocean",
    ghost:
      "text-deep-ocean hover:bg-deep-ocean/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const buttonContent = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={combinedClassName}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {buttonContent}
    </motion.button>
  );
}
