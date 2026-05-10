import type { TechCategory } from "@/types";

export const techCategories: readonly TechCategory[] = [
  {
    id: "001",
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
  },
  {
    id: "002",
    title: "Backend",
    items: ["Node.js", "REST APIs", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    id: "003",
    title: "Tooling",
    items: ["Figma", "Git & GitHub", "VS Code", "Vercel", "Docker"],
  },
  {
    id: "004",
    title: "Exploring",
    items: ["Three.js", "WebGL", "Web Animations API", "tRPC"],
  },
] as const;
