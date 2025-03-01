"use client";

// components/MusicCard.js
import React from "react";

const MusicCard = ({ title, imageUrl, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-[550px] bg-black text-white shadow-lg overflow-hidden md:hover:scale-105 transition-all duration-50 block"
    >
      {/* Imagem do álbum */}
      <div className="h-[550px] w-full relative">
        <img
          src={imageUrl}
          alt={`${title} album cover`}
          className="w-full h-full object-cover"
          loading="lazy" // Melhora performance em telas menores
        />
        {/* Overlay para efeito de profundidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Conteúdo do card (sem botão) */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-center uppercase tracking-wide">
          {title}
        </h3>
      </div>
    </a>
  );
};

// Componente pai para renderizar múltiplos cards com botões fora dos cards
const MusicGrid = () => {
  // Dados de exemplo com links
  const musicItems = [
    {
      title: "Element",
      imageUrl: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg",
      link: "https://soundcloud.com/diynamic-music/welker-element", // Substitua pelo link real
    },
    {
      title: "EDMID Guest Mix 451",
      imageUrl: "https://i1.sndcdn.com/artworks-jMMzsPErJYs1LD7N-ttqbfw-t500x500.jpg",
      link: "https://soundcloud.com/edmidentity/edmid-guest-mix-451-welker", // Substitua pelo link real
    },
    {
      title: "Repopulation Mars - Instagram Reels",
      imageUrl: "./images/postig.png",
      link: "https://www.instagram.com/reel/DGgiTjQSuZd/?igsh=NTc4MTIwNjQ2YQ%3D%3D", // Substitua pelo link real do Instagram
    },
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 md:mb-8 text-center text-white uppercase">Music</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 justify-center items-center">
        {musicItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <MusicCard
              title={item.title}
              imageUrl={item.imageUrl}
              link={item.link}
            />
            {/* Botão de ouvir fora do card, redirecionando para o link */}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-2 border-2 border-white text-white rounded-full font-semibold transition-all duration-200 hover:bg-white hover:text-black"
            >
              <span className="flex items-center justify-center gap-2">
                LISTEN
              </span>
            </a>
          </div>
        ))}
      </div>
      <div className="col-span-12 flex justify-center mt-12 md:mt-16">
        <a
          href="https://soundcloud.com/welkermusic"
          className="text-xl font-bold text-white uppercase"
          target="_blank"
          rel="noopener noreferrer"
        >
          View more music
        </a>
      </div>
    </div>
  );
};

export default MusicGrid;