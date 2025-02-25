import Image from "next/image";
import Navbar from "./components/nav/Navbar";
import { HeroSection } from "./components/HeroSection";
import MusicSection from "./components/music/MusicSection";
import VideoSection from "./components/video/VideoSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <MusicSection />
      <VideoSection />
    </main>
  );
}