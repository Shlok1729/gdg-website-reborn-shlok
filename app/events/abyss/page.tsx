'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useInView } from "motion/react";
import localFont from 'next/font/local';
import TiltedCard from './TiltedCard';

// --- Font Configuration ---
const geizer = localFont({
  src: './fonts/Geizer.otf', 
  display: 'swap',
  variable: '--font-geizer',
});

// --- Types ---
type Suit = 'spades' | 'clubs' | 'diamonds' | 'hearts';

interface Game {
  id: number;
  title: string;
  suit: Suit;
  rank: string;
  difficulty: string;
  description: string;
  gameplay: string;
  twist: string;
  rules: string[];
  gameOver: string;
  image: string;
}

// --- Data: The 8 Games (Detailed) ---
const games: Game[] = [
  {
    id: 1,
    title: "Algo Wars",
    suit: "diamonds",
    rank: "K",
    difficulty: "Intellect",
    description: "A brutal test of optimization and logic. Teams are isolated in soundproof pods with a single terminal. The air supply in the pod is linked to the efficiency of your code—inefficient algorithms consume oxygen faster than it can be replenished.",
    gameplay: "Teams receive a problem statement every 15 minutes. You must write, compile, and submit code that passes 100 hidden test cases. You are not just coding for correctness; you are coding for memory and time efficiency. The server rejects any solution slower than the current leading submission.",
    twist: "Infinite loops drain real oxygen from the room. Optimize or suffocate.",
    rules: [
      "Solve 3 algorithmic challenges of increasing difficulty.",
      "Time complexity must be strictly O(n) or better.",
      "Last team to submit a passing solution for each round is eliminated.",
      "No external libraries or internet access allowed.",
    ],
    gameOver: "Runtime Error (Asphyxiation)",
    image: "https://i.postimg.cc/NFk82F0r/algo-mob.jpg"
  },
  {
    id: 2,
    title: "Psycho Pool",
    suit: "hearts",
    rank: "J",
    difficulty: "Psychological",
    description: "A competitive social experiment where you don't play against the game—you play against the crowd. Participants must navigate three phases of psychological elimination by predicting collective choices. It is a test of herd mentality versus individual intuition. Can you predict what everyone else is thinking before they do?",
    gameplay: "The game operates in three distinct phases. Phase 1 (Survival): You must avoid choosing the least selected option. Uniqueness is fatal. Phase 2 (Balance): You must avoid both the most popular AND the least popular options. You must survive in the 'average'. Phase 3 (The Showdown): The top players compete against the Audience. The spectators vote to 'kill' specific answers. If the crowd predicts your choice, you are eliminated.",
    twist: "In the final round, the Audience is the executioner. If they successfully predict the finalists' moves, the game ends in an Audience Victory and no player wins.",
    rules: [
      "Phase 1: Do NOT pick the least popular answer. (Minority gets eliminated).",
      "Phase 2: Do NOT pick the Most OR Least popular answer. (Extremes get eliminated).",
      "Phase 3: The Audience votes to ban an option. If you picked it, you are out.",
      "Absolute silence is mandatory. No discussion allowed.",
      "If the Audience eliminates all players, the House wins.",
    ],
    gameOver: "Rejected (Social Exile)",
    image: "https://i.postimg.cc/13MZyrrS/Gemini-Generated-Image-3x7q1a3x7q1a3x7q.png"
  },
  {
    id: 3,
    title: "Club Quiz",
    suit: "clubs",
    rank: "3",
    difficulty: "Teamwork",
    description: "A deceptive trivia gauntlet where knowledge is secondary to consensus. Your team stands on a platform divided into four quadrants. With every wrong answer, one quadrant drops into the abyss.",
    gameplay: "A question is projected on the wall. The team has 10 seconds to deliberate. You must verbally agree on an answer and press the corresponding button together. If even one member presses a different button, the answer is counted as wrong regardless of correctness.",
    twist: "You can steal points from other teams by hitting a 'Betray' buzzer, but if you are caught by the sensors, your score resets to zero.",
    rules: [
      "5 rounds of rapid-fire trivia regarding club history and logic.",
      "Teams of 4 must answer unanimously (all buttons pressed within 0.5s).",
      "Wrong answers reduce the available floor space by 25%.",
      "Absolute silence is mandatory between questions.",
    ],
    gameOver: "Elimination (The Drop)",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=400&fit=crop"
  },
 {
    id: 4,
    title: "Escape Room",
    suit: "spades",
    rank: "5",
    difficulty: "Physical / Logic",
    description: "Escape Rooms  pushes you into the world of hidden clues, secrets,codes and mind bending challenges where every second matters. Players must think fast, work together, and trust their instincts to break free before time runs out. It’s a race against the clock, a test of teamwork, and an experience that turns ordinary spaces into unforgettable challenges.",
    gameplay: "The game will be conducted in two rounds. In Round 1, teams must complete two different tracks with multiple levels, moving across the old LH building under the guidance of volunteers. Each team must finish the first track within the given time limit to qualify for the second track, and after completing both, only the teams with the best overall time will advance. In Round 2, the qualified teams will face a final challenge that tests their speed, coordination, and problem-solving skills, and the team that completes the task in the shortest time will be declared the winner.",
    twist: "The clock decides your fate.Hints can save you—but they demand a sacrifice,Choose wisely, or lose one of your own.",
    rules: [
      "ABSOLUTE BAN: No mobile phones, internet, or outside help. Violation = Immediate Disqualification.",
      "Zero Tolerance: Cheating or misbehavior results in instant team elimination.",
      "Data Protocol: Codes derived from obstacles must be written on the General Instructions Sheet.",
      "Penalty Option: To ask for help, you must accept a 60s penalty OR eject one member.",
    ],
    gameOver: "Disqualified (Purged)",
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Market Wars",
    suit: "diamonds",
    rank: "10",
    difficulty: "Strategy",
    description: "A ruthless economic simulation set in a volatile, closed market. You start with credits and a portfolio of assets. Your goal is not just to be rich, but to be the *only* one solvent.",
    gameplay: "A central holographic ticker displays real-time prices. You use a tablet to buy and sell. Hidden throughout the arena are 'Insider Info' cards that predict the next crash. You can trade these cards with other players, or use them to short the market before a catastrophe.",
    twist: "Insider trading is allowed, but if the 'SEC' AI bot scans you holding an Info Card, your assets are frozen instantly.",
    rules: [
      "Start with 1000 credits. Buy low, sell high.",
      "Maintain a positive balance after the inevitable Market Crash event.",
      "Trading stops immediately when the bell rings.",
      "Bankruptcy results in immediate removal.",
    ],
    gameOver: "Bankruptcy (Liquidated)",
    image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Black Box",
    suit: "spades",
    rank: "8",
    difficulty: "Mystery",
    description: "A giant obsidian cube sits in the center of the room. It has one input slot and one output display. You must determine the algorithm inside the box to stop the countdown.",
    gameplay: "Teams take turns feeding the box a set of items or numbers. The box produces a result (a color, a sound, or a number). You must analyze the input-output pairs to deduce the function $f(x)$. Once you think you know the logic, you must input the 'Master Key' to shut it down.",
    twist: "The logic changes every time a wrong answer is submitted, becoming more complex.",
    rules: [
      "Test inputs to observe outputs (Max 5 tests).",
      "Deduce the internal function (e.g., Prime Number shift, Fibonacci mapping).",
      "Submit the final key code.",
      "Only 3 final attempts allowed before lockout.",
    ],
    gameOver: "System Failure (Explosion)",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    title: "Simcity",
    suit: "clubs",
    rank: "Q",
    difficulty: "Management",
    description: "A high-stakes city management simulation on a massive touch table. You are the ruling council of a city facing an apocalypse. You must make moral choices that determine who lives and who dies.",
    gameplay: "Players are assigned roles: Mayor, General, Engineer, Doctor. You have limited energy and food. A disaster strikes every round (pandemic, earthquake, riots). You must allocate resources. Powering the hospital might save lives but leaves the walls undefended against raiders.",
    twist: "Natural disasters are triggered by the progress of the opposing team (playing as 'Nature').",
    rules: [
      "Manage power, water, and food levels.",
      "Keep population happiness above 50% to prevent revolution.",
      "Survive 3 waves of escalating disasters.",
      "Rebuild infrastructure faster than it is destroyed.",
    ],
    gameOver: "Total Collapse (Anarchy)",
    image: "https://i.postimg.cc/3rFbvJVP/simcity.jpg"
  },
  {
    id: 8,
    title: "Buckshot Roulette",
    suit: "hearts",
    rank: "A",
    difficulty: "Probability / Malice",
    description: "A high-stakes game of risk, bluffing, and survival. Players take turns drawing hidden cards and choosing who suffers the consequences — themselves or someone else. Every choice could cost a life… or earn another chance. Ability cards introduce control, deception, and strategy. Only one player walks out alive each round.",
    gameplay: "Each player starts with 3 lives. A deck contains a hidden mix of Static and Charged cards. On your turn, you must choose who to use the top card on before it is revealed. Players receive ability cards at the start of each cycle and may hold a maximum of 2. Rounds continue until only one player remains alive. Each team sends one player per round, and the team with the most surviving players at the end wins.",
    twist: "Targeting yourself is a gamble — it might give you another turn. Targeting others might save you… or make you a threat.",
    rules: [
      "Start with 3 Lives. Deck contains hidden Static & Charged cards.",
      "Must choose target (Self or Opponent) before revealing card.",
      "Charged Card: Target loses 1 Life.",
      "Static Card on Self: Play again. Static on Opponent: Turn passes.",
      "Abilities: Cryostat (Freeze), Flip (Switch), Radar (Peek), Hover (Discard).",
      "Max 2 Ability Cards held at any time.",
    ],
    gameOver: "Zero Lives (Discharged)",
    image: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?w=400&h=400&fit=crop"
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Setting target to Feb 6, 2026 
    const targetDate = new Date('2026-02-06T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = ({ days, hours, minutes, seconds }: { days: number, hours: number, minutes: number, seconds: number }) => {
    return `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
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
        className="relative w-full max-w-2xl border border-neutral-700 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Background Image Layer --- */}
        <div className="absolute inset-0 z-0">
            {/* The Image */}
            <img 
                src={game.image} 
                alt="" 
                className="w-full h-full object-cover opacity-60"
            />
            {/* The Blur/Darken Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        </div>

        {/* --- Content Layer (Sitting on top of background) --- */}
        <div className="relative z-10">
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
                <h3 className="text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest border-b border-neutral-800 pb-1">Game Description</h3>
                <p className="text-lg leading-relaxed">{game.description}</p>
                </div>

                <div>
                <h3 className="text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest border-b border-neutral-800 pb-1">Operational Procedure</h3>
                <p className="text-md leading-relaxed text-gray-400">{game.gameplay}</p>
                </div>

                <div className="p-5 bg-neutral-950 border-l-4 border-red-600 rounded-r">
                <h3 className="text-xs uppercase text-red-500 mb-2 font-bold tracking-widest">Crucial Detail</h3>
                <p className="italic text-gray-400">{game.twist}</p>
                </div>

                <div>
                <h3 className="text-xs uppercase text-gray-500 mb-3 font-bold tracking-widest border-b border-neutral-800 pb-1">Rules</h3>
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
                </div>
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

  const handleRegister = () => {
    window.location.href = "https://example.com";
  };

  return (
    <div 
      className="min-h-screen bg-[#010101] text-gray-200 selection:bg-red-900 selection:text-white overflow-x-hidden"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <Head>
        <title>ABYSS | Borderland</title>
      </Head>

      {/* Sticky Top Bar (Appears on Scroll) */}
      <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 flex justify-center py-4 pointer-events-none ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <Countdown />
      </div>

      {/* HERO SECTION - UPDATED FOR MOBILE AND LAPTOP RESPONSIVENESS */}
      <header className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
           <img 
             src="/abyss.png" 
             alt="Post-apocalyptic city" 
             className="w-full h-full object-cover object-center"
           />
           {/* Text Readability Overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-black/40 to-black/60" />
           {/* Texture Overlay */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
           
           {/* SEAMLESS BLEND OVERLAY */}
           <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#010101] via-[#010101]/80 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          
          <div className={`${scrolled ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 mb-12`}>
             <Countdown />
          </div>
          
          {/* Main Title */}
          <h1 className="flex items-center justify-center tracking-tighter leading-none select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            <span className={`${geizer.className} text-[8rem] md:text-[12rem] lg:text-[16rem] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500`}>
                AB
            </span>
            <span className={`${geizer.className} text-[8rem] md:text-[12rem] lg:text-[16rem] text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]`}>
                Y
            </span>
            <span className={`${geizer.className} text-[8rem] md:text-[12rem] lg:text-[16rem] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500`}>
                SS
            </span>
          </h1>
          
          {/* Tagline */}
          <p className="-mt-2 md:-mt-6 lg:-mt-8 text-sm md:text-base tracking-[0.3em] md:tracking-[0.5em] text-gray-100 font-bold uppercase drop-shadow-lg py-4 px-8 opacity-80">
            THE DEATH STARES BACK
          </p>

          {/* Register Button */}
          <button 
            onClick={handleRegister}
            className="mt-8 px-12 py-4 border-2 border-red-600 text-red-500 font-bold text-sm uppercase tracking-[0.25em] bg-black/40 backdrop-blur-md shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 hover:bg-red-600 hover:text-black hover:shadow-[0_0_50px_rgba(220,38,38,0.8)] hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-4 duration-1000"
          >
            Register Now
          </button>
          
        </div>
      </header>

      {/* EVENTS GRID SECTION */}
      <main id="games-grid" className="relative z-10 py-20 px-3 md:px-8 lg:px-16 bg-[#010101]">
        
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16 text-center"
        >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-widest">
                <span className="text-red-600">///</span> Active Games
            </h2>
        </motion.div>

        {/* OPTIMIZATION: 
           - grid-cols-2 (Mobile) -> lg:grid-cols-4 (Desktop)
           - gap-3 (Mobile) -> md:gap-8 (Desktop)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-7xl mx-auto">
          {games.map((game, index) => (
            <AnimatedCardWrapper key={game.id} index={index}>
                {/* OPTIMIZATION: 
                   - CSS Variable for Responsive Height: Mobile: 360px | Desktop: 400px
                   - Passed to TiltedCard props via var()
                */}
                <div className="w-full [--card-height:350px] md:[--card-height:390px]">
                    <TiltedCard
                        imageSrc={game.image}
                        altText={game.title}
                        captionText={game.title}
                        containerHeight="var(--card-height)"
                        containerWidth="100%"
                        imageHeight="var(--card-height)"
                        imageWidth="100%"
                        rotateAmplitude={12}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent
                        onClick={() => setSelectedGame(game)}
                        overlayContent={
                            <div 
                                className="w-full p-3 md:p-4 rounded-b-[15px] font-sans"
                                style={{
                                    background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, transparent 100%)",
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="scale-75 origin-left md:scale-100">
                                        <SuitIcon suit={game.suit} />
                                    </div>
                                    {/* Responsive Text Size: sm on mobile, xl on desktop */}
                                    <h3 className="text-white font-bold text-sm md:text-xl uppercase tracking-wider truncate" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                                        {game.title}
                                    </h3>
                                </div>
                                <div className="mt-1 md:mt-2 flex justify-between items-end border-t border-white/20 pt-2">
                                    {/* Responsive Text Size: smaller font for difficulty and rank */}
                                    <span className="text-white/60 text-[10px] md:text-xs font-mono uppercase truncate max-w-[70%]">
                                        {game.difficulty}
                                    </span>
                                    <span className="text-red-500 font-bold text-sm md:text-lg font-mono">
                                        {game.rank}
                                    </span>
                                </div>
                            </div>
                        }
                    />
                </div>
            </AnimatedCardWrapper>
          ))}
        </div>
      </main>

      <footer className="py-20 text-center text-neutral-600 text-xs border-t border-neutral-900 bg-black">
        <p className="mb-4 text-red-900/50 tracking-[1em]">GAME OVER</p>
        <p>© 2026 NIT HAMIRPUR CHAPTER - GDG LUDHIANA</p>
      </footer>

      {/* Modal Overlay */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
}