import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Criar resposta e limpar cookies de autenticação
  const response = NextResponse.redirect(new URL("/#music", request.url))

  response.cookies.delete("spotify_access_token")
  response.cookies.delete("spotify_refresh_token")

  return response
}
