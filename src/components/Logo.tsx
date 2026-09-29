import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark";
  color?: "forest" | "cream" | "white";
}

export default function Logo({
  className = "",
  variant = "full",
  color = "forest",
}: LogoProps) {
  const colorMap = {
    forest: { text: "#14301F", leaf: "#4C6B3A", accent: "#B98B3E" },
    cream: { text: "#F6F1E7", leaf: "#F6F1E7", accent: "#B98B3E" },
    white: { text: "#FFFFFF", leaf: "#FFFFFF", accent: "#B98B3E" },
  };

  const colors = colorMap[color];

  if (variant === "mark") {
    return (
      <svg
        className={className}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Green Care leaf mark"
        role="img"
      >
        <path
          d="M24 4C24 4 8 12 8 28C8 36.837 15.163 44 24 44C32.837 44 40 36.837 40 28C40 12 24 4 24 4Z"
          fill={colors.leaf}
          opacity="0.15"
        />
        <path
          d="M24 6C18 14 12 22 12 30C12 36.627 17.373 42 24 42C30.627 42 36 36.627 36 30C36 22 30 14 24 6Z"
          stroke={colors.leaf}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M24 18V36"
          stroke={colors.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24 24C20 22 17 24 16 27"
          stroke={colors.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M24 28C28 26 31 28 32 31"
          stroke={colors.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 280 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Green Care Landscaping"
      role="img"
    >
      {/* Leaf Mark */}
      <path
        d="M20 4C20 4 6 11 6 24C6 31.732 12.268 38 20 38C27.732 38 34 31.732 34 24C34 11 20 4 20 4Z"
        fill={colors.leaf}
        opacity="0.15"
      />
      <path
        d="M20 6C15 13 10 20 10 27C10 32.523 14.477 37 20 37C25.523 37 30 32.523 30 27C30 20 25 13 20 6Z"
        stroke={colors.leaf}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 15V33"
        stroke={colors.accent}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M20 21C17 19.5 14.5 21 13.5 23.5"
        stroke={colors.accent}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 25C23 23.5 25.5 25 26.5 27.5"
        stroke={colors.accent}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* "Green Care" Text */}
      <text
        x="44"
        y="26"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="22"
        fontWeight="600"
        fill={colors.text}
        dominantBaseline="middle"
      >
        Green Care
      </text>

      {/* "LANDSCAPING" subtext */}
      <text
        x="44"
        y="40"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="7.5"
        fontWeight="500"
        letterSpacing="3.5"
        fill={colors.leaf}
        dominantBaseline="middle"
      >
        LANDSCAPING
      </text>
    </svg>
  );
}
