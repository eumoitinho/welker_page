"use client"

import { useState, useEffect } from "react"
import { LogIn, LogOut } from "lucide-react"

interface SpotifyLoginProps {
  onAuthChange: (isAuthenticated: boolean) => void
}

export default function SpotifyLogin({ onAuthChange }: SpotifyLoginProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário já está autenticado
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/spotify/check-auth", {
          method: "GET",
          credentials: "include",
        })

        const isAuth = response.ok
        setIsAuthenticated(isAuth)
        onAuthChange(isAuth)
      } catch (error) {
        console.error("Error checking authentication:", error)
        setIsAuthenticated(false)
        onAuthChange(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [onAuthChange])

  const handleLogin = () => {
    window.location.href = "/api/spotify/auth"
  }

  const handleLogout = () => {
    window.location.href = "/api/spotify/logout"
  }

  if (isLoading) {
    return (
      <button
        disabled
        className="px-6 py-3 bg-[#1DB954] text-white rounded-full font-semibold opacity-70 flex items-center gap-2"
      >
        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
        Carregando...
      </button>
    )
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-[#1DB954] text-white rounded-full font-semibold transition-all duration-300 hover:bg-[#1ed760] flex items-center gap-2"
      >
        <LogOut size={20} />
        Desconectar do Spotify
      </button>
    )
  }

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-[#1DB954] text-white rounded-full font-semibold transition-all duration-300 hover:bg-[#1ed760] flex items-center gap-2"
    >
      <LogIn size={20} />
      Conectar ao Spotify
    </button>
  )
}
