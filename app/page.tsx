
import Footer from "./components/footer";
import { BaseHeroSection } from "./components/home/sections/hero-section";
import { AboutScrollSection } from "./components/about/about-scroll-section";
import { TeamsSection } from "./components/teams/teams-section";

export default function Home() {
  return (
    <div className="relative">

      <main className="flex flex-col min-h-screen">
        <BaseHeroSection description="Empowering Developers, Elevating Innovation at GDG NITH Chapter." />
        <AboutScrollSection />
        <TeamsSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
