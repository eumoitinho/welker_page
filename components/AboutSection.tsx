"use client"

import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView) {
      if (sectionRef.current) {
        sectionRef.current.classList.add("animate-fade-in-up")
      }

      if (contentRef.current) {
        contentRef.current.classList.add("animate-fade-in")
        contentRef.current.style.animationDelay = "0.3s"
      }

      if (imageRef.current) {
        imageRef.current.classList.add("animate-scale-in")
        imageRef.current.style.animationDelay = "0.6s"
      }
    }
  }, [inView])

  return (
    <section
      id="about"
      ref={(el) => {
        // @ts-ignore - combining refs
        ref(el)
        sectionRef.current = el
      }}
      className="py-20 bg-gradient-to-b from-[#6e1212]/30 to-black opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase">About</h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div ref={contentRef} className="w-full md:w-1/2 opacity-0">
            <p className="text-lg mb-6">
              The <span className="font-bold">WELKER</span> project, led by Brazilian producer Eduardo Welker, is
              rapidly establishing itself as a force to be reckoned with in the electronic music scene. After a decade
              of honing his craft in commercial music, WELKER made the bold decision to dive headfirst into the
              underground world.
            </p>
            <p className="text-lg mb-6">
              His unique fusion of indie dance, techno, and house has quickly caught the attention of industry giants
              such as Solomun, CamelPhat, Vintage Culture, Gordo, Massano, Innellea, Max Styler, Silver Panda, Adan Ten,
              and many others, who have been playing his unreleased IDs in their sets.
            </p>
            <p className="text-lg mb-6">
              With releases scheduled on prestigious labels for early 2025, WELKER made a remarkable debut on Solomun's
              renowned Diynamic label, reaching #1 in the Indie Dance release chart, and #3 in the overall Indie Dance
              chart. He is on the verge of becoming a global sensation.
            </p>
            <p className="text-lg">
              His infectious energy and undeniable talent position him at the forefront of a new "Brazilian Storm"
              sweeping across the electronic music landscape.
            </p>
          </div>

          <div ref={imageRef} className="w-full md:w-1/2 opacity-0">
            <img
              src="/images/videobg.png"
              alt="WELKER"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
