import { memo } from "react";

interface CornerProps {
  className?: string;
}

/**
 * 3px square dot used to mark wireframe intersections.
 * Uses bg-current so it inherits the parent's text color.
 */
function CornerImpl({ className = "" }: CornerProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute w-[3px] h-[3px] bg-black z-20 ${className}`}
    />
  );
}

export const Corner = memo(CornerImpl);
