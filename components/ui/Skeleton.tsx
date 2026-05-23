import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  margin?: string | number;
}

export function Skeleton({ 
  className, 
  width, 
  height, 
  padding, 
  margin, 
  style, 
  ...props 
}: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-black/[0.03] ${className || ""}`}
      style={{ width, height, padding, margin, ...style }}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-black/[0.04] to-transparent" />
    </div>
  );
}
