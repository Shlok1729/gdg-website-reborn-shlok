"use client";

import React from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for Tailwind class merging (standard shadcn/ui pattern)
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SciFiCardProps {
  title?: string;
  logoSrc?: string;
  bgImageSrc?: string;
  themeColor?: string;
  onClick?: () => void;
  className?: string;
}

const SciFiCard: React.FC<SciFiCardProps> = ({
  title = "EVENT TITLE",
  logoSrc,
  bgImageSrc,
  themeColor = "#8B5CF6", // Default Tailwind purple-500
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        // BASE LAYOUT
        "relative group w-full aspect-video cursor-pointer select-none",
        // NEW: Scale the entire card on hover
        "transition-transform duration-300 ease-out hover:scale-105", 
        className
      )}
      style={{
        ["--theme-color" as any]: themeColor,
      }}
    >
      {/* 1. BACKGROUND LAYER (Clipped) */}
      <div 
        className="absolute inset-0 z-0 bg-gray-900 transition-all duration-500 overflow-hidden"
        style={{
          clipPath: "polygon(10% 0, 90% 0, 100% 15%, 100% 85%, 90% 100%, 10% 100%, 0 85%, 0 15%)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-100" />

        {bgImageSrc && (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-100"
            style={{ backgroundImage: `url(${bgImageSrc})` }}
          />
        )}
        
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />
      </div>

      {/* 2. SVG BORDER OVERLAY */}
      <svg
        className="absolute inset-0 z-20 w-full h-full pointer-events-none drop-shadow-[0_0_8px_var(--theme-color)]"
        viewBox="0 0 400 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Heavy Border */}
        <path
          d="M40,5 L360,5 L395,40 L395,210 L360,245 L40,245 L5,210 L5,40 Z"
          stroke="var(--theme-color)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Inner Thin Detail Lines */}
        <path
          d="M45,15 L15,45 M355,15 L385,45 M385,205 L355,235 M15,205 L45,235"
          stroke="var(--theme-color)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="opacity-50"
        />

        {/* Vertical Decorative Side Lines */}
        <path
           d="M12,50 L12,200 M388,50 L388,200"
           stroke="var(--theme-color)"
           strokeWidth="1"
           strokeDasharray="40 10"
           className="opacity-40 group-hover:opacity-80 transition-opacity"
           vectorEffect="non-scaling-stroke"
        />
        
        {/* Corner Brackets */}
        <path
           d="M30,10 L10,30 M370,10 L390,30 M390,220 L370,240 M10,220 L30,240"
           stroke="white"
           strokeWidth="2"
           strokeLinecap="square"
           vectorEffect="non-scaling-stroke"
           className="opacity-80"
        />
      </svg>

      {/* 3. CONTENT LAYER */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
        <h2 className="
          text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider sm:tracking-widest text-white 
          transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
          transition-all duration-500 ease-out
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
          font-orbitron
        ">
          {title}
        </h2>

        {logoSrc && (
          <div className="relative w-32 h-32 mt-2 transition-all duration-500 transform scale-75 opacity-0 group-hover:scale-110 group-hover:opacity-100">
            <img 
              src={logoSrc} 
              alt="Event Logo" 
              className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            />
          </div>
        )}
      </div>
      
      {/* 4. IDLE STATE INDICATOR */}
      <div className="absolute inset-0 z-10 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
         <div className="w-16 h-1 bg-white/20 rounded-full" />
      </div>

    </div>
  );
};

export default SciFiCard;