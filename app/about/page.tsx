import Footer from "../components/footer";
import { Navbar } from "../components/navbar/navbar";
import { NeuralBackground } from "../components/NeuralBackground-Blue";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <NeuralBackground />
      <main className="min-h-screen">
        About us page
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}