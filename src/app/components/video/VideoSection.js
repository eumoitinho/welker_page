"use client";

import React, { useEffect, useRef } from 'react';

const VideoSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  // Efeito para o parallax ao rolar
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && bgRef.current) {
        const scrollY = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;

        // Calcula o movimento do background baseado na posição de rolagem
        const translateY = (scrollY - sectionTop) * 0.3; // Ajuste para suavizar o movimento
        bgRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Limpa o evento ao desmontar
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] overflow-hidden bg-gray-900 text-white"
      id='videos'
    >
      {/* Background fixo com efeito parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundAttachment: 'fixed', // Mantém o background fixo enquanto o conteúdo rola
          backgroundImage: `url('/images/videobg.png')`, // Caminho correto para a imagem no diretório public
        }}
      />

      {/* Conteúdo da seção (título e vídeo centralizados no meio) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
        {/* Título centralizado verticalmente */}
        <h2 className="text-4xl font-bold mb-8 text-white">VIDEOS</h2>

        {/* Vídeo centralizado verticalmente e horizontalmente */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/BnGmns9hg1Y?t=4509" // Substitua pelo ID do seu vídeo do YouTube
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy" // Carrega o vídeo apenas quando visível
            ></iframe>
          </div>
        </div>

        {/* Texto ou informações adicionais (opcional, centralizado abaixo) */}
        <div className="col-span-12 flex justify-center mt-16">
        <a 
          href="https://www.youtube.com/@musicwelker" 
          className="text-xl font-bold text-white uppercase"
        >
          View more
        </a>
      </div>
      </div>
    </section>
  );
};

export default VideoSection;