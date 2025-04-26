"use client"

import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import InstagramFeed from "./social/InstagramFeed"

export default function SocialSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (inView && sectionRef.current) {
      sectionRef.current.classList.add("animate-fade-in-up")
    }
  }, [inView])

  return (
    <section
      id="social"
      ref={(el) => {
        // @ts-ignore - combining refs
        ref(el)
        sectionRef.current = el
      }}
      className="py-20 bg-gradient-to-b from-[#6e1212]/30 to-black opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase">Social Media</h2>

        <div className="social-content">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Latest from Instagram</h3>
            <InstagramFeed username="welkermusic" limit={6} />
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://instagram.com/welkermusic"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg uppercase transition-all duration-300 hover:bg-white hover:text-black inline-block"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
