"use client";

import React from 'react';

const TourSection = () => {
  // Dados de exemplo baseados na imagem fornecida
  const tourDates = [
    {
      date: "FEB 28 FRI",
      event: "SUBSTANCE @ 9:00 PM",
      location: "Las Vegas, NV, United States",
    },
    {
      date: "MAR 1 SAT",
      event: "Mississippi Underground Hall @ 8:00 PM",
      location: "St. Louis, MO, United States",
    },
    {
      date: "MAR 7 FRI",
      event: "The Ave Live @ 9:00 PM",
      location: "Philadelphia, PA, United States",
    },
    {
      date: "MAR 8 SAT",
      event: "Kemistry Nightclub @ 9:00 PM",
      location: "Fort Lauderdale, FL, United States",
    },
    {
      date: "MAR 20 THU",
      event: "The Church Denver @ 9:00 PM",
      location: "Denver, CO, United States",
    },
    {
      date: "MAR 22 SAT",
      event: "45 East @ 10:00 PM",
      location: "Portland, OR, United States",
    },
  ];

  return (
    <section id="dates" className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Imagem do pôster do tour acima do conteúdo 
      <div className="max-w-4xl mx-auto mb-8">
        <img 
          src="/images/tour-poster.jpg" // Substitua pelo caminho da sua imagem no diretório public
          alt="WISE vs WICKED 2024 Tour Poster"
          className="w-full h-auto object-cover rounded-lg shadow-md"
          loading="lazy" // Melhora performance em telas menores
        />
      </div>*/}

      {/* Título "TOUR" centralizado */}
      <h1 className="text-4xl font-bold mt-8 mb-8 text-center uppercase">TOUR</h1>

      {/* Layout com foto à esquerda e lista de tour à direita */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Foto à esquerda */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img 
            src="/images/welkerphoto.png" // Substitua pelo caminho da foto fornecida no diretório public
            alt="Artist Photo"
            className="w-full max-w-[450px] h-auto object-cover rounded-lg shadow-md"
            loading="lazy" // Melhora performance em telas menores
          />
        </div>

        {/* Lista de datas da turnê à direita */}
        <div className="w-full md:w-2/3 space-y-6">
          {tourDates.map((tour, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-black/20 rounded-lg">
              {/* Coluna da data e evento */}
              <div className="flex-1">
                <p className="text-lg font-semibold uppercase">{tour.date}</p>
                <p className="text-white">{tour.event}</p>
                <p className="text-gray-400 text-sm">{tour.location}</p>
              </div>

              {/* Botões "TICKETS" e "RSVP" */}
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-transparent border border-white text-white rounded text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-200">
                  TICKETS
                </button>
                <button className="px-4 py-2 bg-transparent border border-white text-white rounded text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-200">
                  INFOS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourSection;