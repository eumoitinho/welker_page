"use client"

import { useState, useRef, useEffect } from "react"
import type { SpotifyTrack } from "@/lib/spotify"

export function useAudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Update progress
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      intervalRef.current = setInterval(() => {
        const duration = audioRef.current?.duration || 0
        const currentTime = audioRef.current?.currentTime || 0

        if (duration > 0) {
          setProgress((currentTime / duration) * 100)
        }

        if (currentTime >= duration) {
          setIsPlaying(false)
          setProgress(0)
          clearInterval(intervalRef.current as NodeJS.Timeout)
        }
      }, 100)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  // Handle play/pause
  const togglePlay = (track?: SpotifyTrack) => {
    if (track) {
      // If a new track is provided
      if (currentTrack?.id !== track.id) {
        // Stop current track if playing
        if (audioRef.current) {
          audioRef.current.pause()
        }

        // Set new track
        setCurrentTrack(track)
        setProgress(0)

        // Create new audio element
        const audio = new Audio(track.previewUrl || "")
        audio.volume = volume
        audioRef.current = audio

        // Play if preview URL exists
        if (track.previewUrl) {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.error("Error playing track:", err)
              setIsPlaying(false)
            })
        } else {
          setIsPlaying(false)
        }
      } else {
        // Toggle play/pause for current track
        if (isPlaying && audioRef.current) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else if (audioRef.current && currentTrack?.previewUrl) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.error("Error playing track:", err)
              setIsPlaying(false)
            })
        }
      }
    } else if (currentTrack) {
      // Toggle play/pause for current track
      if (isPlaying && audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else if (audioRef.current && currentTrack.previewUrl) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Error playing track:", err)
            setIsPlaying(false)
          })
      }
    }
  }

  // Set volume
  const changeVolume = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  // Seek to position
  const seek = (percent: number) => {
    if (audioRef.current && audioRef.current.duration) {
      const seekTime = (percent / 100) * audioRef.current.duration
      audioRef.current.currentTime = seekTime
      setProgress(percent)
    }
  }

  return {
    currentTrack,
    isPlaying,
    progress,
    volume,
    togglePlay,
    changeVolume,
    seek,
    hasPreview: !!currentTrack?.previewUrl,
  }
}
