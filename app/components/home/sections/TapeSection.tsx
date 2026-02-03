"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";


export default function BrandingTape() {
  return (

    <section className="relative w-full py-12 md:py-14 overflow-visible">
      {/* 
         To get the "REVENANT" look: 
         - uppercase
         - font-black (900 weight)
         - tracking-tighter (compact spacing)
         - scale-x-110 (makes the font look wider like the reference)
      */}
      <div className="flex items-center justify-center ">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[15vw] md:text-[12vw] font-black uppercase leading-none tracking-tighter select-none transform scale-x-110 md:scale-x-125"
        >
          GDG NITH
        </motion.h1>
      </div>


      {/* Subtle Scanline effect from your reference */}
      <div className="absolute inset-0 pointer-events-none opacity-10 " />
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-200 dark:border-white/5 flex justify-between items-center">
        <span className="text-neutral-500 text-[9px] uppercase tracking-widest font-bold">© 2026 GDG NITH</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-neutral-500 text-[9px] uppercase tracking-widest hover:text-[#4285F4] transition-colors font-bold">
            Privacy
          </Link>
          <Link href="/terms" className="text-neutral-500 text-[9px] uppercase tracking-widest hover:text-[#4285F4] transition-colors font-bold">
            Terms
          </Link>
        </div>
      </div>
    </section>
  );
}