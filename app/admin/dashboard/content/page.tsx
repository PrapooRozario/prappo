import { Suspense } from "react";
import { getSiteContent } from "@/lib/data/site-content";
import ContentClient from "./ContentClient";

async function ContentLoader() {
  const content = await getSiteContent();
  return <ContentClient initialContent={content} />;
}

export default function ContentPage() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <a href="/admin/dashboard" className="font-mono text-sm uppercase tracking-widest text-black/60 hover:text-black">
          &larr; Back to Dashboard
        </a>
      </div>
      <h1 className="text-3xl font-sans uppercase border-b border-black/20 pb-4 mb-8">Manage Site Content</h1>
      <Suspense fallback={<div className="font-mono text-sm text-black/50 uppercase tracking-widest">Loading content...</div>}>
        <ContentLoader />
      </Suspense>
    </div>
  );
}
