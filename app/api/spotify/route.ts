import { type NextRequest, NextResponse } from "next/server"
import { getArtist, getArtistTopTracks, getArtistAlbums, getRelatedArtists } from "@/lib/spotify"

// WELKER's Spotify artist ID
const WELKER_ARTIST_ID = "2cKII1nypeEZZ1JsRSPs3t"

export async function GET(request: NextRequest) {
  try {
    // Get the data type from the URL
    const searchParams = request.nextUrl.searchParams
    const dataType = searchParams.get("type")

    if (!dataType) {
      return NextResponse.json({ error: "Missing data type parameter" }, { status: 400 })
    }

    let data

    switch (dataType) {
      case "artist":
        data = await getArtist(WELKER_ARTIST_ID)
        break
      case "top-tracks":
        data = await getArtistTopTracks(WELKER_ARTIST_ID)
        break
      case "albums":
        data = await getArtistAlbums(WELKER_ARTIST_ID)
        break
      case "related-artists":
        data = await getRelatedArtists(WELKER_ARTIST_ID)
        break
      default:
        return NextResponse.json({ error: "Invalid data type" }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in Spotify API route:", error)

    // Return appropriate fallback data based on the requested data type
    const searchParams = request.nextUrl.searchParams
    const dataType = searchParams.get("type")

    if (dataType === "artist") {
      return NextResponse.json({
        id: "2cKII1nypeEZZ1JsRSPs3t",
        name: "WELKER",
        images: [
          { url: "https://i1.sndcdn.com/avatars-DE4T0OaBhGxYthkK-XA2dXA-t500x500.jpg", height: 500, width: 500 },
        ],
        followers: { total: 12345 },
        genres: ["techno", "house", "indie dance", "electronic"],
        external_urls: { spotify: "https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t" },
        popularity: 65,
      })
    }

    return NextResponse.json({ error: "Failed to fetch data from Spotify" }, { status: 500 })
  }
}
