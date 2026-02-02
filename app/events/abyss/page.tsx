'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useInView } from "motion/react";
import TiltedCard from './TiltedCard'; // Adjust path if needed

// --- Types ---
type Suit = 'spades' | 'clubs' | 'diamonds' | 'hearts';

interface Game {
  id: number;
  title: string;
  suit: Suit;
  rank: string;
  difficulty: string;
  description: string;
  twist: string;
  rules: string[];
  gameOver: string;
  image: string; // Added image property
}

// --- Data: The 8 Games (Merged with Images) ---
const games: Game[] = [
  {
    id: 1,
    title: "The Oxygen Run",
    suit: "spades",
    rank: "3",
    difficulty: "Physical",
    description: "Sprint 5km through a tunnel filling with gas.",
    twist: "Checkpoints require a 30s breath-hold. Breathing triggers a lockdown.",
    rules: [
      "Players start at the tunnel entrance.",
      "Gas release begins at T-minus 0.",
      "You must reach the exit within 20 minutes.",
      "Checkpoints are located every 500m.",
    ],
    gameOver: "Asphyxiation",
    image: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Silent Orchestra",
    suit: "clubs",
    rank: "5",
    difficulty: "Teamwork",
    description: "Guide a robotic arm to defuse a bomb.",
    twist: "Speaking triggers the detonator. You can only tap rhythms.",
    rules: [
      "Team of 4 players required.",
      "Decibel sensors are active.",
      "Communication is limited to tapping surfaces.",
      "One mistake speeds up the timer.",
    ],
    gameOver: "Detonation",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Fibonacci Lock",
    suit: "diamonds",
    rank: "6",
    difficulty: "Intellect",
    description: "Solve the sequence to open the hatch before water rises.",
    twist: "Numbers are hidden in UV. Flashlight battery lasts 3 mins.",
    rules: [
      "Room fills with water at 1m/minute.",
      "Keypad locks for 30s after a wrong entry.",
      "The sequence changes every attempted entry.",
    ],
    gameOver: "Drowning",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Mirror of Truth",
    suit: "hearts",
    rank: "7",
    difficulty: "Psychological",
    description: "Two players. One exit. One bullet each.",
    twist: "Speakers whisper personalized secrets to induce paranoia.",
    rules: [
      "Only one player may leave the room alive.",
      "If neither shoots after 20 mins, the exit opens for both.",
      "Weapons are provided on the center table.",
    ],
    gameOver: "Betrayal",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Vertical Limit",
    suit: "spades",
    rank: "J",
    difficulty: "Physical (Hard)",
    description: "Climb falling scaffolding while being chased by a Tagger.",
    twist: "Scaffolding collapses section by section every 120s.",
    rules: [
      "Reach the roof to clear the game.",
      "The Tagger carries a firearm.",
      "Safety harnesses are not provided.",
    ],
    gameOver: "Falling",
    image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    title: "The Market",
    suit: "diamonds",
    rank: "10",
    difficulty: "Intellect (Hard)",
    description: "Trade credits for Life Vests. Panic raises prices.",
    twist: "Only 4 vests available. Shouting raises inflation.",
    rules: [
      "10 Players start with 100 Credits.",
      "Vest price fluctuates based on room noise levels.",
      "Trading ends when all vests are sold.",
    ],
    gameOver: "Bankruptcy",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    title: "Linked Fates",
    suit: "clubs",
    rank: "K",
    difficulty: "Teamwork (Hard)",
    description: "Two teams chained together over a void. Capture the flag.",
    twist: "If one falls, they drag the team down unless pulled up instantly.",
    rules: [
      "Teams are connected by a 5m steel chain.",
      "Capture the flag on the opposing platform.",
      "Cutting the chain results in immediate elimination.",
    ],
    gameOver: "The Void",
    image: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=400&fit=crop"
  },
  {
    id: 8,
    title: "Witch's Banquet",
    suit: "hearts",
    rank: "Q",
    difficulty: "Treachery",
    description: "Identify the 'Queen' at the dinner table.",
    twist: "The innocent win if the Queen eats the poisoned dish.",
    rules: [
      "6 Courses will be served.",
      "Identify the Witch (Mole) among the players.",
      "You must vote on who eats the final dish.",
    ],
    gameOver: "Poison",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400&h=400&fit=crop"
  },
];

// --- Helpers ---

const getSuitColor = (suit: Suit) => {
    switch (suit) {
        case "hearts": return "#DC2626"; // Red
        case "diamonds": return "#FBBC04"; // Gold/Yellow
        case "spades": return "#4285F4"; // Blue
        case "clubs": return "#34A853"; // Green
    }
};

const SuitIcon = ({ suit }: { suit: Suit }) => {
    const color = getSuitColor(suit);
    switch (suit) {
        case 'hearts': return <span style={{ color }} className="text-2xl">♥</span>;
        case 'diamonds': return <span style={{ color }} className="text-2xl">♦</span>;
        case 'spades': return <span style={{ color }} className="text-2xl">♠</span>;
        case 'clubs': return <span style={{ color }} className="text-2xl">♣</span>;
    }
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(10800);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="text-xl md:text-2xl text-red-500 tracking-widest animate-pulse border border-red-900/50 px-6 py-2 bg-black/80 backdrop-blur rounded inline-block shadow-[0_0_15px_rgba(255,0,0,0.3)] font-mono">
      VISA: {formatTime(timeLeft)}
    </div>
  );
};

// --- Animations ---
function AnimatedCardWrapper({ children, index }: { children: React.ReactNode; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex justify-center"
        >
            {children}
        </motion.div>
    );
}

// --- Modal Component ---
const GameModal = ({ game, onClose }: { game: Game; onClose: () => void }) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className={`h-2 w-full ${game.suit === 'hearts' || game.suit === 'diamonds' ? 'bg-red-600' : 'bg-cyan-500'}`} />
        
        <div className="p-8 max-h-[80vh] overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-6 mb-8">
            <div className="p-6 bg-black border border-neutral-800 rounded shadow-inner">
               <SuitIcon suit={game.suit} />
               <span className="block text-center font-bold mt-2 text-2xl text-white font-mono">{game.rank}</span>
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight uppercase" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{game.title}</h2>
              <span className="inline-block mt-2 px-3 py-1 bg-neutral-800 text-xs uppercase tracking-[0.2em] text-gray-400 rounded font-mono">
                {game.difficulty}
              </span>
            </div>
          </div>

          <div className="space-y-8 text-gray-300 font-sans">
            <div>
              <h3 className="text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest border-b border-neutral-800 pb-1">Mission Brief</h3>
              <p className="text-lg leading-relaxed">{game.description}</p>
            </div>

            <div className="p-5 bg-neutral-950 border-l-4 border-red-600 rounded-r">
              <h3 className="text-xs uppercase text-red-500 mb-2 font-bold tracking-widest">Crucial Detail</h3>
              <p className="italic text-gray-400">{game.twist}</p>
            </div>

            <div>
              <h3 className="text-xs uppercase text-gray-500 mb-3 font-bold tracking-widest border-b border-neutral-800 pb-1">Rules of Engagement</h3>
              <ul className="space-y-3">
                {game.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 font-mono">
                    <span className="text-neutral-600 mt-1">▶</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-neutral-800 mt-8 gap-4">
              <span className="text-xs uppercase text-red-600 tracking-wider font-mono">
                FATAL CONDITION: {game.gameOver}
              </span>
              <button className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-200 text-black font-black uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Accept Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function AbyssEventPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for sticky nav effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to the games grid
  const scrollToGames = () => {
    const grid = document.getElementById('games-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen bg-neutral-950 text-gray-200 selection:bg-red-900 selection:text-white overflow-x-hidden"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <Head>
        <title>ABYSS | Borderland</title>
      </Head>

      {/* Sticky Top Bar (Appears on Scroll) */}
      <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 flex justify-center py-4 pointer-events-none ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <Countdown />
      </div>

      {/* HERO SECTION - UNCHANGED */}
      <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden border-b border-neutral-900">
        
        <div className="absolute inset-0 z-0">
           <img 
             src="/abyss.png" 
             alt="Post-apocalyptic city" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          
          <div className={`${scrolled ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 mb-12`}>
             <Countdown />
          </div>
          
          <h1 className="flex items-center justify-center font-black tracking-tighter leading-none select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            <span className="text-[6rem] md:text-[10rem] lg:text-[14rem] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500">
                AB
            </span>
            <span className="text-[6rem] md:text-[10rem] lg:text-[14rem] text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                Y
            </span>
            <span className="text-[6rem] md:text-[10rem] lg:text-[14rem] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500">
                SS
            </span>
          </h1>
          
          <p className="mt-4 md:mt-8 text-xl md:text-xl lg:text-2xl tracking-[0.3em] md:tracking-[0.5em] text-gray-100 font-bold uppercase drop-shadow-lg py-4 px-8 ">
            THE DEATH STARES BACK
          </p>

          <button 
            onClick={scrollToGames}
            className="mt-12 px-10 py-4 border border-red-600/80 text-red-500 hover:bg-red-600 hover:text-black transition-all duration-300 uppercase tracking-[0.2em] font-bold text-sm bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] animate-in fade-in slide-in-from-bottom-4 duration-1000"
          >
            Register Now
          </button>
          
          <div className="absolute bottom-[-15vh] md:bottom-[-20vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70">
            <span className="text-xs uppercase tracking-widest text-gray-400">Join the Game</span>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </div>
      </header>

      {/* EVENTS GRID SECTION - UPDATED WITH TILTED CARDS */}
      <main id="games-grid" className="relative z-10 py-20 px-4 md:px-8 lg:px-16 bg-neutral-950">
        
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
        >
            <h2 className="text-3xl font-bold text-gray-400 uppercase tracking-widest">
                <span className="text-red-600">///</span> Active Games
            </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {games.map((game, index) => (
            <AnimatedCardWrapper key={game.id} index={index}>
                <TiltedCard
                    imageSrc={game.image}
                    altText={game.title}
                    captionText={game.title}
                    containerHeight="400px" // Slightly taller to accommodate content
                    containerWidth="100%"
                    imageHeight="400px"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={false} // Disabled default tooltip in favor of overlay
                    displayOverlayContent
                    onClick={() => setSelectedGame(game)} // Opens the modal
                    overlayContent={
                        <div 
                            className="w-full p-4 rounded-b-[15px] font-sans"
                            style={{
                                background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
                            }}
                        >
                            <div className="flex items-center gap-2">
                                {/* Using the suit char from suit string for visual, or use SuitIcon component */}
                                <SuitIcon suit={game.suit} />
                                <h3 className="text-white font-bold text-xl uppercase tracking-wider" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                                    {game.title}
                                </h3>
                            </div>
                            <div className="mt-2 flex justify-between items-end border-t border-white/20 pt-2">
                                <span className="text-white/60 text-xs font-mono uppercase">
                                    {game.difficulty}
                                </span>
                                <span className="text-red-500 font-bold text-lg font-mono">
                                    {game.rank}
                                </span>
                            </div>
                        </div>
                    }
                />
            </AnimatedCardWrapper>
          ))}
        </div>
      </main>

      <footer className="py-20 text-center text-neutral-600 text-xs border-t border-neutral-900 bg-black">
        <p className="mb-4 text-red-900/50 tracking-[1em]">GAME OVER</p>
        <p>© 2024 ABYSS PROTOCOL</p>
      </footer>

      {/* Modal Overlay */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
}