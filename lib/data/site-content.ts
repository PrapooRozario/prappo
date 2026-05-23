import { fetchSiteContent } from "../api";

export const SITE_CONTENT_TAG = "site-content";

export type SiteContent = Record<string, string>;


export async function getSiteContent(): Promise<SiteContent> {
  try {
    const data = await fetchSiteContent();
    const items = data?.data || data || [];
    
    if (Array.isArray(items)) {
      return items.reduce((acc, item) => {
        if (item && item.key) {
          acc[item.key] = item.value;
        }
        return acc;
      }, {} as SiteContent);
    }
    
    return items as SiteContent;
  } catch (error) {
    console.error("Error fetching site content:", error);
    return {};
  }
}
