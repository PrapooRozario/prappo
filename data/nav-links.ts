import type { NavLink } from "@/types";

export const navLinks: readonly NavLink[] = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
] as const;
