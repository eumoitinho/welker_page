import Image from "next/image";
import Navbar from "./components/nav/Navbar";
import { HeroSection } from "./components/HeroSection";
import MusicSection from "./components/music/MusicSection";
import VideoSection from "./components/video/VideoSection";
import TourDates from "./components/dates/TourDates";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <MusicSection />
      <VideoSection />
      <TourDates />
      <Footer />
    </main>
  );
}