import React from "react";

import { Corner } from "@/components/ui";
import { getTechStack } from "@/lib/data/tech-stack";

export default async function TechStack() {
  const techCategories = await getTechStack();

  return (
    <section
      aria-labelledby="tech-stack-heading"
      className="w-full mt-24 md:mt-40 mb-24 md:mb-40 relative"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 md:mb-16">
        <div className="max-w-2xl">
          <h2
            id="tech-stack-heading"
            className="font-sans text-[64px] md:text-[140px] leading-[0.8] tracking-tighter font-medium text-black"
          >
            TECH<br />STACK
          </h2>
        </div>
        <div className="font-mono text-[13px] md:text-[14px] text-black/50 mt-6 md:mt-0 uppercase tracking-[0.08em]">
          [ Systems & Capabilities ]
        </div>
      </div>

      {/* Main Table Container */}
      <div className="relative border border-black/20 border-b-0 bg-white">
        <Corner className="-top-[1.5px] -left-[1.5px]" />
        <Corner className="-top-[1.5px] -right-[1.5px]" />

        {techCategories.map((category) => (
          <div
            key={category.id}
            className="group relative flex flex-col md:grid md:grid-cols-[120px_320px_1fr] items-start md:items-stretch border-b border-black/20 hover:bg-black hover:text-white transition-all duration-500 cursor-crosshair"
          >
            {/* ID Column */}
            <div className="p-5 md:p-8 md:border-r border-black/20 group-hover:border-white/20 flex items-center transition-colors duration-500">
              <span className="font-mono text-[13px] md:text-[14px] text-black/40 group-hover:text-white/50 transition-colors duration-500">
                / {category.display_id}
              </span>
            </div>

            {/* Title Column */}
            <div className="px-5 pb-2 md:p-8 md:border-r border-black/20 group-hover:border-white/20 flex items-center transition-colors duration-500">
              <h3 className="font-sans text-[32px] md:text-[40px] font-medium tracking-[-0.04em] leading-none">
                {category.title}
              </h3>
            </div>

            {/* Technologies Column */}
            <div className="px-5 pb-6 pt-2 md:p-8 flex items-center">
              <div className="font-mono text-[13px] md:text-[15px] leading-[1.6] group-hover:text-white/80 text-black/80 transition-colors duration-500 flex flex-wrap items-center gap-y-1">
                {category.items.map((item, i) => (
                  <React.Fragment key={item}>
                    <span className="group-hover:text-white whitespace-nowrap">{item}</span>
                    {i < category.items.length - 1 && (
                      <span className="mx-3 text-black/20 group-hover:text-white/30 transition-colors duration-500">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Animated Starburst on Hover */}
            <div
              aria-hidden="true"
              className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-700 hidden md:block pointer-events-none"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
                <path d="M12 2L12 22M2 12L22 12M4.9 4.9L19.1 19.1M4.9 19.1L19.1 4.9" />
              </svg>
            </div>
          </div>
        ))}

        <Corner className="-bottom-[1.5px] -left-[1.5px]" />
        <Corner className="-bottom-[1.5px] -right-[1.5px]" />
      </div>
    </section>
  );
}
