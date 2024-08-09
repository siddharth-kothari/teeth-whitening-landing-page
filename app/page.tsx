import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import Introduction from "@/components/Introduction";
import Location from "@/components/Location";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Outro from "@/components/Outro";
import Work from "@/components/Work";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <Introduction />
      <Benefits />
      <Testimonials />
      <Work />
      <Outro />
      <Contact />
      <Location />
      <Footer />
    </section>
  );
}
