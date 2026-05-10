import { memo } from "react";

interface ArrowButtonProps {
  ariaLabel: string;
  className?: string;
}

/**
 * Round arrow icon button with a diagonal slide-in/out hover effect.
 * Driven by a parent `group` hover state — this is presentational only.
 */
function ArrowButtonImpl({ ariaLabel, className = "" }: ArrowButtonProps) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={`relative w-[48px] h-[48px] md:w-[56px] md:h-[56px] flex items-center justify-center overflow-hidden rounded-full border border-black/20 group-hover:border-white/30 transition-colors duration-500 bg-white group-hover:bg-black shrink-0 ${className}`}
    >
      <svg
        aria-hidden="true"
        className="absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </span>
  );
}

export const ArrowButton = memo(ArrowButtonImpl);
