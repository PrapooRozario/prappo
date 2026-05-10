import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    id: "hochschule-nordhausen",
    title: "Hochschule Nordhausen",
    year: "2024",
    category: "Design & Development",
    number: "01",
  },
  {
    id: "vola",
    title: "Vola Pur",
    year: "2024",
    category: "Branding & Packaging",
    number: "02",
  },
  {
    id: "studio-three",
    title: "Studio Three",
    year: "2023",
    category: "Identity",
    number: "03",
  },
  {
    id: "studio-four",
    title: "Studio Four",
    year: "2023",
    category: "Web Design",
    number: "04",
  },
] as const;
