"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade effect on page change
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={contentRef} className="opacity-0">
      {children}
    </div>
  );
}
