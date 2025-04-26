"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader2 } from "lucide-react"
import type { SpotifyTrack } from "@/lib/spotify"
import { formatDuration } from "@/lib/spotify"

interface MusicPlayerProps {
  tracks: SpotifyTrack[]
  onClose?: () => void
}

export default function MusicPlayer({ tracks, onClose }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentTrack = tracks[currentTrackIndex]
  const previousVolume = useRef(volume)

  // Initialize audio element
  useEffect(() => {
    if (!currentTrack) return

    setIsLoading(true)
    setError(null)

    // Clean up previous audio element
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }

    // Check if preview URL exists
    if (!currentTrack.previewUrl) {
      setError("Preview not available for this track")
      setIsLoading(false)
      setIsPlaying(false)
      return
    }

    // Create new audio element
    const audio = new Audio(currentTrack.previewUrl)
    audio.volume = isMuted ? 0 : volume
    audioRef.current = audio

    // Set up event listeners
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
      setIsLoading(false)

      // Auto-play when track changes if already playing
      if (isPlaying) {
        audio.play().catch((err) => {
          console.error("Error auto-playing track:", err)
          setIsPlaying(false)
          setError("Failed to play track. Try again.")
        })
      }
    })

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100)
    })

    audio.addEventListener("ended", () => {
      handleNext()
    })

    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e)
      setError("Error loading audio. Try another track.")
      setIsLoading(false)
      setIsPlaying(false)
    })

    // Clean up
    return () => {
      audio.pause()
      audio.src = ""
      audio.removeEventListener("loadedmetadata", () => {})
      audio.removeEventListener("timeupdate", () => {})
      audio.removeEventListener("ended", () => {})
      audio.removeEventListener("error", () => {})
    }
  }, [currentTrackIndex, currentTrack])

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current || !currentTrack?.previewUrl) {
      setError("Preview not available for this track")
      return
    }

    setError(null)

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)

      // Reset if ended
      if (audioRef.current.currentTime >= audioRef.current.duration) {
        audioRef.current.currentTime = 0
      }

      // Add error handling for playback
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("Error playing audio:", err)
          setIsPlaying(false)
          setIsLoading(false)
          setError("Failed to play track. Try again.")
        })
    }
  }

  // Handle previous track
  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1)
    } else {
      // Loop to the last track
      setCurrentTrackIndex(tracks.length - 1)
    }
    setProgress(0)
    setCurrentTime(0)
  }

  // Handle next track
  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    } else {
      // Loop to the first track
      setCurrentTrackIndex(0)
    }
    setProgress(0)
    setCurrentTime(0)
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    previousVolume.current = newVolume

    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }

    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Handle mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = previousVolume.current
        setIsMuted(false)
      } else {
        previousVolume.current = volume
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !currentTrack?.previewUrl) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width

    const seekTime = percent * duration
    audioRef.current.currentTime = seekTime
    setProgress(percent * 100)
    setCurrentTime(seekTime)
  }

  // Find next available track with preview
  const findNextAvailableTrack = (direction: "next" | "prev") => {
    let index = currentTrackIndex
    const increment = direction === "next" ? 1 : -1

    for (let i = 0; i < tracks.length; i++) {
      index = (index + increment + tracks.length) % tracks.length
      if (tracks[index].previewUrl) {
        return index
      }
    }

    return currentTrackIndex // If no tracks have previews, stay on current track
  }

  // Skip to next available track
  const skipToNextAvailable = () => {
    const nextIndex = findNextAvailableTrack("next")
    setCurrentTrackIndex(nextIndex)
  }

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 z-50">
        <p className="text-center">No tracks available</p>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md text-white p-4 z-50 border-t border-[#6e1212]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Album artwork */}
          <div className="w-16 h-16 flex-shrink-0 relative group">
            <img
              src={currentTrack.artwork || "/placeholder.svg"}
              alt={currentTrack.title}
              className="w-full h-full object-cover rounded"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Pause size={16} className="text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold truncate">{currentTrack.title}</h4>
            <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous track"
              disabled={isLoading}
            >
              <SkipBack size={20} className={isLoading ? "opacity-50" : ""} />
            </button>

            <button
              onClick={togglePlay}
              className={`p-3 ${isLoading ? "bg-gray-700" : "bg-[#6e1212] hover:bg-[#892e2e]"} rounded-full transition-colors`}
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={isLoading || !currentTrack.previewUrl}
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next track"
              disabled={isLoading}
            >
              <SkipForward size={20} className={isLoading ? "opacity-50" : ""} />
            </button>
          </div>

          {/* Volume control */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 accent-[#6e1212]"
              aria-label="Volume"
            />
          </div>

          {/* Track navigation */}
          <div className="hidden lg:block text-xs text-gray-400">
            <span>
              {currentTrackIndex + 1} of {tracks.length}
            </span>
          </div>

          {/* Close button (if provided) */}
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close player"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-2 px-2">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>{formatDuration(currentTime * 1000)}</span>
            <span>{formatDuration(duration * 1000)}</span>
          </div>

          <div className="h-2 bg-gray-700 rounded-full cursor-pointer" onClick={handleSeek}>
            <div
              className="h-full bg-[#6e1212] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* No preview available message */}
        {!currentTrack.previewUrl && !error && (
          <div className="mt-2 text-center">
            <p className="text-sm text-yellow-400">
              Preview not available for this track.
              <button onClick={skipToNextAvailable} className="ml-2 underline hover:text-white">
                Skip to next available track
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
