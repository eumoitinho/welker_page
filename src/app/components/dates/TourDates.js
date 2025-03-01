"use client";

import React from 'react';

const TourSection = () => {
  // Dados de exemplo com links adicionados
  const tourDates = [
    {
      date: "SAT APR 19",
      event: "99 Scott’s courtyard @ 4:00 PM",
      location: "New York, NY, United States",
      ticketLink: "https://dice.fm/event/k63abp-ayybo-at-99-scott-courtyard-by-gray-area-19th-apr-99-scott-courtyard-new-york-city-tickets?lng=en-US", // Substitua pelo link real
      infoLink: "https://dice.fm/event/k63abp-ayybo-at-99-scott-courtyard-by-gray-area-19th-apr-99-scott-courtyard-new-york-city-tickets?lng=en-US"    // Substitua pelo link real
    },
    {
      date: "FRI MAY 16",
      event: "Odd Mob at The Concourse Project @ 9:00 PM",
      location: "Austin, TX, United States",
      ticketLink: "https://www.seetickets.us/event/Odd-Mob-at-The-Concourse-Project/637981", // Substitua pelo link real
      infoLink: "https://www.seetickets.us/event/Odd-Mob-at-The-Concourse-Project/637981"      // Substitua pelo link real
    },
    {
      date: "TBA",
      event: "TBA @ ??:00 PM",
      location: "TBA",
      ticketLink: "", // Sem link para eventos "TBA"
      infoLink: ""    // Sem link para eventos "TBA"
    },
    {
      date: "TBA",
      event: "TBA @ ??:00 PM",
      location: "TBA",
      ticketLink: "",
      infoLink: ""
    },
    {
      date: "TBA",
      event: "TBA @ ??:00 PM",
      location: "TBA",
      ticketLink: "",
      infoLink: ""
    },
    {
      date: "TBA",
      event: "TBA @ ??:00 PM",
      location: "TBA",
      ticketLink: "",
      infoLink: ""
    },
  ];

  return (
    <section id="dates" className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Título "TOUR" centralizado */}
      <h1 className="text-4xl font-bold mt-8 mb-8 text-center uppercase">TOUR</h1>

      {/* Layout com foto à esquerda e lista de tour à direita */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Foto à esquerda */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img 
            src="/images/welkerphoto.jpg" // Substitua pelo caminho da foto fornecida no diretório public
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

              {/* Botões "TICKETS" e "INFOS" */}
              <div className="flex gap-4">
                <a 
                  href={tour.ticketLink || "#"} // Usa "#" como fallback se não houver link
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-4 py-2 bg-transparent border border-white text-white rounded text-sm font-semibold transition-colors duration-200 ${
                    !tour.ticketLink ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-black"
                  }`}
                >
                  TICKETS
                </a>
                <a 
                  href={tour.infoLink || "#"} // Usa "#" como fallback se não houver link
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-4 py-2 bg-transparent border border-white text-white rounded text-sm font-semibold transition-colors duration-200 ${
                    !tour.infoLink ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-black"
                  }`}
                >
                  INFOS
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourSection;