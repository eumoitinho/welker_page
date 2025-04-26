"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"

// Dados reais dos vídeos do canal @musicwelker
const videos = [
  {
    id: "1",
    title: "WELKER - Element (Official Video)",
    thumbnail: "https://i.ytimg.com/vi/TcTzPJs01CQ/maxresdefault.jpg",
    youtubeId: "TcTzPJs01CQ",
  },
  {
    id: "2",
    title: "WELKER set at Underwar3 (Los Angeles) 2024",
    thumbnail: "https://i.ytimg.com/vi/nQxtU6skQ7M/maxresdefault.jpg",
    youtubeId: "nQxtU6skQ7M",
  },
  {
    id: "3",
    title: "WELKER - Live from Big Bear California",
    thumbnail: "https://i.ytimg.com/vi/BnGmns9hg1Y/maxresdefault.jpg",
    youtubeId: "BnGmns9hg1Y",
  },
  {
    id: "4",
    title: "WELKER - Live from Big Bear California",
    thumbnail: "https://i.ytimg.com/vi/BnGmns9hg1Y/maxresdefault.jpg",
    youtubeId: "BnGmns9hg1Y",
  },
]

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const openVideo = (youtubeId: string) => {
    setActiveVideo(youtubeId)
    document.body.style.overflow = "hidden"
  }

  const closeVideo = () => {
    setActiveVideo(null)
    document.body.style.overflow = "auto"
  }

  useEffect(() => {
    if (inView) {
      if (sectionRef.current) {
        sectionRef.current.classList.add("animate-fade-in-up")
      }

      if (carouselRef.current) {
        carouselRef.current.classList.add("opacity-100")
        carouselRef.current.classList.remove("opacity-0", "translate-y-10")

        // Animar cada vídeo individualmente
        const items = carouselRef.current.querySelectorAll(".video-item")
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("opacity-100", "translate-y-0")
          }, 150 * index)
        })
      }
    }
  }, [inView])

  return (
    <section
      id="videos"
      ref={(el) => {
        // @ts-ignore - combining refs
        ref(el)
        sectionRef.current = el
      }}
      className="py-20 bg-gradient-to-b from-black to-[#6e1212]/30 relative opacity-0"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase">Videos</h2>

        <div className="relative">
          {/* Carousel Navigation */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 md:p-3 focus:outline-none hidden md:block"
            aria-label="Previous videos"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Video Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-6 opacity-0 translate-y-10 transition-all duration-1000 scrollbar-hide"
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="video-item flex-shrink-0 w-full sm:w-[400px] opacity-0 translate-y-10 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="relative group cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => openVideo(video.youtubeId)}
                >
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play size={32} fill="white" className="text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-medium">{video.title}</h3>
              </div>
            ))}
          </div>

          {/* Carousel Navigation */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 md:p-3 focus:outline-none hidden md:block"
            aria-label="Next videos"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@musicwelker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold uppercase hover:text-white/80 transition-colors"
          >
            View more
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeVideo}>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={closeVideo}
          >
            <X size={32} />
          </button>
        </div>
      )}
    </section>
  )
}
