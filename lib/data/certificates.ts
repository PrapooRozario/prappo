import { fetchCertificates } from "../api";

export const CERTIFICATES_TAG = "certificates";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  image: string | null;
  credential_url: string | null;
  order_index: number;
};

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const data = await fetchCertificates();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}
