import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("spotify_refresh_token")?.value

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token available" }, { status: 401 })
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Token refresh error:", errorData)
      return NextResponse.json({ error: "Failed to refresh token" }, { status: response.status })
    }

    const tokenData = await response.json()

    // Criar resposta com os novos tokens
    const nextResponse = NextResponse.json({ success: true })

    // Armazenar o novo token de acesso
    const host = request.headers.get("host") || "localhost:3000"
    nextResponse.cookies.set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      maxAge: tokenData.expires_in,
      path: "/",
      sameSite: "lax",
      secure: !host.includes("localhost"),
    })

    // Armazenar o novo token de atualização, se fornecido
    if (tokenData.refresh_token) {
      nextResponse.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
        sameSite: "lax",
        secure: !host.includes("localhost"),
      })
    }

    return nextResponse
  } catch (error) {
    console.error("Error refreshing token:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
