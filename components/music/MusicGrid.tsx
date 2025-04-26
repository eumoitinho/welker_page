"use client"

import { useEffect, useState, useRef } from "react"
import { Play, Pause, ExternalLink, Music, Loader2 } from "lucide-react"
import { formatDuration } from "@/lib/spotify"
import type { SpotifyTrack } from "@/lib/spotify"
import MusicPlayer from "./MusicPlayer"

interface MusicGridProps {
  inView: boolean
}

export default function MusicGrid({ inView }: MusicGridProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const [isPlayingTrack, setIsPlayingTrack] = useState(false)
  const [audioLoading, setAudioLoading] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    fetchTracks()

    // Clean up audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  useEffect(() => {
    if (inView && containerRef.current) {
      const items = containerRef.current.querySelectorAll(".music-item")
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show")
        }, 150 * index)
      })
    }
  }, [inView, loading])

  const fetchTracks = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/spotify/artist-tracks")

      if (!response.ok) {
        throw new Error(`Failed to fetch tracks: ${response.statusText}`)
      }

      const data = await response.json()
      if (data && data.tracks && Array.isArray(data.tracks)) {
        // Filter out tracks without preview URLs for better user experience
        const tracksWithPreviews = data.tracks.filter((track: SpotifyTrack) => !!track.previewUrl)
        const tracksWithoutPreviews = data.tracks.filter((track: SpotifyTrack) => !track.previewUrl)

        // Put tracks with previews first, then tracks without previews
        setTracks([...tracksWithPreviews, ...tracksWithoutPreviews])
      } else {
        throw new Error("Unexpected response format")
      }
    } catch (err) {
      console.error("Error fetching music tracks:", err)
      setError("Failed to load tracks. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleTrackSelect = (track: SpotifyTrack) => {
    // If selecting the currently playing track, toggle play/pause
    if (playingTrackId === track.id) {
      if (audioRef.current) {
        if (isPlayingTrack) {
          audioRef.current.pause()
          setIsPlayingTrack(false)
        } else {
          audioRef.current
            .play()
            .then(() => setIsPlayingTrack(true))
            .catch((err) => {
              console.error("Error playing track:", err)
              setIsPlayingTrack(false)
            })
        }
      }
      return
    }

    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }

    // If track has no preview, open the full player
    if (!track.previewUrl) {
      setSelectedTrack(track)
      setShowPlayer(true)
      return
    }

    // Play the selected track
    setAudioLoading(track.id)
    setPlayingTrackId(track.id)
    setIsPlayingTrack(false)

    const audio = new Audio(track.previewUrl)
    audio.volume = 0.7

    audio.addEventListener("canplaythrough", () => {
      setAudioLoading(null)
      audio
        .play()
        .then(() => setIsPlayingTrack(true))
        .catch((err) => {
          console.error("Error playing track:", err)
          setIsPlayingTrack(false)
          setAudioLoading(null)
        })
    })

    audio.addEventListener("ended", () => {
      setIsPlayingTrack(false)
      setPlayingTrackId(null)
    })

    audio.addEventListener("error", () => {
      setIsPlayingTrack(false)
      setAudioLoading(null)
      // If inline playback fails, try with the full player
      setSelectedTrack(track)
      setShowPlayer(true)
    })

    audioRef.current = audio
  }

  const openFullPlayer = (track: SpotifyTrack) => {
    // Stop any currently playing inline audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
      setIsPlayingTrack(false)
      setPlayingTrackId(null)
    }

    setSelectedTrack(track)
    setShowPlayer(true)
  }

  const closePlayer = () => {
    setShowPlayer(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-8">
        <p className="text-red-400">{error}</p>
        <button
          onClick={fetchTracks}
          className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src="https://i1.sndcdn.com/avatars-DE4T0OaBhGxYthkK-XA2dXA-t200x200.jpg"
              alt="WELKER"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold text-white">WELKER</h3>
              <p className="text-gray-400">Tracks on Spotify</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href="https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1DB954] text-white rounded-full font-semibold transition-all duration-300 hover:bg-[#1ed760] flex items-center gap-2"
            >
              <Music size={20} /> Open in Spotify
            </a>
          </div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="music-item opacity-0 transform translate-y-10 transition-all duration-500 bg-[#121212] rounded-lg overflow-hidden"
            >
              <div className="flex flex-col">
                <div
                  className="relative aspect-square overflow-hidden cursor-pointer"
                  onClick={() => handleTrackSelect(track)}
                >
                  <img
                    src={track.artwork || "/placeholder.svg"}
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = "/placeholder-album.jpg")}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      {audioLoading === track.id ? (
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Loader2 size={32} className="text-white animate-spin" />
                        </div>
                      ) : playingTrackId === track.id && isPlayingTrack ? (
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
                          <Pause size={32} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
                          <Play size={32} className="text-white" fill="white" />
                        </div>
                      )}
                      {!track.previewUrl && (
                        <p className="mt-2 text-sm bg-black/50 px-2 py-1 rounded">Preview not available</p>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">{track.title}</h3>
                        <p className="text-sm text-gray-300">{track.artist}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-gray-400">{formatDuration(track.duration)}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openFullPlayer(track)
                        }}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                        title="Open in player"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v14"></path>
                          <path d="M18 22 22 2"></path>
                          <path d="M2 12h10"></path>
                          <path d="m5 15 3-3-3-3"></path>
                        </svg>
                      </button>
                      <a
                        href={track.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Status indicator */}
                  {playingTrackId === track.id && isPlayingTrack && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-1">
                        <span
                          className="w-1 h-4 bg-[#6e1212] rounded-full animate-pulse"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="w-1 h-4 bg-[#6e1212] rounded-full animate-pulse"
                          style={{ animationDelay: "200ms" }}
                        ></span>
                        <span
                          className="w-1 h-4 bg-[#6e1212] rounded-full animate-pulse"
                          style={{ animationDelay: "400ms" }}
                        ></span>
                        <span
                          className="w-1 h-4 bg-[#6e1212] rounded-full animate-pulse"
                          style={{ animationDelay: "600ms" }}
                        ></span>
                      </div>
                      <span className="text-xs text-[#6e1212]">Now Playing</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black inline-flex items-center justify-center gap-2"
            >
              <Music size={20} /> FOLLOW ON SPOTIFY
            </a>
            <button
              onClick={() => {
                // Stop any currently playing inline audio
                if (audioRef.current) {
                  audioRef.current.pause()
                  audioRef.current.src = ""
                  setIsPlayingTrack(false)
                  setPlayingTrackId(null)
                }
                setShowPlayer(true)
              }}
              className="px-6 py-3 bg-[#6e1212] text-white rounded-full font-semibold transition-all duration-300 hover:bg-[#892e2e] inline-flex items-center justify-center gap-2"
            >
              <Play size={20} fill="white" /> PLAY ALL TRACKS
            </button>
          </div>
        </div>
      </div>

      {/* Music Player */}
      {showPlayer && (
        <MusicPlayer
          tracks={
            selectedTrack
              ? // If a specific track was selected, start with that track
                [...tracks.filter((t) => t.id === selectedTrack.id), ...tracks.filter((t) => t.id !== selectedTrack.id)]
              : // Otherwise play all tracks
                tracks
          }
          onClose={closePlayer}
        />
      )}
    </>
  )
}
