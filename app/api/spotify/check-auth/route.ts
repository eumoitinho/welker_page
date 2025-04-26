import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    // Verificar se o token é válido fazendo uma solicitação simples à API do Spotify
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      // Se o token expirou, tentar atualizar
      if (response.status === 401) {
        return NextResponse.json({ authenticated: false, reason: "token_expired" }, { status: 401 })
      }

      return NextResponse.json({ authenticated: false, reason: "api_error" }, { status: response.status })
    }

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error("Error checking authentication:", error)
    return NextResponse.json({ authenticated: false, reason: "server_error" }, { status: 500 })
  }
}
