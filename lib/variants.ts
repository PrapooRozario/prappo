import { cva } from "class-variance-authority";

/**
 * Pill-shaped link/button variants used throughout the nav.
 * Encapsulates the (active × overFooter) state matrix that previously
 * lived as nested ternaries inside the Nav component.
 */
export const linkPillVariants = cva(
  "border-2 rounded-full px-3 py-1 leading-none overflow-hidden relative transition-colors duration-300",
  {
    variants: {
      size: {
        md: "text-[22px]",
        lg: "text-[28px]",
      },
      intent: {
        active: "border-black bg-black text-white",
        inactive: "border-black bg-white text-black hover:bg-black hover:text-white",
      },
    },
    defaultVariants: {
      size: "lg",
      intent: "inactive",
    },
  }
);

/**
 * Theme-aware text/border classes used by sections that flip on
 * footer overlap. Keeps the two-state pair colocated.
 */
export const themeVariants = cva("transition-colors duration-300", {
  variants: {
    surface: {
      light: "text-black",
      dark: "text-white",
    },
  },
  defaultVariants: {
    surface: "light",
  },
});

export const themeBorderVariants = cva("transition-colors duration-300", {
  variants: {
    surface: {
      light: "border-black/20",
      dark: "border-white/20",
    },
  },
  defaultVariants: {
    surface: "light",
  },
});
