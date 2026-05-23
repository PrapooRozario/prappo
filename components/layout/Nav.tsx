import { getNavLinks } from "@/lib/data/nav-links";
import { getSiteContent } from "@/lib/data/site-content";

import NavClient from "./NavClient";

export default async function Nav() {
  const [links, siteContent] = await Promise.all([
    getNavLinks(),
    getSiteContent(),
  ]);

  const navLinks = links.map(({ label, href }) => ({ label, href }));
  const contactEmail = siteContent.cta_email ?? "hi@prappo.com";

  return <NavClient navLinks={navLinks} contactEmail={contactEmail} />;
}
