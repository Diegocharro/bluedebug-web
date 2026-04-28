import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Pain from "@/components/sections/Pain";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import Calculator from "@/components/sections/Calculator";
import Portfolio from "@/components/sections/Portfolio";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ScrollBug from "@/components/ScrollBug";
import BackgroundFX from "@/components/BackgroundFX";

export default function Home() {
  return (
    <>
      <BackgroundFX />
      <ScrollBug />
      <Navbar />
      {/* Wrapper con z-index > ladybug (z:2) para que el contenido tape a la mariquita */}
      <div style={{ position: "relative", zIndex: 3 }}>
        <main>
          <Hero />
          <TrustBar />
          <Pain />
          <Solution />
          <HowItWorks />
          <Calculator />
          <Portfolio />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
