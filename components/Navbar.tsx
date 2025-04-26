"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "HOME", href: "#home" },
  { name: "MUSIC", href: "#music" },
  { name: "VIDEOS", href: "#videos" },
  { name: "DATES", href: "#dates" },
  { name: "SOCIAL", href: "#social" },
  { name: "ABOUT", href: "#about" },
  { name: "CONTACT", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="z-10">
          <Link href="#home">
            <img src="/images/wtype.svg" alt="WELKER Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-[#892e2e] transition-colors duration-300 text-lg font-medium"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#music"
            className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black"
          >
            LISTEN NOW
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-10 text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-40">
            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-[#892e2e] transition-colors duration-300 text-2xl font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#music"
                className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-semibold text-xl transition-all duration-300 hover:bg-white hover:text-black mt-4"
                onClick={() => setIsOpen(false)}
              >
                LISTEN NOW
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
