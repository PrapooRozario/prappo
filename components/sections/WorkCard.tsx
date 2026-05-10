import { memo } from "react";
import { Corner, ArrowButton } from "@/components/ui";
import type { Project } from "@/types";

interface WorkCardProps {
  project: Project;
}

function WorkCardImpl({ project }: WorkCardProps) {
  const { title, year, category, number } = project;

  return (
    <article
      aria-labelledby={`work-${project.id}-title`}
      className="group relative flex flex-col w-full h-[480px] md:h-[560px] border border-black/20 bg-white cursor-pointer overflow-hidden text-black"
    >
      {/* Top Outer Corners */}
      <Corner className="top-[-1.5px] left-[-1.5px]" />
      <Corner className="top-[-1.5px] right-[-1.5px]" />

      {/* Top Meta Bar */}
      <div className="relative grid grid-cols-[auto_1fr_auto] h-[48px] border-b border-black/20 bg-white z-20">
        <div className="relative px-5 md:px-6 flex items-center border-r border-black/20 font-mono text-[11px] md:text-[12px] text-black/50 tracking-widest">
          {number}
          <Corner className="bottom-[-1.5px] right-[-1.5px]" />
        </div>
        <div className="relative px-5 md:px-6 flex items-center font-mono text-[11px] md:text-[12px] text-black/50 uppercase tracking-widest">
          {category}
        </div>
        <div className="relative px-5 md:px-6 flex items-center border-l border-black/20 font-mono text-[11px] md:text-[12px] text-black/50 tracking-widest">
          {year}
          <Corner className="bottom-[-1.5px] left-[-1.5px]" />
        </div>

        <Corner className="bottom-[-1.5px] left-[-1.5px]" />
        <Corner className="bottom-[-1.5px] right-[-1.5px]" />
      </div>

      {/* Main Visual Area */}
      <div className="relative flex-1 bg-[#f4f4f4] overflow-hidden flex items-center justify-center group-hover:bg-[#ebebeb] transition-colors duration-700">
        {/* Architectural Grid Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
        />

        {/* Floating Abstract Mockup */}
        <div className="relative z-10 w-[65%] h-[75%] max-w-[320px] max-h-[380px] bg-white border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:-translate-y-2 flex flex-col [will-change:transform]">
          {/* Mockup Header */}
          <div className="h-6 md:h-8 border-b border-black/10 flex items-center px-3 gap-1.5 bg-gray-50/50">
            <div className="w-1.5 h-1.5 rounded-full bg-black/15" />
            <div className="w-1.5 h-1.5 rounded-full bg-black/15" />
            <div className="w-1.5 h-1.5 rounded-full bg-black/15" />
          </div>
          {/* Mockup Content */}
          <div className="flex-1 bg-[#ef4250] m-3 md:m-4 flex items-center justify-center overflow-hidden relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:4px_4px]"
            />
            <div className="font-sans text-[64px] md:text-[80px] text-[#171717] tracking-tighter leading-none group-hover:scale-110 transition-transform duration-700 ease-out z-10 [will-change:transform]">
              HS<span className="ml-[2px]">↗</span>N
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Title Area */}
      <div className="relative border-t border-black/20 bg-white group-hover:bg-black text-black group-hover:text-white transition-colors duration-500 z-20">
        <Corner className="top-[-1.5px] left-[-1.5px]" />
        <Corner className="top-[-1.5px] right-[-1.5px]" />
        <Corner className="bottom-[-1.5px] left-[-1.5px]" />
        <Corner className="bottom-[-1.5px] right-[-1.5px]" />

        <div className="p-6 md:p-8 flex items-end justify-between">
          <div className="flex flex-col">
            <h2
              id={`work-${project.id}-title`}
              className="font-sans text-[36px] md:text-[44px] font-medium leading-[1.05] tracking-tighter transition-colors duration-500"
            >
              {title.split(" ").map((word, i, arr) => (
                <span key={`${word}-${i}`}>
                  {word}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
          </div>

          <div className="ml-4">
            <ArrowButton ariaLabel={`Open ${title} case study`} />
          </div>
        </div>
      </div>
    </article>
  );
}

const WorkCard = memo(WorkCardImpl);
export default WorkCard;
