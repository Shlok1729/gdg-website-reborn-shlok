"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins (Safety check for Next.js SSR)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function AboutScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const path = pathRef.current;

    if (!container || !path) return;

    // --- THE CURVE ("Snake") ANIMATION ---
    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-background overflow-hidden"
      style={{ height: "200vh" }}
    >
      {/* BACKGROUND LAYER: The SVG Curve */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 3000"
          preserveAspectRatio="xMidYMin slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M 850 -50 
               C 750 100, 950 250, 700 400
               C 450 550, 50 350, 150 650
               C 250 950, 600 800, 850 1000
               C 1100 1200, 950 1400, 650 1350
               C 350 1300, 100 1500, 200 1750
               C 300 2000, 700 1900, 500 2100
               C 300 2300, 250 2450, 600 2600
               C 950 2750, 1300 2800, 1500 2700"
            stroke="#4285F4"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Decorative dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-[5%] w-4 h-4 rounded-full bg-[#4285F4] opacity-60 animate-pulse" />
        <div className="absolute top-[25%] right-[10%] w-6 h-6 rounded-full bg-[#EA4335] opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[45%] left-[8%] w-5 h-5 rounded-full bg-[#FBBC05] opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] right-[5%] w-4 h-4 rounded-full bg-[#34A853] opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[75%] left-[15%] w-6 h-6 rounded-full bg-[#4285F4] opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* SECTION 1: Hero Title */}
      <div className="sticky top-0 h-[70vh] flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-lg md:text-xl text-muted-foreground mb-2 tracking-widest uppercase">Welcome to</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-foreground">
            NITH-CHAPTER
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Google Developer Groups - LUDHIANA
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#4285F4]" />
            <span className="w-3 h-3 rounded-full bg-[#EA4335]" />
            <span className="w-3 h-3 rounded-full bg-[#FBBC05]" />
            <span className="w-3 h-3 rounded-full bg-[#34A853]" />
          </div>
        </div>
      </div>

      {/* SECTION 2: About Description */}
      <div className="relative z-10 min-h-[60vh] flex items-center py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4">
                <span className="text-[#4285F4]">Learn.</span>{" "}
                <span className="text-[#EA4335]">Build.</span>{" "}
                <span className="text-[#34A853]">Connect.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
                Google Developer Groups (GDG) on campus are university-based community groups for students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                By joining GDG NITH, you become part of a global community of developers passionate about technology, innovation, and making a difference through code.
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-card border border-border group cursor-pointer">
              <iframe src="https://www.youtube.com/embed/o8NiE3XMPrM?autoplay=1&controls=0&loop=1&t=255" allow="autoplay" allowFullScreen loading="lazy" className="w-full h-full" />

              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#4285F4]/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#EA4335]/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#FBBC05]/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#34A853]/50" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
