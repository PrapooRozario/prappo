import { getNavLinks } from "@/lib/data/nav-links";
import { getSocialLinks } from "@/lib/data/social-links";

import NavClient from "./NavClient";

export default async function Nav() {
  const [links, socialLinks] = await Promise.all([
    getNavLinks(),
    getSocialLinks(),
  ]);

  const navLinks = links.map(({ label, href }) => ({ label, href }));

  return <NavClient navLinks={navLinks} socialLinks={socialLinks} />;
}

