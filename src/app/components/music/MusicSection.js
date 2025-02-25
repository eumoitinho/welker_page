// components/MusicSection.js

import MusicGrid from "./MusicCard";

const MusicSection = () => {
    // Substitua o URL abaixo pelo link da faixa ou playlist do SoundCloud que você deseja incorporar
    const soundCloudEmbedUrl = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";
  
    return (
      <section id="music" className="py-16 bg-black text-white">
<MusicGrid />
      </section>
    );
  };
  
  export default MusicSection;