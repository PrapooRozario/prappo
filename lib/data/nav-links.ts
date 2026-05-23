import { fetchNavLinks } from "../api";

export const NAV_LINKS_TAG = "nav-links";

export type NavLink = {
  id: string;
  label: string;
  href: string;
  order_index: number;
};

export async function getNavLinks(): Promise<NavLink[]> {
  try {
    const data = await fetchNavLinks();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetching nav links:", error);
    return [];
  }
}
