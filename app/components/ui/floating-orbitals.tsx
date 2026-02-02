"use client";
import { motion } from "framer-motion";

export const OrbitingGraphic = () => {
  // Both dots rotate together, staying 180° apart, pausing when vertically aligned
  const orbitAnimation = {
    rotate: [0, 180, 180, 360],
  };

  const orbitTransition: any = {
    duration: 3,
    repeat: Infinity,
    ease: ["easeInOut"],
    times: [0, 0.45, 0.55, 1], // Pause for ~0.5s at halfway point (when vertically opposite)
  };

  return (
    <div className="relative top-100 w-72 h-128 flex items-center justify-center">
      {/* Large faint background circle */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute w-42 h-42 bg-blue-50/60 dark:bg-[#4285F4]/[0.08] rounded-full" 
      />
      
      {/* Single container for both dots - they rotate together maintaining 180° separation */}
      <motion.div
        animate={orbitAnimation}
        transition={orbitTransition}
        className="absolute w-42 h-42"
      >
        {/* Blue Dot - at top */}
        <div className="w-12 h-12 bg-[#1a73e8] dark:bg-[#4285F4]/60 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg dark:shadow-none" />
        
        {/* Red Dot - at bottom (diametrically opposite) */}
        <div className="w-8 h-8 bg-[#ea4335] dark:bg-[#EA4335]/50 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-lg dark:shadow-none" />
      </motion.div>
    </div>
  );
};