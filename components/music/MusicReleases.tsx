"use client"

import { useEffect, useRef } from "react"

const musicReleases = [
  {
    id: 1,
    title: "Element",
    image: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg",
    streamLink: "https://soundcloud.com/diynamic-music/welker-element",
    platform: "SoundCloud",
  },
  {
    id: 2,
    title: "Everybody EP",
    image: "https://i1.sndcdn.com/artworks-Drl6AYm71zFIQR8B-POy5fA-t500x500.png",
    streamLink: "https://soundcloud.com/repopulatemars/sets/welker-everybody",
    platform: "SoundCloud",
  },
  {
    id: 3,
    title: "Dancing Around EP",
    image: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    streamLink: "https://open.spotify.com/intl-pt/album/5Tz2ztFdSuuC5PvnVJJwJP",
    platform: "Spotify",
  },
  {
    id: 4,
    title: "Batucada",
    image: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    streamLink: "https://open.spotify.com/intl-pt/track/1Tz2ztFdSuuC5PvnVJJwJP",
    platform: "Spotify",
  },
  {
    id: 5,
    title: "Street Song",
    image: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    streamLink: "https://open.spotify.com/intl-pt/track/2Tz2ztFdSuuC5PvnVJJwJP",
    platform: "Spotify",
  },
  {
    id: 6,
    title: "Dancing Around",
    image: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    streamLink: "https://open.spotify.com/intl-pt/track/3Tz2ztFdSuuC5PvnVJJwJP",
    platform: "Spotify",
  },
]

interface MusicReleasesProps {
  inView: boolean
}

export default function MusicReleases({ inView }: MusicReleasesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView && containerRef.current) {
      const items = containerRef.current.querySelectorAll(".music-item")
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show")
        }, 150 * index)
      })
    }
  }, [inView])

  return (
    <>
      <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {musicReleases.map((release) => (
          <div
            key={release.id}
            className="music-item opacity-0 transform translate-y-10 transition-all duration-500 flex flex-col items-center"
          >
            <div className="relative group overflow-hidden rounded-lg mb-4">
              <img
                src={release.image || "/placeholder.svg"}
                alt={`${release.title} cover`}
                className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black">
                  PREVIEW
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">{release.title}</h3>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <a
                href={release.streamLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black"
              >
                STREAM
              </a>
              <span className="text-sm text-gray-400">{release.platform}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="https://soundcloud.com/welkermusic"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold uppercase hover:text-[#892e2e] transition-colors"
        >
          View more music
        </a>
      </div>
    </>
  )
}
