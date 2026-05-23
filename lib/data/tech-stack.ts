import { fetchTechCategories, fetchTechItems } from "../api";

export const TECH_STACK_TAG = "tech-stack";

export interface TechCategory {
  id: string;
  display_id: string;
  title: string;
  items: string[];
}

type TechCategoryApiRecord = {
  id: string | number;
  display_id?: string;
  title: string;
  items?: string[];
};

type TechItemApiRecord = {
  category_id: string | number;
  name?: string;
  title?: string;
};

export async function getTechStack(): Promise<TechCategory[]> {
  try {
    const [categoriesRes, itemsRes] = await Promise.all([
      fetchTechCategories(),
      fetchTechItems()
    ]);
    
    const categories = (categoriesRes?.data || categoriesRes || []) as TechCategoryApiRecord[];
    const items = (itemsRes?.data || itemsRes || []) as TechItemApiRecord[];

    return categories.map((cat) => ({
      id: String(cat.id),
      title: cat.title,
      display_id: cat.display_id || String(cat.id).padStart(2, "0"),
      items: cat.items || items.filter((item) => item.category_id === cat.id).map((item) => item.name || item.title || ""),
    }));
  } catch (error) {
    console.error("Error fetching tech stack:", error);
    return [];
  }
}
