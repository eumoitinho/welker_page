"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link"; // Importando Link para navegação

const HeroAbout = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && bgRef.current) {
        const scrollY = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        // Calcula o movimento do background baseado na posição de rolagem
        const translateY = (scrollY - sectionTop) * 0.3; // Ajuste para suavizar o movimento
        bgRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    // Função para atualizar a imagem de fundo com base no tamanho da tela
    const updateBackgroundImage = () => {
      if (bgRef.current) {
        const isMobile = window.innerWidth < 768; // Breakpoint md é aproximadamente 768px
        bgRef.current.style.backgroundImage = isMobile
          ? `url('/images/about.jpg')`
          : `url('/images/aboutme2.png')`;
      }
    };

    // Adiciona o evento de scroll e resize
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateBackgroundImage); // Atualiza ao redimensionar a tela
    updateBackgroundImage(); // Chama inicialmente para definir a imagem correta

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBackgroundImage); // Limpa o evento de resize
    };
  }, []);

  return (
    <main className="flex-1">
      {/* Seção da imagem com parallax */}
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-gray-900"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundAttachment: "fixed", // Mantém o background fixo enquanto o conteúdo rola
          }}
        />
      </section>

      {/* Seção do texto com fundo #6e1212 */}
      <section className="bg-black text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 md:mb-8 text-center text-white uppercase md:hidden">About</h1>
          <p className="text-lg mb-4">
            The <span className="font-bold">WELKER</span> project, led by Brazilian producer Eduardo
            Welker, is rapidly establishing itself as a force to be reckoned
            with in the electronic music scene. After a decade of honing his
            craft in commercial music, WELKER made the bold decision to dive
            headfirst into the underground world. His unique fusion of indie
            dance, techno, and house has quickly caught the attention of
            industry giants such as Solomun, CamelPhat, Vintage Culture, Gordo,
            Massano, Innellea, Max Styler, Silver Panda, Adan Ten, and many
            others, who have been playing his unreleased IDs in their sets.
          </p>
          <p className="text-lg mb-4">
            With releases scheduled on prestigious labels for early 2025,
            WELKER made a remarkable debut on Solomun’s renowned Diynamic
            label, reaching #1 in the Indie Dance release chart, and #3 in the
            overall Indie Dance chart. He is on the verge of becoming a global
            sensation. WELKER has two confirmed releases: a 2-track EP on the
            iconic Repopulate Mars, led by Lee Foss coming out on March 7, and
            a three-track EP on CamelPhat’s label, When Stars Align on April 4.
          </p>
          <p className="text-lg mb-4">
            WELKER makes his “live” debut on April 19 at the 99 Scott
            (Courtyard) in Brooklyn, New York City with Grey Area. WELKER will
            be announcing more shows on his debut Spring Tour in the upcoming
            month.
          </p>
          <p className="text-lg mb-6">
            His infectious energy and undeniable talent position him at the
            forefront of a new “Brazilian Storm” sweeping across the electronic
            music landscape.
          </p>
          <p className="text-lg mb-24">
            The WELKER project, led by Brazilian producer Eduardo Welker, is
            rapidly establishing itself as a force to be reckoned with in the
            electronic music scene. After a decade of honing his craft in
            commercial music, WELKER made the bold decision to dive headfirst
            into the underground world. His unique fusion of indie dance,
            techno, and house has quickly caught the attention of industry
            giants, and his infectious energy, and undeniable talent position
            him at the forefront of a new “Brazilian Storm” sweeping across the
            electronic music landscape.
          </p>
          {/* Botão HOME */}
          <div className="flex justify-center mt-8">
            <Link
              href="./"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg uppercase transition-all duration-300 hover:bg-white hover:text-black"
            >
              HOME
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroAbout;