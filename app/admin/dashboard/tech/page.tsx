import { Suspense } from "react";
import { fetchTechCategories, fetchTechItems } from "@/lib/api";
import TechClient from "./TechClient";

async function TechLoader() {
  const categoriesRes = await fetchTechCategories();
  const itemsRes = await fetchTechItems();

  const categories = categoriesRes?.data || categoriesRes || [];
  const items = itemsRes?.data || itemsRes || [];

  return <TechClient initialCategories={categories} initialItems={items} />;
}

export default function TechPage() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <a href="/admin/dashboard" className="font-mono text-sm uppercase tracking-widest text-black/60 hover:text-black">
          &larr; Back to Dashboard
        </a>
      </div>
      <h1 className="text-3xl font-sans uppercase border-b border-black/20 pb-4 mb-8">Manage Tech Stack</h1>
      <Suspense fallback={<div className="font-mono text-sm text-black/50 uppercase tracking-widest">Loading tech stack...</div>}>
        <TechLoader />
      </Suspense>
    </div>
  );
}
