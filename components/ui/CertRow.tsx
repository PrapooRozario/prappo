"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CertProps {
  cert: {
    year: string;
    title: string;
    issuer: string;
    image: string;
  };
}

export function CertRow({ cert }: CertProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const issuerRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Initial setup
    gsap.set(bgRef.current, { yPercent: 101 });
    gsap.set(imgWrapperRef.current, { autoAlpha: 0, scale: 0.8, rotation: -10 });
    gsap.set(imgRef.current, { filter: "grayscale(100%)", opacity: 0.6 });
    
    tl.current = gsap.timeline({ paused: true, defaults: { ease: "power3.out", duration: 0.6 } })
      // Slide up black background
      .to(bgRef.current, { yPercent: 0, ease: "power4.inOut", duration: 0.5 }, 0)
      // Pop in the image
      .to(imgWrapperRef.current, { autoAlpha: 1, scale: 1, rotation: 3, ease: "back.out(1.5)" }, 0.1)
      .to(imgRef.current, { filter: "grayscale(0%)", opacity: 1 }, 0.1)
      // Text color changes
      .to(textContainerRef.current, { color: "#ffffff", duration: 0.4 }, 0)
      .to(yearRef.current, { color: "rgba(255,255,255,0.5)", duration: 0.4 }, 0)
      .to(issuerRef.current, { color: "rgba(255,255,255,0.7)", duration: 0.4 }, 0);

    const el = containerRef.current;
    if (!el) return;

    const onEnter = () => tl.current?.play();
    const onLeave = () => tl.current?.reverse();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative border-t border-black/20 cursor-crosshair hover:z-30"
    >
      {/* Background slider */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div ref={bgRef} className="absolute inset-0 bg-black"></div>
      </div>

      {/* Floating Image */}
      <div 
        ref={imgWrapperRef}
        className="absolute hidden md:block right-[15%] lg:right-[25%] top-1/2 -translate-y-1/2 w-[260px] aspect-[4/3] pointer-events-none z-20 shadow-2xl border border-white/20"
      >
        <img 
          ref={imgRef}
          src={cert.image} 
          alt={cert.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div 
        ref={textContainerRef}
        className="relative z-10 px-8 md:px-12 lg:px-16 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
          <span ref={yearRef} className="font-mono text-[13px] text-black/50">
            CERT / {cert.year}
          </span>
          <h3 className="font-sans text-[28px] md:text-[36px] font-medium tracking-[-0.02em]">
            {cert.title}
          </h3>
        </div>

        <div className="flex items-center gap-6">
          <span ref={issuerRef} className="font-mono text-[14px] text-black/70">
            {cert.issuer}
          </span>
         
        </div>
      </div>
    </div>
  );
}
