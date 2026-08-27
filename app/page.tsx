import { HeroSection } from "./(others)/Homepage/hero-section";
import { ServicesSection } from "./(others)/Homepage/services-section";
import { WhyChooseUs } from "./(others)/Homepage/why-choose-us";
import { TopAstrologers } from "./(others)/Homepage/top-astrologers";
import { HowItWorks } from "./(others)/Homepage/how-it-works";
import { LiveDarshanSection } from "./(others)/Homepage/live-darshan-section";
import { Footer } from "./(others)/Homepage/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Screen 1: Hero Section */}
      <HeroSection />

      {/* Screen 2: All Your Spiritual Needs & Trust Metrics Banner */}
      <ServicesSection />

      {/* Screen 3: Why Thousands Trust Our Astrology Platform */}
      <WhyChooseUs />

      {/* Screen 4: Consult Our Expert Astrologers */}
      <TopAstrologers />

      {/* Screen 5: Simple Steps to Get Divine Guidance */}
      <HowItWorks />

      {/* Screen 6: Witness the Divine in Real Time (Live Darshan) */}
      <LiveDarshanSection />

      {/* Screen 7: Footer */}
      <Footer />
    </main>
  );
}




