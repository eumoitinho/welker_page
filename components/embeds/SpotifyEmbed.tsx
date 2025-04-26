export default function SpotifyEmbed() {
  return (
    <div className="aspect-auto rounded-lg overflow-hidden bg-black">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/artist/2cKII1nypeEZZ1JsRSPs3t?utm_source=generator&theme=0"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}
