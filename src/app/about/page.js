"use client";

import React, { useEffect, useRef } from 'react';
import Footer from "../components/footer/Footer";
import NavbarAbout from "../components/nav/NavbarAbout";
import EmailSection from "../components/footer/EmailSection";
import HeroAbout from '../components/about/HeroAbout';

const AboutPage = () => {
   

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar simplificado */}
<NavbarAbout/>

      {/* Conteúdo da página About Me */}
    <HeroAbout/>
      {/* Footer reutilizado */}
      <div className="container mx-auto mt-24 px-12 py-4">
      <EmailSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;