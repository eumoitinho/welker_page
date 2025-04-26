import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Instagram API constants
const INSTAGRAM_API_URL = "https://graph.instagram.com"
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID || "me"

export interface InstagramPost {
  id: string
  mediaUrl: string
  permalink: string
  caption: string
  timestamp: string
  likes: number
  comments: number
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get("limit") || "6"

    // Get access token from environment variables
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

    if (!accessToken) {
      console.error("Instagram access token not found")
      return NextResponse.json({ error: "Instagram configuration missing" }, { status: 500 })
    }

    // Fetch media from Instagram Graph API
    const response = await fetch(
      `${INSTAGRAM_API_URL}/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_url,permalink,timestamp,like_count,comments_count&limit=${limit}&access_token=${accessToken}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Instagram API error:", errorData)

      // Return fallback data in production
      return NextResponse.json(getFallbackPosts(), { status: 200 })
    }

    const data = await response.json()

    // Transform the data to match our interface
    const posts: InstagramPost[] = data.data.map((post: any) => ({
      id: post.id,
      mediaUrl: post.media_url,
      permalink: post.permalink,
      caption: post.caption || "",
      timestamp: post.timestamp,
      likes: post.like_count || 0,
      comments: post.comments_count || 0,
    }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching Instagram posts:", error)

    // Return fallback data in case of error
    return NextResponse.json(getFallbackPosts(), { status: 200 })
  }
}

// Fallback data in case the API fails
function getFallbackPosts(): InstagramPost[] {
  return [
    {
      id: "1",
      mediaUrl: "https://i.imgur.com/JR8ilLU.jpg",
      permalink: "https://instagram.com/p/123456",
      caption: "New release coming soon! Stay tuned. #music #producer #techno",
      timestamp: "2023-04-15T12:00:00Z",
      likes: 1245,
      comments: 32,
    },
    {
      id: "2",
      mediaUrl: "https://i.imgur.com/dMYxbcL.jpg",
      permalink: "https://instagram.com/p/234567",
      caption: "Live at Ultra Music Festival. What a night! #festival #dj #live",
      timestamp: "2023-04-10T18:30:00Z",
      likes: 2389,
      comments: 78,
    },
    {
      id: "3",
      mediaUrl: "https://i.imgur.com/pHZaYGE.jpg",
      permalink: "https://instagram.com/p/345678",
      caption: "Studio session with @producer. New collab in the works! #studio #collab #newmusic",
      timestamp: "2023-04-05T15:45:00Z",
      likes: 1876,
      comments: 45,
    },
    {
      id: "4",
      mediaUrl: "https://i.imgur.com/KvtGxWM.jpg",
      permalink: "https://instagram.com/p/456789",
      caption: "Just announced! New tour dates coming soon. #tour #livemusic #announcement",
      timestamp: "2023-04-01T09:15:00Z",
      likes: 3102,
      comments: 124,
    },
    {
      id: "5",
      mediaUrl: "https://i.imgur.com/8LpOSUZ.jpg",
      permalink: "https://instagram.com/p/567890",
      caption: "Behind the scenes from the new music video. #behindthescenes #musicvideo #comingsoon",
      timestamp: "2023-03-28T14:20:00Z",
      likes: 1543,
      comments: 67,
    },
    {
      id: "6",
      mediaUrl: "https://i.imgur.com/YqTGkHB.jpg",
      permalink: "https://instagram.com/p/678901",
      caption: "Thank you for an amazing night, New York! #nyc #concert #thankyou",
      timestamp: "2023-03-25T23:10:00Z",
      likes: 2765,
      comments: 98,
    },
  ]
}
