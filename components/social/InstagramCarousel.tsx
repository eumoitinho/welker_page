"use client"

import { useEffect, useState, useRef } from "react"
import { Instagram, ChevronLeft, ChevronRight } from "lucide-react"
import { getInstagramPosts, type InstagramPost } from "../../app/api/instagram"

interface InstagramCarouselProps {
  username: string
}

export default function InstagramCarousel({ username }: InstagramCarouselProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await getInstagramPosts(username)
        setPosts(data)
      } catch (err) {
        console.error("Error fetching Instagram posts:", err)
        setError("Failed to load Instagram posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [username])

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: "smooth" })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-gray-400">No posts found for @{username}</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Carousel Navigation */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 md:p-3 focus:outline-none hidden md:block"
        aria-label="Previous posts"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Instagram Carousel */}
      <div ref={carouselRef} className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden rounded-lg flex-shrink-0 w-[300px] md:w-[350px] aspect-square"
          >
            <img
              src={post.mediaUrl || "/placeholder.svg"}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

      {/* Carousel Navigation */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 md:p-3 focus:outline-none hidden md:block"
        aria-label="Next posts"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
