import type { NavLink } from "@/types";

export const navLinks: readonly NavLink[] = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "https://drive.google.com/file/d/1Acg_JD3IZy_BjIkzGsfVeZIbdMjTx-Hn/view?usp=sharing" },
] as const;
