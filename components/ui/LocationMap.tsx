"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface LocationMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  label?: string;
}

export function LocationMap({ lat, lng, zoom = 14, label }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el) return;

      map = L.map(el, {
        center: [lat, lng],
        zoom,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
        attributionControl: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
        { maxZoom: 19, subdomains: "abcd" }
      ).addTo(map);

      const pin = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:14px;height:14px;">
            <span style="position:absolute;inset:0;border-radius:9999px;background:#22c55e;box-shadow:0 0 0 4px rgba(34,197,94,0.25);"></span>
            <span style="position:absolute;inset:-6px;border-radius:9999px;border:1px solid rgba(34,197,94,0.5);animation:lm-ping 1.6s cubic-bezier(0,0,0.2,1) infinite;"></span>
          </div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      L.marker([lat, lng], { icon: pin, title: label, keyboard: false }).addTo(map);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lat, lng, zoom, label]);

  return (
    <>
      <style>{`@keyframes lm-ping{75%,100%{transform:scale(2);opacity:0;}}`}</style>
      <div ref={containerRef} className="absolute inset-0 h-full w-full" aria-label={label} />
    </>
  );
}
