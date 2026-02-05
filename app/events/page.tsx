"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "../components/Carousel";
import SciFiCard from "../components/SciFiCard";
import { NeuralBackground } from "../components/NeuralBackground-Red";
import Link from "next/link";
import { events as eventsData } from "../data/events-data";
export default function EventsPage() {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("2026");
  
  const photos = [
    "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
    "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
  ];

  // Helper to assign neon colors
  const getThemeColor = (index: number) => {
    // Google Colors Palette
    const colors = ["#EA4335", "#FBBC04", "#4285F4", "#34A853", "#FACC15"];
    return colors[index % colors.length];
  };

  // 1. Initialize Years (Run once)
  useEffect(() => {
    const uniqueYears = Array.from(new Set(eventsData.map((e) => e.year))).sort().reverse();
    setYears(uniqueYears);
    if (uniqueYears.length > 0) setSelectedYear(uniqueYears[0]);
  }, []);

  // 2. Filter Events INSTANTLY (No loading delay)
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => event.year === selectedYear);
  }, [selectedYear]);

  return (
    <>
      <main className="relative min-h-screen bg-[#0a0a0a] text-white">
        <div className="relative z-10">

          {/* --- HEADER --- */}
          <div className="relative w-full pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 flex flex-col items-center justify-center z-10">
            
            {/* Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[200px] bg-gradient-to-r from-[#4285F4]/10 via-[#EA4335]/10 to-[#34A853]/10 blur-[80px] rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Title with Developer Brackets */}
              <div className="relative group">
                <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8">
                  <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 opacity-40 font-mono select-none">&lt;</span>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Events
                  </h1>
                  <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-600 opacity-40 font-mono select-none">/&gt;</span>
                </div>
                
                {/* Decorative Underline Beam */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-[1px] mt-4 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
                />
              </div>

              {/* Tagline */}
              <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-medium px-4 text-center">
                Learn, Connect, and Grow. Join our upcoming
                <span className="text-[#4285F4] mx-1">workshops</span>,
                <span className="text-[#EA4335] mx-1">hackathons</span>, and
                <span className="text-[#FBBC04] mx-1">tech talks</span>.
              </p>

              {/* Google Dots Decoration */}
              <div className="mt-8 flex gap-4">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="w-2.5 h-2.5 rounded-full bg-[#FBBC04]" />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
              </div>
            </motion.div>
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 pb-12 sm:pb-20 pt-2 sm:pt-4">
            <div className="flex flex-col gap-6 sm:gap-10">

              {/* --- HORIZONTAL YEAR SELECTOR (Static / Not Floating) --- */}
              {/* Removed sticky, top, z-index, and backdrop blur */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-hide gap-2 px-2 snap-x min-w-max sm:min-w-0">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      // EXACT STYLE PRESERVED
                      className={`text-left px-4 sm:px-5.5 py-2 rounded-xl transition-colors duration-200 whitespace-nowrap snap-center text-sm sm:text-base ${
                        selectedYear === year
                          ? "bg-gray-300 dark:bg-neutral-600 font-bold text-black dark:text-white"
                          : "text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- GRID OF SCIFI CARDS --- */}
              <div className="w-full min-h-[40vh] sm:min-h-[50vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedYear}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-10"
                  >
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="w-full mx-auto"
                        >
                          <Link href={`/events/${event.id}`} passHref legacyBehavior>
                            <a tabIndex={0} aria-label={`View details for ${event.title}`}> 
                              <SciFiCard
                                title={event.title}
                                bgImageSrc={event.image}
                                themeColor={getThemeColor(index)}
                              />
                            </a>
                          </Link>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full py-16 sm:py-32 flex flex-col items-center justify-center text-gray-500 border border-dashed border-gray-800 rounded-2xl sm:rounded-3xl bg-gray-900/20 mx-2">
                        <p className="font-mono text-sm sm:text-lg text-center px-4">NO SIGNAL DETECTED FOR {selectedYear}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="min-h-[60vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-10 py-8 sm:py-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-6 sm:mb-10">Event Highlights</h2>
                <Carousel images={photos} />
              </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}