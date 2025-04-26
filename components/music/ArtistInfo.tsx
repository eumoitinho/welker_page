"use client"

import { useEffect, useState } from "react"
import { Music, Users } from "lucide-react"
import { formatNumber } from "@/lib/spotify"
import type { SpotifyArtist } from "@/lib/spotify"

// Fallback artist data
const FALLBACK_ARTIST: SpotifyArtist = {
  id: "2cKII1nypeEZZ1JsRSPs3t",
  name: "WELKER",
  images: [{ url: "https://i1.sndcdn.com/avatars-DE4T0OaBhGxYthkK-XA2dXA-t500x500.jpg", height: 500, width: 500 }],
  followers: { total: 12345 },
  genres: ["techno", "house", "indie dance", "electronic"],
  external_urls: { spotify: "https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t" },
  popularity: 65,
}

export default function ArtistInfo() {
  const [artist, setArtist] = useState<SpotifyArtist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/spotify?type=artist")

        if (!response.ok) {
          throw new Error(`Failed to fetch artist: ${response.statusText}`)
        }

        const data = await response.json()

        if (data && data.id) {
          setArtist(data)
        } else {
          console.log("Using fallback artist data due to empty response")
          setArtist(FALLBACK_ARTIST)
        }
      } catch (err) {
        console.error("Error fetching artist:", err)
        setError("Failed to load artist information. Please try again later.")
        // Use fallback data
        setArtist(FALLBACK_ARTIST)
      } finally {
        setLoading(false)
      }
    }

    fetchArtist()
  }, [retryCount])

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!artist) {
    return null
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-[#121212] p-4 rounded-lg">
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-4 w-full">
          <p className="text-red-400">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      )}

      <img
        src={artist.images[0]?.url || "/placeholder-artist.jpg"}
        alt={artist.name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold">{artist.name}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {artist.genres.slice(0, 5).map((genre) => (
            <span key={genre} className="text-xs bg-[#6e1212] px-2 py-1 rounded-full">
              {genre}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-gray-300">
            <Users size={16} />
            <span className="text-sm">Followers</span>
          </div>
          <span className="font-bold">{formatNumber(artist.followers.total)}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-gray-300">
            <Music size={16} />
            <span className="text-sm">Popularity</span>
          </div>
          <span className="font-bold">{artist.popularity}/100</span>
        </div>
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#1DB954] text-white rounded-full font-semibold transition-all duration-300 hover:bg-[#1ed760] hidden md:block"
        >
          View on Spotify
        </a>
      </div>
    </div>
  )
}
