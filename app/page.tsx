"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import MusicSection from "../components/MusicSection"
import VideoSection from "../components/VideoSection"
import TourSection from "../components/TourSection"
import SocialSection from "../components/SocialSection"
import AboutSection from "../components/AboutSection"
import ContactSection from "../components/ContactSection"
import ShopSection from "../components/shop/ShopSection"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <main className="bg-black text-white">
      <Navbar />
      <HeroSection />
      <MusicSection />
      <VideoSection />
      <TourSection />
      {/* <SocialSection /> */}
      <ShopSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
