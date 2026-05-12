import type { NavLink } from "@/types";

export const navLinks: readonly NavLink[] = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
] as const;
