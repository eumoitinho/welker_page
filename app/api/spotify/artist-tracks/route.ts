import { type NextRequest, NextResponse } from "next/server"

const ARTIST_ID = "2cKII1nypeEZZ1JsRSPs3t"

// Fallback tracks in case the API fails
const FALLBACK_TRACKS = [
  {
    id: "1",
    title: "Element",
    artist: "WELKER",
    artwork: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg",
    duration: 330000,
    externalUrl: "https://open.spotify.com/track/sample1",
    album: "Element - Single",
    releaseDate: "2023-03-15",
    popularity: 48,
    previewUrl: "https://p.scdn.co/mp3-preview/0bfdd85d0d30b2a6a749af0db9a34c8c0fe71c4d",
  },
  {
    id: "2",
    title: "Everybody",
    artist: "WELKER",
    artwork: "https://i1.sndcdn.com/artworks-Drl6AYm71zFIQR8B-POy5fA-t500x500.png",
    duration: 264000,
    externalUrl: "https://open.spotify.com/track/sample2",
    album: "Everybody EP",
    releaseDate: "2023-02-10",
    popularity: 42,
    previewUrl: "https://p.scdn.co/mp3-preview/2d93a47c26d21e4476a9fa78023dd5b1e4c7a3a6",
  },
  {
    id: "3",
    title: "Dancing Around",
    artist: "WELKER",
    artwork: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    duration: 271000,
    externalUrl: "https://open.spotify.com/track/sample3",
    album: "Dancing Around EP",
    releaseDate: "2022-11-18",
    popularity: 39,
    previewUrl: "https://p.scdn.co/mp3-preview/8b7c8737a49b163137ca4288c30a8d5303a1a4d6",
  },
  {
    id: "4",
    title: "Batucada",
    artist: "WELKER",
    artwork: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    duration: 294000,
    externalUrl: "https://open.spotify.com/track/sample4",
    album: "Batucada - Single",
    releaseDate: "2022-09-22",
    popularity: 35,
    previewUrl: "https://p.scdn.co/mp3-preview/4c3a21aaa0e95b6af4db5daa7c3c3e834d78e24b",
  },
  {
    id: "5",
    title: "Street Song",
    artist: "WELKER",
    artwork: "https://i1.sndcdn.com/artworks-000617143043-0qk9h7-t500x500.jpg",
    duration: 258000,
    externalUrl: "https://open.spotify.com/track/sample5",
    album: "Street Song - Single",
    releaseDate: "2022-08-15",
    popularity: 32,
    previewUrl: "https://p.scdn.co/mp3-preview/5c65d9b6ad1d4bd304b49a343f9f7266a9c4b4e5",
  },
]

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching artist tracks for WELKER")

    // Get access token via Client Credentials Flow
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error("Missing Spotify credentials")
      console.log("Returning fallback tracks")
      return NextResponse.json({ tracks: FALLBACK_TRACKS }, { status: 200 })
    }

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      cache: "no-store",
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error("Failed to obtain token:", errorData)
      console.log("Returning fallback tracks")
      return NextResponse.json({ tracks: FALLBACK_TRACKS }, { status: 200 })
    }

    const { access_token } = await tokenResponse.json()
    console.log("Successfully obtained access token")

    // Get top tracks
    console.log(`Fetching top tracks for artist ID: ${ARTIST_ID}`)
    const tracksResponse = await fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=BR`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!tracksResponse.ok) {
      const errorData = await tracksResponse.json()
      console.error("Spotify API error:", errorData)
      console.log("Returning fallback tracks")
      return NextResponse.json({ tracks: FALLBACK_TRACKS }, { status: 200 })
    }

    const data = await tracksResponse.json()
    console.log(`Successfully fetched ${data.tracks?.length || 0} tracks`)

    // Format the data to match our SpotifyTrack interface
    const tracks = data.tracks.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      artwork: track.album.images[0]?.url || "/placeholder-album.jpg",
      duration: track.duration_ms,
      externalUrl: track.external_urls.spotify,
      album: track.album.name,
      releaseDate: track.album.release_date,
      popularity: track.popularity,
      previewUrl: track.preview_url,
    }))

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error("Error fetching tracks:", error)
    console.log("Returning fallback tracks due to error")
    return NextResponse.json({ tracks: FALLBACK_TRACKS }, { status: 200 })
  }
}
