import Image from "next/image";
import Navbar from "./components/nav/Navbar";
import { HeroSection } from "./components/HeroSection";
import MusicSection from "./components/music/MusicSection";
import VideoSection from "./components/video/VideoSection";
import TourDates from "./components/dates/TourDates";
import Footer from "./components/footer/Footer";

// Definindo os metadados como um objeto exportado
export const metadata = {
  description: "Eletronic music producer and DJ", // Descrição para SEO
  openGraph: {
    title: "WELKER", // Título para SEO
    images: [
      "https://drive.google.com/file/d/1QrRhDw4g0GEc6q-HEGVKbB1hCbyBoy0F/view?usp=drive_link" // URL da imagem para SEO
    ]
  }
};

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