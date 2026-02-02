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

    // --- 1. THE CURVE ("Snake") ANIMATION ---
    // Get the exact length of the SVG path
    const pathLength = path.getTotalLength();
    
    // Hide the line initially by offsetting the dash by its full length
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate the offset to 0 (reveal the line) linked to scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none", // Linear easing is crucial for scrubbing
      scrollTrigger: {
        trigger: container,
        start: "top top",     // Start when container hits top of screen
        end: "bottom bottom", // End when container leaves screen
        scrub: 1.5,           // The "Heavy" lag effect (1.5s catchup)
      },
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-background"
      // Height controls the speed. Taller = Slower animation.
      style={{ height: "200vh" }} 
    >
      {/* BACKGROUND LAYER: The SVG Curve */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 2000" 
          preserveAspectRatio="xMidYMin slice" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M 600 -100 
               C 600 200, 100 300, 100 500 
               C 100 700, 900 800, 900 1100 
               C 900 1400, 200 1500, 200 1800"
            stroke="#3b82f6" 
            strokeWidth="15"     
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* TEXT LAYERS */}
      <div className="absolute top-[10%] left-[10%] max-w-lg pointer-events-none">
        <h1 className="text-8xl font-black uppercase">About Us</h1>
      </div>
      <div className="absolute top-[35%] right-[5%] text-right pointer-events-none max-w-3xl">
        <h2 className="text-[10rem] leading-none font-black whitespace-nowrap">GDG NITH</h2>
        <p className="mt-8 text-3xl text-muted-foreground">
          Google Developer Groups (GDG) are community groups for college and university students interested in Google developer technologies.
        </p>
        <p className="mt-6 text-2xl text-muted-foreground">
          We host workshops, hackathons, and study jams to help students learn and grow together.
        </p>
      </div>

    </div>
  );
}
