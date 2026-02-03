"use client";


import Footer from "./components/footer";
import { BaseHeroSection } from "./components/home/sections/hero-section";
import { AboutScrollSection } from "./components/about/about-scroll-section";
import { TeamsSection } from "./components/teams/teams-section";
import EventsSection from "./components/home/sections/EventsSection";
import { useEffect, useState } from "react";
import RootLoading from "./components/RootLoading";

export default function Home() {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., 3 seconds)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <RootLoading />;
  return (
    <div className="relative">

      <main className="flex flex-col min-h-screen">
        <BaseHeroSection description="Empowering Developers, Elevating Innovation at GDG NITH Chapter." />
        <AboutScrollSection />
        <EventsSection />
        <TeamsSection />
        <Footer />
        
      </main>
      
    </div>
  );
}
