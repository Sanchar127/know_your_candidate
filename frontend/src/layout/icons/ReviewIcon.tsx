import React from "react";

interface ReviewIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  stroke?: string;
}

const ReviewIcon: React.FC<ReviewIconProps> = ({
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
      d="M9 12h6m-6 4h6m2-12H7a2 2 0 0 0-2 2v16l7-3 7 3V6a2 2 0 0 0-2-2z"
    />
  </svg>
);

export default ReviewIcon;
