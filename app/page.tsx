import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Showreel } from "./components/showreel";
import { VideoPortfolio } from "./components/video-portfolio";
import { Projects } from "./components/projects";
import { Services } from "./components/services";
import { Pricing } from "./components/pricing";
import { CaseStudies } from "./components/case-studies";
import { Skills } from "./components/skills";
import { WhyChooseMe } from "./components/why-choose-me";
import { About } from "./components/about";
import { Stats } from "./components/stats";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { ParticleBackground } from "./components/particles";
import { ScrollProgress } from "./components/scroll-progress";
import { LoadingScreen } from "./components/loading-screen";
import { MagneticCursor } from "./components/magnetic-cursor";
import { Analytics } from "./components/analytics";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <MagneticCursor />
      <ParticleBackground />
      <ScrollProgress />
      <Analytics />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Showreel />
        <Projects />
        <VideoPortfolio />
        <Services />
        <Pricing />
        <CaseStudies />
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
