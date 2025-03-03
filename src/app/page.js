import Image from "next/image";
import Navbar from "./components/nav/Navbar";
import { HeroSection } from "./components/hero/HeroSection";
import MusicSection from "./components/music/MusicSection";
import VideoSection from "./components/video/VideoSection";
import TourDates from "./components/dates/TourDates";
import Footer from "./components/footer/Footer";
import EmailSection from "./components/footer/EmailSection";

// Definindo os metadados como um objeto exportado
export const metadata = {
  description: "Eletronic music producer and DJ", // Descrição para SEO
  openGraph: {
    title: "WELKER", // Título para SEO
    images: [
      "./images/herobg.png" // URL da imagem para SEO
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
      <div className="container mx-auto mt-24 px-12 py-4">
      <EmailSection />
      </div>
      <Footer />
    </main>
  );
}