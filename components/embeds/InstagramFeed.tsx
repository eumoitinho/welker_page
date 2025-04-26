"use client"

import { useEffect, useState } from "react"

interface InstagramPost {
  id: string
  mediaUrl: string
  permalink: string
  caption: string
  timestamp: string
}

interface InstagramFeedProps {
  username: string
}

// Esta é uma simulação de posts do Instagram
// Em um ambiente real, você precisaria usar a API do Instagram
const mockPosts: InstagramPost[] = [
  {
    id: "1",
    mediaUrl: "/placeholder.svg?height=600&width=600",
    permalink: "https://instagram.com/p/123456",
    caption: "New release coming soon! Stay tuned. #music #producer #techno",
    timestamp: "2023-04-15T12:00:00Z",
  },
  {
    id: "2",
    mediaUrl: "/placeholder.svg?height=600&width=600",
    permalink: "https://instagram.com/p/234567",
    caption: "Live at Ultra Music Festival. What a night! #festival #dj #live",
    timestamp: "2023-04-10T18:30:00Z",
  },
  {
    id: "3",
    mediaUrl: "/placeholder.svg?height=600&width=600",
    permalink: "https://instagram.com/p/345678",
    caption: "Studio session with @producer. New collab in the works! #studio #collab #newmusic",
    timestamp: "2023-04-05T15:45:00Z",
  },
  {
    id: "4",
    mediaUrl: "/placeholder.svg?height=600&width=600",
    permalink: "https://instagram.com/p/456789",
    caption: "Just announced! New tour dates coming soon. #tour #livemusic #announcement",
    timestamp: "2023-04-01T09:15:00Z",
  },
  {
    id: "5",
    mediaUrl: "/placeholder.svg?height=600&width=600",
    permalink: "https://instagram.com/p/567890",
    caption: "Behind the scenes from the new music video. #behindthescenes #musicvideo #comingsoon",
    timestamp: "2023-03-28T14:20:00Z",
  },
  {
    id: "6",
    mediaUrl: "/placeholder.svg?height=600&width=600",
    permalink: "https://instagram.com/p/678901",
    caption: "Thank you for an amazing night, New York! #nyc #concert #thankyou",
    timestamp: "2023-03-25T23:10:00Z",
  },
]

export default function InstagramFeed({ username }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulando o carregamento de dados da API
    const fetchPosts = async () => {
      try {
        // Em um ambiente real, você faria uma chamada à API aqui
        // const response = await fetch(`/api/instagram?username=${username}`);
        // const data = await response.json();

        // Simulando um atraso de rede
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setPosts(mockPosts)
      } catch (error) {
        console.error("Error fetching Instagram posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [username])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6e1212]"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="block group relative overflow-hidden rounded-lg aspect-square"
        >
          <img
            src={post.mediaUrl || "/placeholder.svg"}
            alt={post.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-sm line-clamp-3">{post.caption}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
