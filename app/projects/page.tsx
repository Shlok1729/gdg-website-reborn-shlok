"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Components
import SciFiProjectCard from "../components/SciFiCard"; 
import { NeuralBackground } from "../components/NeuralBackground-Blue";

// Strict Google Color Sequence
const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

const MOCK_PROJECTS = [
  { _id: "1", title: "CRAWLER 1", thumbnail: "/ai.png", description: "SYSTEM_LOG: Artificial Intelligence subsystem initialized. Monitoring high-frequency data streams for pattern recognition." },
  { _id: "2", title: "CRAWLER 2", thumbnail: "/cloud.png", description: "GLOBAL_CLOUD_SUMMIT: Distributed computing architecture deployed. 2026 Summit protocols active." },
  { _id: "3", title: "CRAWLER 3", thumbnail: "/blockchain.png", description: "BLOCKCHAIN_CORE: Decentralized ledger verification active. Secure node-to-node encryption established." },
  { _id: "4", title: "CRAWLER 4", thumbnail: "/portal.png", description: "GATEWAY_ACTIVE: User interface portal for NIT Hamirpur developers. Repository access granted." },
  { _id: "5", title: "CRAWLER 5", thumbnail: "/market.png", description: "MARKET_WARS: Real-time scarcity market simulator built for GDG tech fests." },
];
// add pictures here 
const MOCK_DOMAINS = [
  { domain: "Web Development", img: "/web-dev.png", side: -200, color: "border-blue-500", desc: "Crafting high-performance web architectures using MERN and Next.js." },
  { domain: "App Development", img: "/app-dev.png", side: 200, color: "border-red-500", desc: "Native and cross-platform solutions using Flutter and Firebase." },
  { domain: "AI / Machine Learning", img: "/ai-robot.png", side: -200, color: "border-yellow-500", desc: "Neural networks and predictive models using TensorFlow and PyTorch." },
  { domain: "Blockchain", img: "/blockchain-tech.png", side: 200, color: "border-green-500", desc: "Decentralized applications and secure smart contracts on Web3." },
  { domain: "UI / UX Design", img: "/uiux.png", side: -200, color: "border-blue-500", desc: "Immersive interface design with Figma and glassmorphic aesthetics." },
  { domain: "Hardware & ECE", img: "/hardware.png", side: 200, color: "border-red-500", desc: "Core VLSI design, PCB fabrication, and embedded IoT systems." }
];

function ProjectsContent() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      if (!isExpanded) {
        setActiveIndex((prev) => (prev + 1) % MOCK_PROJECTS.length);
      }
    }, 3500); 
    return () => clearInterval(interval);
  }, [isExpanded]);

  if (!mounted) return null;

  const current = MOCK_PROJECTS[activeIndex];
  const currentColor = GOOGLE_COLORS[activeIndex % 4];

  return (
    <div className="relative bg-black min-h-screen text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. FIXED NEURAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <NeuralBackground />
      </div>

      <div className="relative z-10 w-full">
        
        {/* CAROUSEL SECTION */}
        <main className="w-full pt-20 flex flex-col items-center">
          <header className="text-center mb-0 px-0">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-blue-600 text-6xl font-bold">{"<"}</span>
              <h1 className="text-7xl font-bold text-white tracking-tighter uppercase">Projects</h1>
              <span className="text-green-600 text-6xl font-bold">{"/"}</span>
              <span className="text-green-600 text-6xl font-bold">{">"}</span>
            </div>
            <p className="text-zinc-300 text-lg max-w-2x mx-auto leading-relaxed font-semibold">
              Learn, Connect, and Grow. Join our upcoming <span className="text-blue-500">workshops</span>, 
              <span className="text-red-500"> hackathons</span>, and <span className="text-yellow-500">tech talks</span>.
            </p>
          </header>

          <div className="relative w-full flex items-center justify-center h-[600px] mt-5">
            <button onClick={() => setActiveIndex((prev) => (prev - 1 + MOCK_PROJECTS.length) % MOCK_PROJECTS.length)}
              className="absolute left-10 z-50 p-6 border border-zinc-800 rounded-full bg-black/40 backdrop-blur-md hover:bg-zinc-900 transition-all">
              <ChevronLeft className="w-10 h-10 text-zinc-400" />
            </button>

            <div className="flex items-center justify-center w-full relative h-full">
              {MOCK_PROJECTS.map((project, index) => {
                let pos = index - activeIndex;
                if (pos > MOCK_PROJECTS.length / 2) pos -= MOCK_PROJECTS.length;
                if (pos < -MOCK_PROJECTS.length / 2) pos += MOCK_PROJECTS.length;
                const isCenter = pos === 0;
                const isVisible = Math.abs(pos) <= 1;

                return (
                  <motion.div key={project._id} initial={false}
                    animate={{ scale: isCenter ? 1.45 : 0.65, x: pos * 600, zIndex: isCenter ? 40 : 10, opacity: isVisible ? (isCenter ? 1 : 0.25) : 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute cursor-pointer" onClick={() => isCenter ? setIsExpanded(true) : setActiveIndex(index)}>
                    <div className="w-[100px] md:w-[550px]">
                      <SciFiProjectCard project={project} borderColor={GOOGLE_COLORS[index % 4]} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button onClick={() => setActiveIndex((prev) => (prev + 1) % MOCK_PROJECTS.length)}
              className="absolute right-10 z-50 p-6 border border-zinc-800 rounded-full bg-black/40 backdrop-blur-md hover:bg-zinc-900 transition-all">
              <ChevronRight className="w-10 h-10 text-zinc-400" />
            </button>
          </div>
        </main>

        {/* 2 COLUMN DOMAIN HUB: SMALLER CARDS + FLOATING ENTRANCE */}
        <section className="relative w-full py-32 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            <header className="space-y-4 text-center md:text-left">
              <h2 className="text-6xl font-black uppercase tracking-tighter italic">OUR Domains</h2>
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                 <span className="text-blue-500">  </span>
              </p>
            </header>

            {/* Grid Layout: 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
              {MOCK_DOMAINS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: item.side, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }} // Vanishes on scroll up
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col space-y-6 group"
                >
                  {/* Smaller Image Card */}
                  <div className="w-full aspect-video rounded-[35px] overflow-hidden relative shadow-2xl">
                    <img src={item.img} alt={item.domain} className="w-full h-full object-cover opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  </div>
                  
                  {/* Domain Info */}
                  <div className="space-y-3">
                    <span className={`text-[10px] font-mono ${item.color.replace('border-', 'text-')} tracking-[0.4em] uppercase`}>Sector_{i+1}</span>
                    <h3 className="text-4xl font-black uppercase tracking-tighter">{item.domain}</h3>
                    <p className="text-lg text-zinc-500 font-mono leading-relaxed uppercase tracking-tight">{item.desc}</p>
                    <motion.div whileInView={{ width: [0, 80] }} transition={{ duration: 1.2 }} className={`h-1 ${item.color.replace('border-', 'bg-')} opacity-50`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative bg-black/90 backdrop-blur-md border-t border-zinc-900 pt-16 pb-30 px-6 md:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Google Developer Student Club</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">A Google Developers program for university students to learn development skills.</p>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 font-mono">Quick Links</h3>
              <ul className="space-y-3 text-zinc-500 text-sm font-mono uppercase">
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Our Team</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 font-mono">Connect</h3>
              <ul className="space-y-3 text-zinc-500 text-sm font-mono uppercase">
                <li className="hover:text-white cursor-pointer transition-colors">Join Us</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(12px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-6" onClick={() => setIsExpanded(false)}>
            <motion.div initial={{ scale: 0.8, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.8, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }} className="w-[90vw] h-[80vh] flex overflow-hidden rounded-[40px] border border-white/10 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              <div className="w-1/2 h-full bg-zinc-950 flex items-center justify-center relative border-r border-white/5">
                <div className="scale-150 pointer-events-none">
                  <SciFiProjectCard project={current} borderColor={currentColor} />
                </div>
              </div>
              <div className="w-1/2 h-full bg-white/[0.03] backdrop-blur-[80px] p-20 flex flex-col justify-center relative">
                <button onClick={() => setIsExpanded(false)} className="absolute top-10 right-10 text-zinc-500 hover:text-white transition-all"><X className="w-10 h-10" /></button>
                <h2 className="text-7xl font-black uppercase mb-8 tracking-tighter" style={{ color: currentColor }}>{current.title}</h2>
                <div className="h-1 w-20 mb-8" style={{ backgroundColor: currentColor }} />
                <p className="text-2xl text-zinc-300 font-mono leading-relaxed uppercase">{current.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <ProjectsContent />
    </Suspense>
  );
}