import { getNavLinks } from "@/lib/data/nav-links";
import { getSocialLinks } from "@/lib/data/social-links";
import { getExpertise } from "@/lib/data/expertise";
import ConfigClient from "./ConfigClient";
import { Suspense } from "react";

export const metadata = {
  title: "Site Config Management",
};

async function ConfigContent() {
  const [navLinks, socialLinks, expertise] = await Promise.all([
    getNavLinks(),
    getSocialLinks(),
    getExpertise(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end border-b border-black/20 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-sans uppercase mb-1">Site Configuration</h1>
          <p className="font-mono text-xs text-black/60">Manage navigation, social links, and expertise items</p>
        </div>
      </div>
      
      <ConfigClient 
        initialNavLinks={navLinks} 
        initialSocialLinks={socialLinks} 
        initialExpertise={expertise} 
      />
    </div>
  );
}

export default function ConfigPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-sm text-black/50">Loading config...</div>}>
      <ConfigContent />
    </Suspense>
  );
}
