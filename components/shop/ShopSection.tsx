"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ShoppingCart, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

// Updated product data with real images
const products = [
  {
    id: 1,
    name: "WELKER Logo T-Shirt",
    price: 29.99,
    image: "/images/products/welker-tshirt-1.png",
    description: "Classic black t-shirt with WELKER logo and graphic design",
    category: "clothing",
    externalUrl: "https://shop.welkermusic.com/products/welker-logo-tshirt",
  },
  {
    id: 2,
    name: "EVERYBODY T-Shirt",
    price: 34.99,
    image: "/images/products/welker-tshirt-2.png",
    description: "Black t-shirt with skull design and 'EVERYBODY' text on back",
    category: "clothing",
    externalUrl: "https://shop.welkermusic.com/products/everybody-tshirt",
  },
  {
    id: 3,
    name: "WELKER Skull Hoodie",
    price: 59.99,
    image: "/images/products/welker-hoodie-1.png",
    description: "Premium black hoodie with skull shoulder design",
    category: "clothing",
    externalUrl: "https://shop.welkermusic.com/products/welker-skull-hoodie",
  },
  {
    id: 4,
    name: "LOST IN THE SOUND T-Shirt",
    price: 32.99,
    image: "/images/products/welker-tshirt-3.png",
    description: "Black t-shirt with 'LOST IN THE SOUND' text and skull graphics",
    category: "clothing",
    externalUrl: "https://shop.welkermusic.com/products/lost-in-sound-tshirt",
  },
  {
    id: 5,
    name: "GROOVE SOCIETY T-Shirt",
    price: 34.99,
    image: "/images/products/groove-tshirt.png",
    description: "Black t-shirt with 'GROOVE SOCIETY' text on back",
    category: "clothing",
    externalUrl: "https://shop.welkermusic.com/products/groove-society-tshirt",
  },
  {
    id: 6,
    name: "WELKER LA Hoodie",
    price: 59.99,
    image: "/images/products/welker-hoodie-2.png",
    description: "Black hoodie with LA and WELKER logo design",
    category: "clothing",
    externalUrl: "https://shop.welkermusic.com/products/welker-la-hoodie",
  },
  {
    id: 7,
    name: "Element Vinyl",
    price: 24.99,
    image: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg",
    description: "Limited edition vinyl of 'Element'",
    category: "music",
    externalUrl: "https://shop.welkermusic.com/products/element-vinyl",
  },
  {
    id: 8,
    name: "Everybody EP Vinyl",
    price: 24.99,
    image: "https://i1.sndcdn.com/artworks-Drl6AYm71zFIQR8B-POy5fA-t500x500.png",
    description: "Limited edition vinyl of 'Everybody EP'",
    category: "music",
    externalUrl: "https://shop.welkermusic.com/products/everybody-ep-vinyl",
  },
]

export default function ShopSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView && sectionRef.current) {
      sectionRef.current.classList.add("animate-fade-in-up")
    }
  }, [inView])

  useEffect(() => {
    if (activeCategory) {
      setFilteredProducts(products.filter((product) => product.category === activeCategory))
    } else {
      setFilteredProducts(products)
    }
  }, [activeCategory])

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  // Get unique categories
  const categories = Array.from(new Set(products.map((product) => product.category)))

  return (
    <section
      id="shop"
      ref={(el) => {
        // @ts-ignore - combining refs
        ref(el)
        sectionRef.current = el
      }}
      className="py-20 bg-gradient-to-b from-black to-[#6e1212]/30 opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center uppercase">Shop</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Official WELKER merchandise. All items ship worldwide.
        </p>

        {/* Category filters */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full border-2 transition-colors ${
                activeCategory === null
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full border-2 transition-colors capitalize ${
                  activeCategory === category
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="relative">
          {/* Carousel Navigation */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 md:p-3 focus:outline-none hidden md:block"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Products Carousel */}
          <div ref={carouselRef} className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] bg-[#121212] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white bg-black/40 px-6 py-3 rounded-lg">SOON</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded-full capitalize">
                    {product.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-white/80 transition-colors"
                    >
                      <ShoppingCart size={16} />
                      <span>Coming Soon</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 md:p-3 focus:outline-none hidden md:block"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://shop.welkermusic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg uppercase transition-all duration-300 hover:bg-white hover:text-black"
          >
            <ShoppingCart size={20} />
            Visit Full Store
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>All merchandise is shipped from our official store partner. Shipping and return policies apply.</p>
        </div>
      </div>
    </section>
  )
}
