"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface HoverSlideTextProps {
  label: string;
  /** Tailwind classes applied to BOTH the visible and hidden duplicate labels. */
  textClassName?: string;
  /** Tailwind classes applied to the hidden duplicate only (e.g. its color). */
  hiddenClassName?: string;
}

/**
 * Renders text that slides up on parent hover, revealing a duplicate from below.
 * Parent must have the `group` class to drive the CSS-like interactions.
 * We attach JS mouse events to the parent element to drive the GSAP animation.
 */
export function HoverSlideText({
  label,
  textClassName = "block",
  hiddenClassName = "text-white",
}: HoverSlideTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  
  // Store the animation so we can play/reverse it smoothly
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Create a paused timeline that we'll control
    tl.current = gsap.timeline({ paused: true })
      .to([text1Ref.current, text2Ref.current], {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.out",
      });

    const parent = containerRef.current?.closest('a') || containerRef.current?.parentElement;
    if (!parent) return;

    const onMouseEnter = () => tl.current?.play();
    const onMouseLeave = () => tl.current?.reverse();

    parent.addEventListener("mouseenter", onMouseEnter);
    parent.addEventListener("mouseleave", onMouseLeave);

    return () => {
      parent.removeEventListener("mouseenter", onMouseEnter);
      parent.removeEventListener("mouseleave", onMouseLeave);
      tl.current?.kill();
    };
  }, { scope: containerRef });

  return (
    <span
      className="relative block overflow-hidden"
      ref={containerRef}
    >
      <span ref={text1Ref} className={`block ${textClassName}`}>
        {label}
      </span>
      <span
        ref={text2Ref}
        className={`absolute top-full left-0 block w-full text-center ${textClassName} ${hiddenClassName}`}
        aria-hidden="true"
      >
        {label}
      </span>
    </span>
  );
}
