import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(new URL(`/music?error=${error}`, request.url))
  }

  const storedState = request.cookies.get("spotify_auth_state")?.value
  if (!state || state !== storedState) {
    return NextResponse.redirect(new URL("/music?error=state_mismatch", request.url))
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  const host = request.headers.get("host") || "welker-page-app.vercel.app"
  const protocol = host.includes("localhost") ? "http" : "https"
  const redirectUri = `${protocol}://${host}/api/spotify/callback`

  try {
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code || "",
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error("Token exchange error:", errorData)
      return NextResponse.redirect(new URL("/music?error=token_exchange_failed", request.url))
    }

    const tokenData = await tokenResponse.json()
    const response = NextResponse.redirect(new URL("/#music", request.url))

    response.cookies.set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      maxAge: tokenData.expires_in,
      path: "/",
      sameSite: "lax",
      secure: !host.includes("localhost"),
    })

    if (tokenData.refresh_token) {
      response.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
        sameSite: "lax",
        secure: !host.includes("localhost"),
      })
    }

    return response
  } catch (error) {
    console.error("Error exchanging code for token:", error)
    return NextResponse.redirect(new URL("/music?error=server_error", request.url))
  }
}
