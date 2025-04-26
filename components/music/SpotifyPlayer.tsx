"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { formatDuration } from "@/lib/spotify"

interface SpotifyPlayerProps {
  previewUrl: string | null
  trackName: string
  artistName: string
}

export default function SpotifyPlayer({ previewUrl, trackName, artistName }: SpotifyPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [duration, setDuration] = useState(30) // Trechos do Spotify geralmente têm 30 segundos
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Criar elemento de áudio
    if (previewUrl) {
      const audio = new Audio(previewUrl)
      audio.volume = volume

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration)
      })

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime)
        setProgress((audio.currentTime / audio.duration) * 100)
      })

      audio.addEventListener("ended", () => {
        setIsPlaying(false)
        setProgress(0)
        setCurrentTime(0)
      })

      audioRef.current = audio

      return () => {
        audio.pause()
        audio.src = ""
        audio.removeEventListener("loadedmetadata", () => {})
        audio.removeEventListener("timeupdate", () => {})
        audio.removeEventListener("ended", () => {})
      }
    }
  }, [previewUrl, volume])

  const togglePlay = () => {
    if (!audioRef.current || !previewUrl) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Reset if ended
      if (audioRef.current.currentTime >= audioRef.current.duration) {
        audioRef.current.currentTime = 0
      }

      // Adicionar tratamento de erros para reprodução
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.error("Error playing audio:", err)
          setIsPlaying(false)
          // Mostrar mensagem de erro se necessário
        })
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !previewUrl) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width

    const seekTime = percent * duration
    audioRef.current.currentTime = seekTime
    setProgress(percent * 100)
    setCurrentTime(seekTime)
  }

  if (!previewUrl) {
    return (
      <div className="flex items-center justify-center h-12 bg-[#121212] rounded-md px-4">
        <p className="text-gray-400 text-sm">Trecho não disponível</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-[#121212] rounded-md p-2 w-full">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <div className="flex-1 text-sm truncate">
          <span className="font-medium">{trackName}</span>
          <span className="text-gray-400"> • {artistName}</span>
        </div>

        <div className="text-xs text-gray-400 min-w-[80px] text-right">
          {formatDuration(currentTime * 1000)} / {formatDuration(duration * 1000)}
        </div>
      </div>

      <div className="h-2 bg-gray-800 rounded-full cursor-pointer mb-2" onClick={handleSeek}>
        <div
          className="h-full bg-white rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-white"
        />
      </div>
    </div>
  )
}
