import { type NextRequest, NextResponse } from "next/server"

// ID do artista WELKER
const ARTIST_ID = "2cKII1nypeEZZ1JsRSPs3t"

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "No access token available" }, { status: 401 })
  }

  try {
    // Obter as top tracks do artista no mercado brasileiro
    const response = await fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=BR`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      // Se o token expirou, tentar atualizar
      if (response.status === 401) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 })
      }

      const errorData = await response.json()
      console.error("Spotify API error:", errorData)
      return NextResponse.json({ error: "Failed to fetch tracks" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching tracks:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
