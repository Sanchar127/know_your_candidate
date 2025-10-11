import React from "react";

interface ThumbsDownIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  stroke?: string;
}

const ThumbsDownIcon: React.FC<ThumbsDownIconProps> = ({
  className = "w-6 h-6",
  strokeWidth = 1.5,
  stroke = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke={stroke}
    strokeWidth={strokeWidth}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 15v4a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-4l-5-5v9a3 3 0 0 0 3 3z"
    />
  </svg>
);

export default ThumbsDownIcon;
