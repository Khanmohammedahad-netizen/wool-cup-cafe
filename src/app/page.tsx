import HeroSection from "@/components/sections/HeroSection";
import BrandStory from "@/components/sections/BrandStory";
import SignatureDrinks from "@/components/sections/SignatureDrinks";
import HorizontalScroll from "@/components/sections/HorizontalScroll";
import AmbienceSection from "@/components/sections/AmbienceSection";
import Marquee from "@/components/sections/Marquee";
import InstagramFeed from "@/components/sections/InstagramFeed";
import VisitCTA from "@/components/sections/VisitCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <BrandStory />
      <SignatureDrinks />
      <HorizontalScroll />
      <AmbienceSection />
      <Marquee />
      <InstagramFeed />
      <VisitCTA />
      <Footer />
    </div>
  );
}
