"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Detects when the fixed nav overlaps the page footer using IntersectionObserver.
 * Returns `true` once the footer's top edge has crossed below the nav's bottom.
 *
 * Replaces the previous scroll listener implementation. Uses a rootMargin
 * sized to the nav's measured height so the observer fires at the right
 * moment without re-measuring on every scroll frame.
 */
export function useFooterTheme(): boolean {
  const [isOverFooter, setIsOverFooter] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const footer = document.querySelector("footer");
    const nav = document.querySelector("nav");
    if (!footer || !nav) return;

    const navHeight = nav.getBoundingClientRect().height;

    // The observer fires whenever the footer enters/leaves a band at the
    // top of the viewport equal to the nav's height. When intersecting,
    // the nav and footer overlap.
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsOverFooter(entry.isIntersecting);
      },
      {
        // Top margin = -(viewport - navHeight) leaves a thin band of size navHeight.
        rootMargin: `0px 0px -${Math.max(0, window.innerHeight - navHeight)}px 0px`,
        threshold: 0,
      }
    );

    observer.observe(footer);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  return isOverFooter;
}
