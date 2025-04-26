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

export const getSpotifyTracks = cache(async (artistId: string): Promise<SpotifyTrack[]> => {
  const response = await fetch(`/api/spotify/artist-tracks`, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify tracks")
  }

  const data = await response.json()
  return data.tracks || []
})
