import { Corner } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <div className="pt-[120px] md:pt-[140px] min-h-screen">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Block 1: Hero Text (Spans 2 cols) */}
        <div className="md:col-span-2 relative border border-black/10 bg-white p-8 md:p-12 flex flex-col justify-between min-h-[400px] md:min-h-[480px]">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/20 mb-8">
            / Introduction
          </div>

          <div>
            <Skeleton width="90%" margin="0 0 16px 0" className="h-[48px] md:h-[72px] lg:h-[88px]" />
            <Skeleton width="70%" margin="0 0 16px 0" className="h-[48px] md:h-[72px] lg:h-[88px]" />
            <Skeleton width="80%" className="h-[48px] md:h-[72px] lg:h-[88px]" />
          </div>
        </div>

        {/* Block 2: Image */}
        <div className="relative border border-black/10 bg-white p-2 min-h-[400px] md:min-h-full">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          <div className="relative w-full h-full overflow-hidden bg-black/5">
            <Skeleton width="100%" height="100%" className="absolute inset-0" />
          </div>
        </div>

        {/* Block 3: Location/Status */}
        <div className="relative border border-black/10 bg-white flex flex-col justify-between min-h-[400px]">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          <div className="relative z-10 flex flex-col h-full justify-between p-8 md:p-10">
            <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/20">
              / Location
            </div>

            <div>
              <Skeleton width="80%" margin="0 0 8px 0" className="h-[36px] md:h-[40px]" />
              <Skeleton width="60%" margin="0 0 32px 0" className="h-[36px] md:h-[40px]" />
              
              <div className="flex items-center gap-2">
                <Skeleton width="8px" height="8px" className="rounded-full" />
                <Skeleton width="50%" height="16px" />
              </div>
            </div>
          </div>
        </div>

        {/* Block 4: Philosophy */}
        <div className="relative border border-black/10 p-8 md:p-10 flex flex-col justify-between">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/20 mb-12">
            / Philosophy
          </div>

          <div>
            <Skeleton width="100%" height="28px" margin="0 0 12px 0" />
            <Skeleton width="100%" height="28px" margin="0 0 12px 0" />
            <Skeleton width="100%" height="28px" margin="0 0 12px 0" />
            <Skeleton width="70%" height="28px" />
          </div>
        </div>

        {/* Block 5: Expertise */}
        <div className="relative border border-black/10 bg-white p-8 md:p-10">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/20 mb-8 md:mb-12">
            / Expertise
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex justify-between ${i < 4 ? "border-b border-black/10" : ""} pb-3`}
              >
                <Skeleton width="50%" height="20px" />
                <Skeleton width="24px" height="20px" />
              </div>
            ))}
          </div>
        </div>

        {/* Block 6: Certificates Timeline (Spans 3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-sans text-[64px] md:text-[140px] leading-[0.8] tracking-tighter font-medium text-black">
            VERIFIED<br />LEARNING
          </h2>
          <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-black/50 md:text-[14px]">
            [ Credentials & Certifications ]
          </div>
        </div>
        
        <div className="md:col-span-3 relative border border-black/10 bg-white">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          <div className="flex flex-col">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:grid md:grid-cols-[120px_1fr_auto] border-b border-black/10 items-stretch">
                <div className="p-5 md:p-8 md:border-r border-black/10 flex items-center">
                  <Skeleton width="50px" height="20px" />
                </div>
                <div className="px-5 pb-2 md:p-8 md:border-r border-black/10 flex items-center">
                  <Skeleton width="70%" className="h-[32px] md:h-[40px]" />
                </div>
                <div className="px-5 pb-6 pt-2 md:p-8 flex items-center md:min-w-[200px]">
                  <Skeleton width="120px" height="20px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
