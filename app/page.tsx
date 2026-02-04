

import Footer from "./components/footer";
import { BaseHeroSection } from "./components/home/sections/hero-section";
import PromoBanner from "./components/home/sections/promo-banner";
import { AboutScrollSection } from "./components/about/about-scroll-section";
import { TeamsSection } from "./components/teams/teams-section";
import EventsSection from "./components/home/sections/EventsSection";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative">
      <BaseHeroSection description="Empowering Developers, Elevating Innovation at GDG NITH Chapter." />
      <PromoBanner />
      <AboutScrollSection />
      <EventsSection />
      <TeamsSection />
      <Footer />


    </div>
  );
}
