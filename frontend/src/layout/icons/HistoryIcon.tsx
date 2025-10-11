import React from "react";

interface HistoryIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  stroke?: string;
}

const HistoryIcon: React.FC<HistoryIconProps> = ({
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
    strokeWidth={strokeWidth}
    stroke={stroke}
    className={className}
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

export default HistoryIcon;
