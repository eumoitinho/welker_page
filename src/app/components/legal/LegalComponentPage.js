"use client";

import React from "react";
import Link from "next/link"; // Importando Link para navegação

const LegalComponentPage = ({ title, text }) => {
  // Função para formatar o texto em parágrafos
  const formatText = (textContent) => {
    if (!textContent) return null;

    // Se text for uma string, divida por quebras de linha (\n) ou crie parágrafos
    if (typeof textContent === "string") {
      return textContent
        .split("\n")
        .filter((paragraph) => paragraph.trim()) // Remove parágrafos vazios
        .map((paragraph, index) => (
          <p key={index} className="text-lg mb-4">
            {paragraph.trim()}
          </p>
        ));
    }

    // Se text for um array de strings, mapeie cada item como um parágrafo
    if (Array.isArray(textContent)) {
      return textContent
        .filter((paragraph) => paragraph.trim()) // Remove parágrafos vazios
        .map((paragraph, index) => (
          <p key={index} className="text-lg mb-4">
            {paragraph.trim()}
          </p>
        ));
    }

    // Se o formato não for reconhecido, renderize como texto simples
    return <p className="text-lg mb-4">{textContent}</p>;
  };

  return (
    <main className="flex-1">
      {/* Seção do texto com fundo #6e1212 */}
      <section className="bg-black text-white mt-24 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 md:mb-8 text-center text-white uppercase">
            {title}
          </h1>
          {/* Renderiza o texto formatado dinamicamente */}
          <div className="text-content">{formatText(text)}</div>
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

export default LegalComponentPage;