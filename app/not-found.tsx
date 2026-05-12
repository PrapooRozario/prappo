import Link from "next/link";
import { Corner } from "@/components/ui/Corner";

export default function NotFound() {
  return (
    <div className="pt-[120px] md:pt-[140px] flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div 
        className="relative w-full max-w-4xl border border-black/20 bg-gray-50/50 p-12 md:p-24 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        {/* Outer Corners */}
        <Corner className="-top-[1.5px] -left-[1.5px]" />
        <Corner className="-top-[1.5px] -right-[1.5px]" />
        <Corner className="-bottom-[1.5px] -left-[1.5px]" />
        <Corner className="-bottom-[1.5px] -right-[1.5px]" />

      
        <div className="relative z-10 font-mono text-xs uppercase tracking-widest text-black/50 mb-6 bg-white px-4 py-1 border border-black/10 rounded-full">
          / Error 404
        </div>
        
        <h1 className="relative z-10 font-mono text-[100px] md:text-[180px] font-medium leading-none mb-2 tracking-tighter text-black">
          404
        </h1>
        
        <p className="relative z-10 font-sans text-lg md:text-2xl text-black/70 mb-12 max-w-md">
          The page you are looking for has evaporated into the digital void.
        </p>

       
      </div>
    </div>
  );
}
