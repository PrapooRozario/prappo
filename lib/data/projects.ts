import { fetchProjects } from "../api";

export const PROJECTS_TAG = "projects";
export const projectTag = (slug: string) => `project:${slug}`;

export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  year: number;
  image: string | null;
  url: string | null;
  description: string | null;
  order_index: number;
};

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fetchProjects();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}
