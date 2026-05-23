import { fetchSocialLinks } from "../api";

export const SOCIAL_LINKS_TAG = "social-links";

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  order_index: number;
};

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const data = await fetchSocialLinks();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetching social links:", error);
    return [];
  }
}
