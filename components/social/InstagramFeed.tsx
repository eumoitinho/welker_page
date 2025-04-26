"use client"

import { useEffect, useState } from "react"
import { Instagram } from "lucide-react"

interface InstagramPost {
  id: string
  mediaUrl: string
  permalink: string
  caption: string
  timestamp: string
  likes: number
  comments: number
}

interface InstagramFeedProps {
  username: string
  limit?: number
}

export default function InstagramFeed({ username, limit = 6 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use the specific Instagram posts requested by the user
        const specificPosts: InstagramPost[] = [
          {
            id: "1",
            mediaUrl: "https://i.imgur.com/JR8ilLU.jpg",
            permalink: "https://instagram.com/welkermusic/p/DI1kFNFTigm/",
            caption: "New release coming soon! Stay tuned. #music #producer #techno",
            timestamp: "2023-04-15T12:00:00Z",
            likes: 1245,
            comments: 32,
          },
          {
            id: "2",
            mediaUrl: "https://i.imgur.com/dMYxbcL.jpg",
            permalink: "https://instagram.com/welkermusic/p/DIB9GonJxbp/",
            caption: "Live at Ultra Music Festival. What a night! #festival #dj #live",
            timestamp: "2023-04-10T18:30:00Z",
            likes: 2389,
            comments: 78,
          },
          {
            id: "3",
            mediaUrl: "https://i.imgur.com/pHZaYGE.jpg",
            permalink: "https://instagram.com/welkermusic/p/DHBn7Ehx4-g/",
            caption: "Studio session with @producer. New collab in the works! #studio #collab #newmusic",
            timestamp: "2023-04-05T15:45:00Z",
            likes: 1876,
            comments: 45,
          },
          {
            id: "4",
            mediaUrl: "https://i.imgur.com/KvtGxWM.jpg",
            permalink: "https://instagram.com/welkermusic/p/DIes97zTsum/",
            caption: "Just announced! New tour dates coming soon. #tour #livemusic #announcement",
            timestamp: "2023-04-01T09:15:00Z",
            likes: 3102,
            comments: 124,
          },
          {
            id: "5",
            mediaUrl: "https://i.imgur.com/8LpOSUZ.jpg",
            permalink: "https://instagram.com/welkermusic/p/DIPMZDly9iz/",
            caption: "Behind the scenes from the new music video. #behindthescenes #musicvideo #comingsoon",
            timestamp: "2023-03-28T14:20:00Z",
            likes: 1543,
            comments: 67,
          },
          {
            id: "6",
            mediaUrl: "https://i.imgur.com/YqTGkHB.jpg",
            permalink: "https://instagram.com/welkermusic/reel/DHwS2ouy5hB/",
            caption: "Thank you for an amazing night, New York! #nyc #concert #thankyou",
            timestamp: "2023-03-25T23:10:00Z",
            likes: 2765,
            comments: 98,
          },
          {
            id: "7",
            mediaUrl: "https://i.imgur.com/YqTGkHB.jpg",
            permalink: "https://instagram.com/welkermusic/p/DHJlLBuSKI9/",
            caption: "New track dropping next week! #newmusic #techno #house",
            timestamp: "2023-03-20T10:30:00Z",
            likes: 1987,
            comments: 56,
          },
        ]

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        setPosts(specificPosts.slice(0, limit))
      } catch (err) {
        console.error("Error fetching Instagram posts:", err)
        setError("Failed to load Instagram posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [username, limit])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6e1212]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#6e1212] text-white rounded-md hover:bg-[#892e2e] transition-colors"
        >
          Try Again
        </button>
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
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-white text-sm line-clamp-3 mb-2">{post.caption}</p>
            <div className="flex items-center justify-between text-white text-xs">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {post.likes}
              </span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {post.comments}
              </span>
              <Instagram size={14} />
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
