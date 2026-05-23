"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasShownLoading = sessionStorage.getItem("hasShownLoading");
    if (hasShownLoading) {
      setIsVisible(false);
      return;
    }

    // Animate progress over 1.5 seconds
    const duration = 1500;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentStep = 0;
    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress((prev) => {
        const newProgress = prev + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem("hasShownLoading", "true");
        }, 500);
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="font-mono text-[14px] md:text-[16px] tracking-widest text-black">
        {Math.round(progress)}%
      </div>
    </div>
  );
}