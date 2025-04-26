"use client"

import { useEffect, useState, useRef } from "react"
import { ExternalLink, Calendar, Music } from "lucide-react"
import { formatReleaseDate } from "@/lib/spotify"
import type { SpotifyAlbum } from "@/lib/spotify"

interface AlbumGridProps {
  inView: boolean
}

// Fallback albums in case API fails
const FALLBACK_ALBUMS: SpotifyAlbum[] = [
  {
    id: "alb-1",
    name: "Element - Single",
    images: [{ url: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg", height: 500, width: 500 }],
    release_date: "2023-03-15",
    total_tracks: 1,
    artists: [
      {
        id: "2cKII1nypeEZZ1JsRSPs3t",
        name: "WELKER",
        external_urls: { spotify: "https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t" },
      },
    ],
    external_urls: { spotify: "https://open.spotify.com/album/sample1" },
    tracks: { items: [] },
  },
  {
    id: "alb-2",
    name: "Everybody EP",
    images: [{ url: "https://i1.sndcdn.com/artworks-Drl6AYm71zFIQR8B-POy5fA-t500x500.png", height: 500, width: 500 }],
    release_date: "2023-02-10",
    total_tracks: 3,
    artists: [
      {
        id: "2cKII1nypeEZZ1JsRSPs3t",
        name: "WELKER",
        external_urls: { spotify: "https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t" },
      },
    ],
    external_urls: { spotify: "https://open.spotify.com/album/sample2" },
    tracks: { items: [] },
  },
  {
    id: "alb-3",
    name: "Dancing Around EP",
    images: [{ url: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg", height: 500, width: 500 }],
    release_date: "2022-11-18",
    total_tracks: 2,
    artists: [
      {
        id: "2cKII1nypeEZZ1JsRSPs3t",
        name: "WELKER",
        external_urls: { spotify: "https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t" },
      },
    ],
    external_urls: { spotify: "https://open.spotify.com/album/sample3" },
    tracks: { items: [] },
  },
  {
    id: "alb-4",
    name: "Batucada - Single",
    images: [{ url: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg", height: 500, width: 500 }],
    release_date: "2022-09-22",
    total_tracks: 1,
    artists: [
      {
        id: "2cKII1nypeEZZ1JsRSPs3t",
        name: "WELKER",
        external_urls: { spotify: "https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t" },
      },
    ],
    external_urls: { spotify: "https://open.spotify.com/album/sample4" },
    tracks: { items: [] },
  },
]

export default function AlbumGrid({ inView }: AlbumGridProps) {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/spotify?type=albums")

        if (!response.ok) {
          throw new Error(`Failed to fetch albums: ${response.statusText}`)
        }

        const data = await response.json()

        if (data && Array.isArray(data) && data.length > 0) {
          setAlbums(data)
        } else {
          console.log("Using fallback albums due to empty response")
          setAlbums(FALLBACK_ALBUMS)
        }
      } catch (err) {
        console.error("Error fetching albums:", err)
        setError("Failed to load albums. Please try again later.")
        // Use fallback data
        setAlbums(FALLBACK_ALBUMS)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [retryCount])

  useEffect(() => {
    if (inView && containerRef.current) {
      const items = containerRef.current.querySelectorAll(".album-item")
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show")
        }, 150 * index)
      })
    }
  }, [inView, loading])

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  // If we have an error but also have fallback albums, show the albums
  if (error && albums.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-16">
      <h3 className="text-2xl font-bold mb-8 text-center">Albums & Singles</h3>

      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-8">
          <p className="text-red-400">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      )}

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <div
            key={album.id}
            className="album-item opacity-0 transform translate-y-10 transition-all duration-500 bg-[#121212] rounded-lg overflow-hidden"
          >
            <div className="flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={album.images[0]?.url || "/placeholder-album.jpg"}
                  alt={album.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "/placeholder-album.jpg")}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-white text-black rounded-full font-semibold transition-all duration-300 hover:bg-white/80 flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Music size={16} /> LISTEN
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{album.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar size={14} />
                        <span>{formatReleaseDate(album.release_date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">{album.total_tracks} tracks</div>
                <a
                  href={album.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
