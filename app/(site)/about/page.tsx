import Image from "next/image";

import { Corner } from "@/components/ui";
import { CertRow } from "@/components/ui/CertRow";
import { LocationMap } from "@/components/ui/LocationMap";
import { getCertificates } from "@/lib/data/certificates";
import { getExpertise } from "@/lib/data/expertise";
import { getSiteContent } from "@/lib/data/site-content";

export const metadata = {
  title: "About — Prappo Rozario",
  description:
    "Learn more about Prappo Rozario, a MERN stack developer from Dhaka, Bangladesh.",
};

export default async function AboutPage() {
  const [certificates, expertise, siteContent] = await Promise.all([
    getCertificates(),
    getExpertise(),
    getSiteContent(),
  ]);

  const introLines = (siteContent.introduction)
    .split(/(?<=\.|&)\s+/)
    .filter(Boolean);
  const introToRender = introLines.length > 1 ? introLines : introLines

  const philosophy = siteContent.philosophy
  const locationLabel = siteContent.location_label;
  const availability = siteContent.availability;
  const lat = Number(siteContent.location_lat);
  const lng = Number(siteContent.location_lng);
  const [locationLine1, locationLine2] = locationLabel.split(",").map((part) => part.trim());

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

          <h1 className="font-sans text-[36px] sm:text-[48px] md:text-[72px] lg:text-[88px] leading-[0.9] tracking-[-0.04em] text-black uppercase">
            {introToRender.map((line, i) => (
              <span key={i}>
                {line}
                {i < introToRender.length - 1 ? <br /> : null}
              </span>
            ))}
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
            <LocationMap lat={lat} lng={lng} zoom={12} label={locationLabel} />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col h-full justify-between p-8 md:p-10 bg-gradient-to-t from-white via-white/80 to-transparent group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/20 transition-colors duration-700">
            <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/60 group-hover:text-white/80 transition-colors duration-700">
              / Location
            </div>

            <div className="group-hover:text-white transition-colors duration-700">
              <div className="font-sans text-[36px] md:text-[40px] leading-[1.1] tracking-[-0.02em]">
                {locationLine1 ? `${locationLine1},` : locationLabel}
                {locationLine2 ? (
                  <>
                    <br />
                    {locationLine2}
                  </>
                ) : null}
              </div>
              <div className="mt-8 font-mono text-[13px] flex items-center gap-2 text-black/60 group-hover:text-white/80 transition-colors duration-700">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                {availability}
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
            {philosophy}
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
            {expertise.map((item, i) => (
              <li
                key={item.id}
                className={`flex justify-between ${i < expertise.length - 1 ? "border-b border-black/10" : ""} pb-3`}
              >
                <span>{item.label}</span>
                <span className="text-black/30">[{String(i + 1).padStart(2, "0")}]</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Block 6: Certificates Timeline (Spans 3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            className="font-sans text-[44px] sm:text-[64px] md:text-[120px] lg:text-[140px] leading-[0.8] tracking-tighter font-medium text-black"
          >
            VERIFIED<br />LEARNING
          </h2>
          <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-black/50 md:text-[14px]">
            [ Credentials & Certifications ]
          </div>
        </div>
        <div
          className="md:col-span-3 relative border border-black/20 bg-white"
          aria-labelledby="certificates-heading"
        >
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          <div className="flex flex-col [&>*:first-child]:border-t-0">
            {certificates.map((cert) => (
              <CertRow
                key={cert.id}
                cert={{
                  year: cert.year,
                  title: cert.title,
                  issuer: cert.issuer,
                  image: cert.image,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
