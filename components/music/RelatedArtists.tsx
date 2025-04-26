"use client"

import { useEffect, useState, useRef } from "react"
import { ExternalLink } from "lucide-react"
import type { SpotifyArtist } from "@/lib/spotify"

interface RelatedArtistsProps {
  inView: boolean
}

export default function RelatedArtists({ inView }: RelatedArtistsProps) {
  const [artists, setArtists] = useState<SpotifyArtist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchRelatedArtists = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/spotify?type=related-artists")

        if (!response.ok) {
          throw new Error(`Failed to fetch related artists: ${response.statusText}`)
        }

        const data = await response.json()
        setArtists(data.slice(0, 6)) // Limit to 6 artists
      } catch (err) {
        console.error("Error fetching related artists:", err)
        setError("Failed to load related artists. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedArtists()
  }, [])

  useEffect(() => {
    if (inView && containerRef.current) {
      const items = containerRef.current.querySelectorAll(".artist-item")
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show")
        }, 150 * index)
      })
    }
  }, [inView, loading])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error || artists.length === 0) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-16">
      <h3 className="text-2xl font-bold mb-8 text-center">Similar Artists</h3>

      <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-item opacity-0 transform translate-y-10 transition-all duration-500">
            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="block group">
              <div className="relative aspect-square overflow-hidden rounded-full mb-3">
                <img
                  src={artist.images[0]?.url || "/placeholder-artist.jpg"}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "/placeholder-artist.jpg")}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink size={24} className="text-white" />
                </div>
              </div>
              <h4 className="text-center font-medium text-sm truncate">{artist.name}</h4>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
