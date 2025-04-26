"use client"
import { useInView } from "react-intersection-observer"
import MusicGrid from "./music/MusicGrid"
import RelatedArtists from "./music/RelatedArtists"
import { useEffect, useRef } from "react"

export default function MusicSection() {
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
      id="music"
      ref={(el) => {
        // @ts-ignore - combining refs
        ref(el)
        sectionRef.current = el
      }}
      className="py-20 bg-gradient-to-b from-black to-[#6e1212]/30 opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase">Music</h2>
        {/* <ArtistInfo /> */}
        <MusicGrid inView={inView} />
        <RelatedArtists inView={inView} />
      </div>
    </section>
  )
}
