// layout/icons/CameraIcon.tsx
import React from "react";

const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z"
    />
    <circle cx={12} cy={13} r={4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CameraIcon;
