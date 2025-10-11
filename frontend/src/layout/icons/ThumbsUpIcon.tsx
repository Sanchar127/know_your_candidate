import React from "react";

interface ThumbsUpIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  stroke?: string;
}

const ThumbsUpIcon: React.FC<ThumbsUpIconProps> = ({
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
      d="M14 9V5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h4l5 5V12a3 3 0 0 0-3-3z"
    />
  </svg>
);

export default ThumbsUpIcon;
