import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import WorkGrid from "@/components/sections/WorkGrid";
import TechStack from "@/components/sections/TechStack";
import { Skeleton } from "@/components/ui/Skeleton";

function WorkGridFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} width="100%" className="h-[480px] md:h-[560px] border border-black/10" />
      ))}
    </div>
  );
}

function TechStackFallback() {
  return (
    <section className="w-full mt-24 md:mt-40 mb-24 md:mb-40 relative">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 md:mb-16">
        <div className="max-w-2xl">
          <h2 className="font-sans text-[64px] md:text-[140px] leading-[0.8] tracking-tighter font-medium text-black/20">
            TECH<br />STACK
          </h2>
        </div>
        <div className="font-mono text-[13px] md:text-[14px] text-black/20 mt-6 md:mt-0 uppercase tracking-[0.08em]">
          [ Systems & Capabilities ]
        </div>
      </div>
      
      <div className="relative border border-black/10 border-b-0 bg-white">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col md:grid md:grid-cols-[120px_320px_1fr] items-start md:items-stretch border-b border-black/10">
            <div className="p-5 md:p-8 md:border-r border-black/10">
              <Skeleton height="1rem" width="3rem" />
            </div>
            <div className="px-5 pb-2 md:p-8 md:border-r border-black/10 flex items-center">
              <Skeleton height="2.5rem" width="12rem" />
            </div>
            <div className="px-5 pb-6 pt-2 md:p-8 flex items-center">
              <Skeleton height="1.5rem" width="100%" className="max-w-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="pt-[120px] md:pt-[140px]">
      <Hero label="WORK" />
      <Suspense fallback={<WorkGridFallback />}>
        <WorkGrid />
      </Suspense>
      <Suspense fallback={<TechStackFallback />}>
        <TechStack />
      </Suspense>
    </div>
  );
}
