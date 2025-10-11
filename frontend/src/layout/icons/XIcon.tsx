import React from "react";

interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  stroke?: string;
}

const XIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  stroke = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775a4.932 4.932 0 0 0 2.163-2.723 9.86 9.86 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.671 3.149 4.916 4.916 0 0 0 3.195 9.723a4.902 4.902 0 0 1-2.228-.616v.062a4.916 4.916 0 0 0 3.946 4.827 4.903 4.903 0 0 1-2.224.084 4.916 4.916 0 0 0 4.59 3.417A9.867 9.867 0 0 1 .96 19.539 13.905 13.905 0 0 0 7.548 21c9.142 0 14.307-7.721 13.995-14.646a10.025 10.025 0 0 0 2.411-2.36z"/>
  </svg>
);

export default XIcon;
