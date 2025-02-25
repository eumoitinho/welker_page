"use client";

// components/MusicCard.js
import React from 'react';

const MusicCard = ({ title, imageUrl }) => {
  return (
    <div className="w-full max-w-[550px] bg-black text-white shadow-lg overflow-hidden md:hover:scale-105 transition-all duration-50">
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
    </div>
  );
};

// Componente pai para renderizar múltiplos cards com botões fora dos cards
const MusicGrid = () => {
  // Dados de exemplo
  const musicItems = [
    {
      title: "Element",
      imageUrl: "https://i1.sndcdn.com/artworks-KNQytcAmBs2BbodH-CESBOw-t500x500.jpg",
    },
    {
      title: "EDMID Guest Mix 451",
      imageUrl: "https://i1.sndcdn.com/artworks-jMMzsPErJYs1LD7N-ttqbfw-t500x500.jpg",
    },
    {
      title: "Top Board Radio 02 - WELKER",
      imageUrl: "https://i1.sndcdn.com/artworks-j6wI3mt5DQP5xAK5-bHf7Qw-t500x500.jpg",
    },
  ];

  const handleListenClick = (title) => {
    console.log(`Playing ${title}`);
    // Aqui você pode adicionar a lógica para reproduzir a música
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 md:mb-8 text-center text-white uppercase">Music</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 justify-center items-center">
        {musicItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <MusicCard
              title={item.title}
              imageUrl={item.imageUrl}
            />
            {/* Botão de ouvir fora do card, outline branco */}
            <button
              onClick={() => handleListenClick(item.title)}
              className="mt-4 px-6 py-2 border-2 border-white text-white rounded-full font-semibold transition-all duration-200 hover:bg-white hover:text-black"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-sm uppercase">▶</span>
                LISTEN
              </span>
            </button>
          </div>
        ))}
      </div>
      <div className="col-span-12 flex justify-center mt-12 md:mt-16">
        <a 
          href="https://soundcloud.com/welkermusic" 
          className="text-xl font-bold text-white uppercase"
        >
          View more music
        </a>
      </div>
    </div>
  );
};

export default MusicGrid;