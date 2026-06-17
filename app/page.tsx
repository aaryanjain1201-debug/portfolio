import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Showreel } from "./components/showreel";
import { VideoPortfolio } from "./components/video-portfolio";
import { Projects } from "./components/projects";
import { Services } from "./components/services";
import { Skills } from "./components/skills";
import { Stats } from "./components/stats";
import { WhyChooseMe } from "./components/why-choose-me";
import { About } from "./components/about";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { ParticleBackground } from "./components/particles";
import { ScrollProgress } from "./components/scroll-progress";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Showreel />
        <Stats />
        <Projects />
        <VideoPortfolio />
        <Services />
        <Skills />
        <WhyChooseMe />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
