import { memo } from "react";
import Image from "next/image";
import { Corner, ArrowButton } from "@/components/ui";
import type { Project } from "@/lib/data/projects";
import Link from "next/link";

interface WorkCardProps {
  project: Partial<Project> & { 
    id: string; 
    title: string; 
    year: number; 
    category: string; 
    number: string;
    image?: string | null;
    url?: string;
  };
}

function WorkCardImpl({ project }: WorkCardProps) {
  const { title, year, category, number, image, url } = project;

  return (
    <article
      aria-labelledby={`work-${project.id}-title`}
      className="group relative flex flex-col w-full h-[480px] md:h-[560px] border border-black/20 bg-white cursor-pointer overflow-hidden text-black"
    >
      {/* Top Outer Corners */}
      <Corner className="-top-[1.5px] -left-[1.5px]" />
      <Corner className="-top-[1.5px] -right-[1.5px]" />

      {/* Top Meta Bar */}
      <div className="relative grid grid-cols-[auto_1fr_auto] h-[48px] border-b border-black/20 bg-white z-20">
        <div className="relative px-5 md:px-6 flex items-center border-r border-black/20 font-mono text-[11px] md:text-[12px] text-black/50 tracking-widest">
          {number}
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />
        </div>
        <div className="relative px-5 md:px-6 flex items-center font-mono text-[11px] md:text-[12px] text-black/50 uppercase tracking-widest">
          {category}
        </div>
        <div className="relative px-5 md:px-6 flex items-center border-l border-black/20 font-mono text-[11px] md:text-[12px] text-black/50 tracking-widest">
          {year}
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
        </div>

        <Corner className="-bottom-[1.5px] -left-[1.5px]" />
        <Corner className="-bottom-[1.5px] -right-[1.5px]" />
      </div>


          {/* Mockup Content */}
          <div className="flex-1 flex items-center justify-center overflow-hidden relative">
            {image ? (
              <Image 
                src={image} 
                alt={title}
                fill
                className="object-fit group-hover:scale-110 transition-transform duration-500 ease-out z-10"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:4px_4px]"
                />
                <div className="font-sans text-[64px] md:text-[80px] text-[#171717] tracking-tighter leading-none group-hover:scale-110 transition-transform duration-500 ease-out z-10 [will-change:transform]">
                  {title}
                </div>
              </>
            )}
          </div>

      {/* Bottom Title Area */}
      <div className="relative border-t border-black/20 bg-white group-hover:bg-black text-black group-hover:text-white transition-colors duration-500 z-20">
        <Corner className="-top-[1.5px] -left-[1.5px]" />
        <Corner className="-top-[1.5px] -right-[1.5px]" />
        <Corner className="-bottom-[1.5px] -left-[1.5px]" />
        <Corner className="-bottom-[1.5px] -right-[1.5px]" />
        <div className="p-6 md:p-8 flex items-end justify-between">
          <div className="flex flex-col">
            <h2
              id={`work-${project.id}-title`}
              className="font-sans text-[36px] md:text-[44px] font-medium leading-[1.05] tracking-tighter transition-colors duration-500"
            >
              {title.split(" ").map((word: string, i: number, arr: string[]) => (
                <span key={`${word}-${i}`}>
                  {word}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
          </div>

          <Link href={url || '#'} target="_blank" className="ml-4">
            <ArrowButton ariaLabel={url ? `Open ${title}` : 'No link available'} />
          </Link>
        </div>
      </div>
    </article>
  );
}

const WorkCard = memo(WorkCardImpl);
export default WorkCard;
