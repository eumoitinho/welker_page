"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fade in animation for content
    if (contentRef.current) {
      contentRef.current.style.opacity = "1"
      contentRef.current.style.transform = "translateY(0)"
    }

    // Parallax effect on scroll
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY
        const sectionTop = sectionRef.current.offsetTop
        const translateY = (scrollY - sectionTop) * 0.3
        sectionRef.current.style.backgroundPositionY = `${translateY}px`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/herobg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6e1212]/70 to-black/90"></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 opacity-0 transform translate-y-10 transition-all duration-1000"
      >
        <p className="text-xl font-medium md:text-2xl mb-10 max-w-2xl mx-auto">NEW MUSIC OUT NOW</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#music"
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg uppercase transition-all duration-300 hover:bg-white hover:text-black"
          >
            STREAM NOW
          </Link>
          <Link
            href="#dates"
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg uppercase transition-all duration-300 hover:bg-white hover:text-black"
          >
            TOUR DATES
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
