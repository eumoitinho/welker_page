import { cache } from "react"

export interface SpotifyTrack {
  id: string
  title: string
  artist: string
  artwork: string
  duration: number
  externalUrl: string
  album: string
  releaseDate: string
  popularity: number
  previewUrl?: string
}

export interface SpotifyArtist {
  id: string
  name: string
  images: { url: string; height: number; width: number }[]
  followers: { total: number }
  genres: string[]
  external_urls: { spotify: string }
  popularity: number
}

export interface SpotifyAlbum {
  id: string
  name: string
  images: { url: string; height: number; width: number }[]
  release_date: string
  total_tracks: number
  artists: {
    id: string
    name: string
    external_urls: { spotify: string }
  }[]
  external_urls: { spotify: string }
  tracks: { items: any[] }
}

export const getSpotifyTracks = cache(async (artistId: string): Promise<SpotifyTrack[]> => {
  try {
    const response = await fetch(`/api/spotify/artist-tracks`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify tracks")
    }

    const data = await response.json()
    return data.tracks || []
  } catch (error) {
    console.error("Error fetching Spotify tracks:", error)
    return []
  }
})

export const getArtist = cache(async (artistId: string): Promise<SpotifyArtist> => {
  try {
    const response = await fetch(`/api/spotify?type=artist`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch artist data")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching artist:", error)
    // Return fallback data
    return {
      id: "2cKII1nypeEZZ1JsRSPs3t",
      name: "WELKER",
      images: [{ url: "https://i1.sndcdn.com/avatars-DE4T0OaBhGxYthkK-XA2dXA-t500x500.jpg", height: 500, width: 500 }],
      followers: { total: 12345 },
      genres: ["techno", "house", "indie dance", "electronic"],
      external_urls: { spotify: "https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t" },
      popularity: 65,
    }
  }
})

export const getArtistTopTracks = cache(async (artistId: string): Promise<SpotifyTrack[]> => {
  try {
    const response = await fetch(`/api/spotify?type=top-tracks`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch top tracks")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching top tracks:", error)
    return []
  }
})

export const getArtistAlbums = cache(async (artistId: string): Promise<SpotifyAlbum[]> => {
  try {
    const response = await fetch(`/api/spotify?type=albums`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch albums")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching albums:", error)
    return []
  }
})

export const getRelatedArtists = cache(async (artistId: string): Promise<SpotifyArtist[]> => {
  try {
    const response = await fetch(`/api/spotify?type=related-artists`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch related artists")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching related artists:", error)
    return []
  }
})

export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function formatReleaseDate(date: string): string {
  if (!date) return ""

  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
  return new Date(date).toLocaleDateString("en-US", options)
}
