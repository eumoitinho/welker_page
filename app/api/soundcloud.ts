// API para SoundCloud
import { cache } from "react"

export interface SoundCloudTrack {
  id: string
  title: string
  artist: string
  artwork: string
  duration: number
  externalUrl: string
  streamUrl?: string
  playbackCount: number
  label: string
  releaseDate: string
}

// Esta função seria substituída pela implementação real da API do SoundCloud
export const getSoundCloudTracks = cache(async (username: string): Promise<SoundCloudTrack[]> => {
  // Em um ambiente de produção, você usaria a API oficial do SoundCloud
  // Exemplo de como seria a implementação real:
  /*
  const clientId = process.env.SOUNDCLOUD_CLIENT_ID;
  
  const response = await fetch(
    `https://api.soundcloud.com/users/${username}/tracks?client_id=${clientId}&limit=10`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch SoundCloud tracks');
  }
  
  const data = await response.json();
  
  return data.map((track: any) => ({
    id: track.id,
    title: track.title,
    artist: track.user.username,
    artwork: track.artwork_url?.replace('-large', '-t500x500') || track.user.avatar_url,
    duration: track.duration,
    externalUrl: track.permalink_url,
    streamUrl: `${track.stream_url}?client_id=${clientId}`,
    playbackCount: track.playback_count,
    label: track.label_name || 'Independent',
    releaseDate: new Date(track.created_at).toISOString().split('T')[0]
  }));
  */

  // Para fins de demonstração, retornamos dados simulados
  const mockTracks: SoundCloudTrack[] = [
    {
      id: "sc-1",
      title: "Element",
      artist: "WELKER",
      artwork: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg",
      duration: 330000,
      externalUrl: "https://soundcloud.com/diynamic-music/welker-element",
      streamUrl: "https://api.soundcloud.com/tracks/sample1/stream",
      playbackCount: 48678,
      label: "Diynamic Music",
      releaseDate: "2023-03-15",
    },
    {
      id: "sc-2",
      title: "Everybody EP",
      artist: "WELKER",
      artwork: "https://i1.sndcdn.com/artworks-Drl6AYm71zFIQR8B-POy5fA-t500x500.png",
      duration: 264000,
      externalUrl: "https://soundcloud.com/repopulatemars/sets/welker-everybody",
      streamUrl: "https://api.soundcloud.com/tracks/sample2/stream",
      playbackCount: 10445,
      label: "Repopulate Mars",
      releaseDate: "2023-02-10",
    },
    {
      id: "sc-3",
      title: "Street Song",
      artist: "WELKER",
      artwork: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
      duration: 258000,
      externalUrl: "https://soundcloud.com/welkermusic/street-song",
      streamUrl: "https://api.soundcloud.com/tracks/sample3/stream",
      playbackCount: 1573,
      label: "WELKER Music",
      releaseDate: "2022-11-18",
    },
  ]

  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockTracks
})
