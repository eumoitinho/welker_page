export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <img src="/images/wtype.svg?height=50&width=150" alt="WELKER Logo" className="h-12 w-auto mb-6" />

          <div className="flex gap-6 mb-6">
            <a
              href="https://instagram.com/welkermusic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#892e2e] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@musicwelker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#892e2e] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#892e2e] transition-colors"
            >
              Spotify
            </a>
            <a
              href="https://soundcloud.com/welkermusic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#892e2e] transition-colors"
            >
              SoundCloud
            </a>
          </div>

          <div className="flex gap-6 mb-6 text-sm">
            <a href="#contact" className="text-white hover:text-[#892e2e] transition-colors">
              CONTACT
            </a>
            <a href="/privacy" className="text-white hover:text-[#892e2e] transition-colors">
              PRIVACY
            </a>
            <a href="/terms" className="text-white hover:text-[#892e2e] transition-colors">
              TERMS OF SERVICE
            </a>
          </div>

          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} WELKER Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
