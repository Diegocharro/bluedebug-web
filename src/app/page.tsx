import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Pain from "@/components/sections/Pain";
import Services from "@/components/sections/Services";
import Method from "@/components/sections/Method";
import Calculator from "@/components/sections/Calculator";
import Work from "@/components/sections/Work";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Pain />
        <Services />
        <Method />
        <Calculator />
        <Work />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
