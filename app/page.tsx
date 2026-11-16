import About from "@/components/About";
import Contact from "@/components/Contact";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import { ReadingProgress } from "@/components/ui";

export default function Home() {
  return (
    <MotionProvider>
      <ReadingProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <ExperienceTimeline />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
