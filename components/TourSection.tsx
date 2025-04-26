"use client"

import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

const tourDates = [
  {
    id: 1,
    date: "SAT APR 19",
    event: "TBA",
    location: "99 Scott (Courtyard), Brooklyn, NY, United States",
    ticketLink: "#",
    infoLink: "#",
  },
  {
    id: 2,
    date: "FRI MAY 16",
    event: "TBA",
    location: "Austin, TX, United States",
    ticketLink: "#",
    infoLink: "#",
  },
  {
    id: 3,
    date: "SAT JUN 22",
    event: "TBA",
    location: "Miami, FL, United States",
    ticketLink: "#",
    infoLink: "#",
  },
  {
    id: 4,
    date: "FRI JUL 12",
    event: "TBA",
    location: "Los Angeles, CA, United States",
    ticketLink: "#",
    infoLink: "#",
  },
]

export default function TourSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (inView) {
      if (sectionRef.current) {
        sectionRef.current.classList.add("animate-fade-in-up")
      }

      const items = document.querySelectorAll(".tour-item")
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show")
        }, 150 * index)
      })
    }
  }, [inView])

  return (
    <section
      id="dates"
      ref={(el) => {
        // @ts-ignore - combining refs
        ref(el)
        sectionRef.current = el
      }}
      className="py-20 bg-gradient-to-b from-black to-[#6e1212]/30 opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase">Tour</h2>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Artist Photo */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welkerphoto.jpg-a1m1Ffqjp1oobXwYC6caYNLLn2E7My.jpeg"
              alt="WELKER"
              className="w-full max-w-[450px] h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Tour Dates */}
          <div className="w-full md:w-2/3 space-y-6">
            {tourDates.map((tour, index) => (
              <div
                key={tour.id}
                className="tour-item opacity-0 transform translate-y-10 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-black/20 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold uppercase">{tour.date}</p>
                  <p className="text-white">{tour.event}</p>
                  <p className="text-gray-400 text-sm">{tour.location}</p>
                </div>

                <div className="flex gap-4">
                  <a
                    href={tour.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-transparent border border-white text-white rounded text-sm font-semibold transition-colors duration-200 hover:bg-white hover:text-black"
                  >
                    TICKETS
                  </a>
                  <a
                    href={tour.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-transparent border border-white text-white rounded text-sm font-semibold transition-colors duration-200 hover:bg-white hover:text-black"
                  >
                    INFOS
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
