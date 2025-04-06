import React from "react";

/**
 * Renders the circular progress SVG with a background circle,
 * a progress circle, and a place to show an image (e.g., a logo).
 */
const CircularProgress = ({
  progress = 0,
  radius = 100,
  color = "#5DDFD6",
  bgColor = "#1f2937",
  strokeWidth = 10,
  logo = "/public/vite.svg",
}) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className="w-64 h-64 drop-shadow-lg"
      viewBox="0 0 250 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="125"
        cy="125"
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth="12"
        opacity="0.3"
      />

      {/* Progress Circle */}
      <circle
        cx="125"
        cy="125"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 125 125)"
        className="transition-all duration-300 ease-out"
      />

      {/* Logo or Image in the center */}
      <image
        href={logo}
        x="50"
        y="50"
        height="150"
        width="150"
        className="animate-pulse"
      />
    </svg>
  );
};

export default CircularProgress;
