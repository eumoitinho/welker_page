"use client"

import { useEffect, useState } from "react"
import { Play, Pause, ExternalLink } from "lucide-react"

// Simulação de dados da API do Spotify
const spotifyTracks = [
  {
    id: "1",
    name: "Element",
    album: {
      name: "Element - Single",
      images: [{ url: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg" }],
    },
    duration_ms: 330000,
    preview_url: "https://p.scdn.co/mp3-preview/sample1",
    external_urls: {
      spotify: "https://open.spotify.com/track/sample1",
    },
    popularity: 48,
  },
  {
    id: "2",
    name: "Everybody",
    album: {
      name: "Everybody EP",
      images: [{ url: "https://i1.sndcdn.com/artworks-Drl6AYm71zFIQR8B-POy5fA-t500x500.png" }],
    },
    duration_ms: 264000,
    preview_url: "https://p.scdn.co/mp3-preview/sample2",
    external_urls: {
      spotify: "https://open.spotify.com/track/sample2",
    },
    popularity: 42,
  },
  {
    id: "3",
    name: "Dancing Around",
    album: {
      name: "Dancing Around EP",
      images: [{ url: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg" }],
    },
    duration_ms: 271000,
    preview_url: "https://p.scdn.co/mp3-preview/sample3",
    external_urls: {
      spotify: "https://open.spotify.com/track/sample3",
    },
    popularity: 39,
  },
  {
    id: "4",
    name: "Batucada",
    album: {
      name: "Batucada - Single",
      images: [{ url: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg" }],
    },
    duration_ms: 294000,
    preview_url: "https://p.scdn.co/mp3-preview/sample4",
    external_urls: {
      spotify: "https://open.spotify.com/track/sample4",
    },
    popularity: 35,
  },
  {
    id: "5",
    name: "Street Song",
    album: {
      name: "Street Song - Single",
      images: [{ url: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg" }],
    },
    duration_ms: 258000,
    preview_url: "https://p.scdn.co/mp3-preview/sample5",
    external_urls: {
      spotify: "https://open.spotify.com/track/sample5",
    },
    popularity: 32,
  },
]

interface SpotifyTracksProps {
  inView: boolean
}

export default function SpotifyTracks({ inView }: SpotifyTracksProps) {
  const [tracks, setTracks] = useState(spotifyTracks)
  const [loading, setLoading] = useState(true)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const audioRef = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Simulando carregamento de dados da API
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handlePlay = (trackId: string, previewUrl: string) => {
    if (currentlyPlaying === trackId) {
      // Pause if already playing
      if (audioRef[0]) {
        audioRef[0].pause()
      }
      setCurrentlyPlaying(null)
    } else {
      // Play new track
      if (audioRef[0]) {
        audioRef[0].pause()
      }

      const audio = new Audio(previewUrl)
      audio.play().catch((e) => console.error("Could not play audio:", e))
      audio.onended = () => setCurrentlyPlaying(null)
      audioRef[0] = audio
      setCurrentlyPlaying(trackId)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6e1212]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://i1.sndcdn.com/avatars-DE4T0OaBhGxYthkK-XA2dXA-t200x200.jpg"
            alt="WELKER"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">WELKER</h3>
            <p className="text-gray-400">Top Tracks on Spotify</p>
          </div>
        </div>
        <a
          href="https://open.spotify.com/intl-pt/artist/2cKII1nypeEZZ1JsRSPs3t"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#1DB954] hover:text-[#1ed760] transition-colors"
        >
          <span>Open in Spotify</span>
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="bg-[#121212] rounded-lg overflow-hidden">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`flex items-center p-4 hover:bg-white/5 transition-colors ${
              index !== tracks.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            <div className="w-10 text-center text-gray-400 mr-4">{index + 1}</div>
            <div className="w-12 h-12 mr-4 flex-shrink-0">
              <img
                src={track.album.images[0].url || "/placeholder.svg"}
                alt={track.album.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow mr-4">
              <h4 className="font-medium">{track.name}</h4>
              <p className="text-sm text-gray-400">{track.album.name}</p>
            </div>
            <div className="text-gray-400 text-sm mr-4">{formatDuration(track.duration_ms)}</div>
            <button
              onClick={() => track.preview_url && handlePlay(track.id, track.preview_url)}
              className={`p-2 rounded-full ${
                currentlyPlaying === track.id ? "bg-[#6e1212]" : "bg-white/10 hover:bg-white/20"
              } transition-colors`}
              disabled={!track.preview_url}
              title={track.preview_url ? "Play preview" : "No preview available"}
            >
              {currentlyPlaying === track.id ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://open.spotify.com/intl-pt/artist/2cKII1nypeEZZ1JsRSPs3t"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black inline-block"
        >
          FOLLOW ON SPOTIFY
        </a>
      </div>
    </div>
  )
}
