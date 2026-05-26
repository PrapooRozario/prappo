"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error";

interface ToastEventDetail {
  message: string;
  type: ToastType;
}

export function showToast(message: string, type: ToastType = "success") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<ToastEventDetail>("app-toast", {
        detail: { message, type },
      })
    );
  }
}

export function Toast() {
  const [toast, setToast] = useState<ToastEventDetail | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastEventDetail>;
      setToast(customEvent.detail);
      setTimeout(() => setToast(null), 3000);
    };

    window.addEventListener("app-toast", handleToast);
    return () => window.removeEventListener("app-toast", handleToast);
  }, []);

  if (!toast) return null;

  const bg = toast.type === "error" ? "bg-red-500" : "bg-black";
  
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`${bg} text-white px-4 py-3 shadow-lg font-mono text-[12px] flex items-center gap-3 border border-white/20 uppercase tracking-widest`}>
        {toast.type === "success" && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
        {toast.type === "error" && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
