import { fetchExpertise } from "../api";

export const EXPERTISE_TAG = "expertise";

export type Expertise = {
  id: string;
  label: string;
  order_index: number;
};


export async function getExpertise(): Promise<Expertise[]> {
  try {
    const data = await fetchExpertise();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetching expertise:", error);
    return [];
  }
}
