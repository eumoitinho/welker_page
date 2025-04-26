"use client"

import { useEffect, useState } from "react"
import { Play, Pause, ExternalLink, Clock } from "lucide-react"

// Simulação de dados da API do SoundCloud
const soundcloudTracks = [
  {
    id: "1",
    title: "Element",
    artwork_url: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg",
    duration: 330000,
    stream_url: "https://api.soundcloud.com/tracks/sample1/stream",
    permalink_url: "https://soundcloud.com/diynamic-music/welker-element",
    playback_count: 48678,
    user: {
      username: "Diynamic Music",
      avatar_url: "https://i1.sndcdn.com/avatars-000329087661-k9xo6i-t50x50.jpg",
    },
  },
  {
    id: "2",
    title: "Everybody",
    artwork_url: "https://i1.sndcdn.com/artworks-Drl6AYm71zFIQR8B-POy5fA-t500x500.png",
    duration: 264000,
    stream_url: "https://api.soundcloud.com/tracks/sample2/stream",
    permalink_url: "https://soundcloud.com/repopulatemars/sets/welker-everybody",
    playback_count: 10445,
    user: {
      username: "Repopulate Mars",
      avatar_url: "https://i1.sndcdn.com/avatars-000329087661-k9xo6i-t50x50.jpg",
    },
  },
  {
    id: "3",
    title: "Dancing Around",
    artwork_url: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    duration: 271000,
    stream_url: "https://api.soundcloud.com/tracks/sample3/stream",
    permalink_url: "https://soundcloud.com/welkermusic/dancing-around",
    playback_count: 3948,
    user: {
      username: "WELKER",
      avatar_url: "https://i1.sndcdn.com/avatars-DE4T0OaBhGxYthkK-XA2dXA-t50x50.jpg",
    },
  },
  {
    id: "4",
    title: "Batucada",
    artwork_url: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    duration: 294000,
    stream_url: "https://api.soundcloud.com/tracks/sample4/stream",
    permalink_url: "https://soundcloud.com/welkermusic/batucada",
    playback_count: 7928,
    user: {
      username: "WELKER",
      avatar_url: "https://i1.sndcdn.com/avatars-DE4T0OaBhGxYthkK-XA2dXA-t50x50.jpg",
    },
  },
  {
    id: "5",
    title: "Street Song",
    artwork_url: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    duration: 258000,
    stream_url: "https://api.soundcloud.com/tracks/sample5/stream",
    permalink_url: "https://soundcloud.com/welkermusic/street-song",
    playback_count: 1573,
    user: {
      username: "WELKER",
      avatar_url: "https://i1.sndcdn.com/avatars-DE4T0OaBhGxYthkK-XA2dXA-t50x50.jpg",
    },
  },
]

interface SoundCloudTracksProps {
  inView: boolean
}

export default function SoundCloudTracks({ inView }: SoundCloudTracksProps) {
  const [tracks, setTracks] = useState(soundcloudTracks)
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

  const formatPlayCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const handlePlay = (trackId: string, streamUrl: string) => {
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

      const audio = new Audio(streamUrl)
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
            <p className="text-gray-400">Latest Tracks on SoundCloud</p>
          </div>
        </div>
        <a
          href="https://soundcloud.com/welkermusic"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#ff5500] hover:text-[#ff7700] transition-colors"
        >
          <span>Open in SoundCloud</span>
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
            <button
              onClick={() => handlePlay(track.id, track.stream_url)}
              className={`p-2 rounded-full mr-4 ${
                currentlyPlaying === track.id ? "bg-[#6e1212]" : "bg-white/10 hover:bg-white/20"
              } transition-colors`}
            >
              {currentlyPlaying === track.id ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white" />
              )}
            </button>
            <div className="w-12 h-12 mr-4 flex-shrink-0">
              <img
                src={track.artwork_url || "/placeholder.svg"}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow mr-4">
              <div className="flex items-center">
                <p className="text-xs text-gray-400 mr-2">{track.user.username}</p>
                <h4 className="font-medium">{track.title}</h4>
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <span className="flex items-center mr-4">
                  <Play size={12} className="mr-1" />
                  {formatPlayCount(track.playback_count)}
                </span>
                <span className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {formatDuration(track.duration)}
                </span>
              </div>
            </div>
            <a
              href={track.permalink_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://soundcloud.com/welkermusic"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black inline-block"
        >
          FOLLOW ON SOUNDCLOUD
        </a>
      </div>
    </div>
  )
}
