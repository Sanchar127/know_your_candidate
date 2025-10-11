import React from "react";

interface InfoIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  stroke?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({
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
      d="M11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
);

export default InfoIcon;
