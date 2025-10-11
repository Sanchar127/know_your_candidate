import React from "react";

interface TargetIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  stroke?: string;
}

const TargetIcon: React.FC<TargetIconProps> = ({
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
      d="M12 2.25v1.5m0 16.5v1.5m9.75-9.75h-1.5m-16.5 0H2.25m16.95-5.7a9 9 0 1 1-12.9 12.9 9 9 0 0 1 12.9-12.9zM12 8.25a3.75 3.75 0 1 1-3.75 3.75A3.75 3.75 0 0 1 12 8.25z"
    />
  </svg>
);

export default TargetIcon;
