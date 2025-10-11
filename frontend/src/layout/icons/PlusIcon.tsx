import React from "react";

interface PlusIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  stroke?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  className = "w-6 h-6",
  width,
  height,
  strokeWidth = 1.5,
  stroke = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke={stroke}
    strokeWidth={strokeWidth}
    width={width}
    height={height}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

export default PlusIcon;
