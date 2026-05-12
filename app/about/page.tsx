import { Corner } from "@/components/ui";
import { CertRow } from "@/components/ui/CertRow";
import { LocationMap } from "@/components/ui/LocationMap";
import Image from "next/image";

export const metadata = {
  title: "About — Prappo Rozario",
  description: "Learn more about Prappo Rozario, a MERN stack developer from Dhaka, Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="pt-[120px] md:pt-[140px] min-h-screen">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Block 1: Hero Text (Spans 2 cols) */}
        <div className="md:col-span-2 relative border border-black/20 bg-white p-8 md:p-12 flex flex-col justify-between min-h-[400px] md:min-h-[480px]">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />
          
          <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/50 mb-8">
            / Introduction
          </div>
          
          <h1 className="font-sans text-[48px] md:text-[72px] lg:text-[88px] leading-[0.9] tracking-[-0.04em] text-black uppercase">
            Bridging the gap<br />
            between robust<br />
            <span className="text-black/30">engineering</span> &<br />
            refined <span className="text-black/30">design.</span>
          </h1>
        </div>

        {/* Block 2: Image */}
        <div className="relative border border-black/20 bg-white p-2 min-h-[400px] md:min-h-full">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />
          
          <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-black/5">
            <Image
              src="/images/prappo.png"
              alt="Prappo Rozario"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>

        {/* Block 3: Location/Status */}
        <div className="relative border border-black/20 bg-white flex flex-col justify-between group overflow-hidden min-h-[400px]">
          <Corner className="-top-[1.5px] -left-[1.5px] z-20" />
          <Corner className="-top-[1.5px] -right-[1.5px] z-20" />
          <Corner className="-bottom-[1.5px] -left-[1.5px] z-20" />
          <Corner className="-bottom-[1.5px] -right-[1.5px] z-20" />
          
          {/* Map Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-in-out">
            <LocationMap lat={23.7806} lng={90.4193} zoom={12} label="Dhaka, Bangladesh" />
          </div>
          
          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col h-full justify-between p-8 md:p-10 bg-gradient-to-t from-white via-white/80 to-transparent group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/20 transition-colors duration-700">
            <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/60 group-hover:text-white/80 transition-colors duration-700">
              / Location
            </div>
            
            <div className="group-hover:text-white transition-colors duration-700">
              <div className="font-sans text-[36px] md:text-[40px] leading-[1.1] tracking-[-0.02em]">
                Dhaka,<br />
                Bangladesh.
              </div>
              <div className="mt-8 font-mono text-[13px] flex items-center gap-2 text-black/60 group-hover:text-white/80 transition-colors duration-700">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                Available for freelance
              </div>
            </div>
          </div>
        </div>

        {/* Block 4: Philosophy */}
        <div className="relative border border-black/20 p-8 md:p-10 flex flex-col justify-between">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />
          
          <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/50  mb-12">
            / Philosophy
          </div>
          
          <p className="font-sans text-[22px] md:text-[28px] leading-[1.3] tracking-[-0.02em]">
            My approach is rooted in systemizing chaos. Code should be scalable and invisible, while the interface must feel deeply intuitive and meticulously crafted.
          </p>
        </div>

        {/* Block 5: Expertise */}
        <div className="relative border border-black/20 bg-white p-8 md:p-10">
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />
          
          <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/50 mb-8 md:mb-12">
            / Expertise
          </div>
          
          <ul className="font-mono text-[14px] md:text-[15px] space-y-4">
            <li className="flex justify-between border-b border-black/10 pb-3">
              <span>Full-stack Development</span>
              <span className="text-black/30">[01]</span>
            </li>
            <li className="flex justify-between border-b border-black/10 pb-3">
              <span>System Architecture</span>
              <span className="text-black/30">[02]</span>
            </li>
            <li className="flex justify-between border-b border-black/10 pb-3">
              <span>UI / UX Engineering</span>
              <span className="text-black/30">[03]</span>
            </li>
            <li className="flex justify-between pb-3">
              <span>Motion & Interaction</span>
              <span className="text-black/30">[04]</span>
            </li>
          </ul>
        </div>
        
        {/* Block 6: Certificates Timeline (Spans 3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="certificates-heading"
            className="font-sans text-[64px] md:text-[140px] leading-[0.8] tracking-tighter font-medium text-black"
          >
            VERIFIED<br />LEARNING
          </h2>
          <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-black/50 md:text-[14px]">
            [ Credentials & Certifications ]
          </div>
        </div>
        <div className="md:col-span-3 relative border border-black/20 bg-white"
          aria-labelledby="certificates-heading"
        >
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />
          
          
          <div className="flex flex-col [&>*:first-child]:border-t-0">
            {[
              {
                year: "2024",
                title: "Full Stack Open",
                issuer: "University of Helsinki",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
              },
              {
                year: "2023",
                title: "Meta Front-End Developer Professional",
                issuer: "Coursera",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
              },
              {
                year: "2022",
                title: "Responsive Web Design",
                issuer: "freeCodeCamp",
                image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop",
              },
            ].map((cert, i) => (
              <CertRow key={i} cert={cert} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
