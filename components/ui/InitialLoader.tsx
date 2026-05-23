"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function InitialLoader() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if this is the first visit in the session
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShouldShow(true);
    }
    setIsInitialized(true);
  }, []);

  useGSAP(() => {
    if (!shouldShow || !containerRef.current || !counterRef.current) return;

    // We animate a counter object from 0 to 100
    const counter = { value: 0 };
    
    // Lock body scroll
    document.body.style.overflow = "hidden";

    gsap.to(counter, {
      value: 100,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.value)}%`;
        }
      },
      onComplete: () => {
        // Animate out
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            sessionStorage.setItem("hasVisited", "true");
            setShouldShow(false);
            document.body.style.overflow = "";
          }
        });
      }
    });

  }, { dependencies: [shouldShow], scope: containerRef });

  if (!isInitialized || !shouldShow) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div 
        ref={counterRef} 
        className="font-mono text-[80px] md:text-[140px] leading-none tracking-tighter text-black"
      >
        0%
      </div>
    </div>
  );
}
