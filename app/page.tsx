
import Footer from "./components/footer";
import SectionOne from "./components/home/sections/section-one";
import { AboutScrollSection } from "./components/about/about-scroll-section";

export default function Home() {
  return (
    <div>
      <main>
        <SectionOne />
        <AboutScrollSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
