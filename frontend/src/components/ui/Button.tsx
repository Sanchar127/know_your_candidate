"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
}: ButtonProps) {
  // Base styles with modern enhancements
  const baseClasses = `
    inline-flex items-center justify-center font-semibold
    rounded-xl transition-all duration-200 ease-out
    focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-offset-white
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-95 hover:scale-105
    backdrop-blur-sm border border-transparent
    relative overflow-hidden group
  `;

  // Variant styles with gradient and shadow enhancements
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-rose-400 to-pink-600 
      text-white shadow-lg hover:shadow-xl
      hover:from-rose-500 hover:to-pink-700
      active:from-rose-600 active:to-pink-800
      focus:ring-rose-300
      shadow-rose-200/50
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200
      text-gray-800 shadow-md hover:shadow-lg
      hover:from-gray-200 hover:to-gray-300
      active:from-gray-300 active:to-gray-400
      focus:ring-gray-400
      border-gray-300/50
    `,
    outline: `
      border-2 border-gray-300 bg-transparent
      text-gray-700 shadow-sm hover:shadow-md
      hover:border-gray-400 hover:bg-gray-50/80
      active:bg-gray-100 focus:ring-gray-300
      backdrop-blur-md
    `,
    ghost: `
      bg-transparent text-gray-600
      hover:bg-gray-100/80 active:bg-gray-200/60
      focus:ring-gray-200 shadow-none
      hover:text-gray-800
    `
  };

  // Size styles with better proportions
  const sizeClasses = {
    sm: "px-1 py-1 text-sm min-h-[36px] gap-1",
    md: "px-3 py-2 text-base min-h-[44px] gap-2",
    lg: "px-5 py-3 text-lg min-h-[52px] gap-2"
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // Ripple effect component
  const RippleEffect = () => (
    <span className="absolute inset-0 overflow-hidden rounded-xl">
      <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
        transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </span>
  );

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className || ''}
  `.replace(/\s+/g, ' ').trim();

  const content = (
    <>
      <RippleEffect />
      {loading && <LoadingSpinner />}
      <span className={`inline-flex items-center justify-center gap-2 
        ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
        {children}
      </span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link 
        href={href} 
        className={combinedClasses}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={combinedClasses}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}