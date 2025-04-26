export default function SoundCloudEmbed() {
  return (
    <div className="aspect-auto rounded-lg overflow-hidden bg-black">
      <iframe
        width="100%"
        height="450"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1175616&color=%236e1212&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      ></iframe>
    </div>
  )
}
