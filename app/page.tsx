
import Footer from "./components/footer";
import SectionOne from "./components/home/sections/section-one";
import Navbar from "./components/navbar/navbar";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <SectionOne />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
