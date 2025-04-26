import { type NextRequest, NextResponse } from "next/server"

// Endpoint para iniciar o fluxo de autorização do Spotify
export async function GET(request: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID

  // Obtenha a URL base da solicitação para construir o redirect_uri
  const host = request.headers.get("host") || "welker-page-app.vercel.app"
  const protocol = host.includes("localhost") ? "http" : "https"
  const redirectUri = `${protocol}://${host}/api/spotify/callback`

  // Escopos necessários para acessar dados do artista e reproduzir trechos
  const scopes = ["user-read-private", "user-read-email", "streaming"].join(" ")

  // Estado para verificação de segurança
  const state = Math.random().toString(36).substring(2, 15)

  // Construir URL de autorização
  const authUrl = new URL("https://accounts.spotify.com/authorize")
  authUrl.searchParams.append("client_id", clientId || "")
  authUrl.searchParams.append("response_type", "code")
  authUrl.searchParams.append("redirect_uri", redirectUri)
  authUrl.searchParams.append("scope", scopes)
  authUrl.searchParams.append("state", state)

  // Armazenar o estado em um cookie para verificação posterior
  const response = NextResponse.redirect(authUrl.toString())
  response.cookies.set("spotify_auth_state", state, {
    httpOnly: true,
    maxAge: 60 * 5, // 5 minutos
    path: "/",
    sameSite: "lax",
    secure: !host.includes("localhost"),
  })

  return response
}
