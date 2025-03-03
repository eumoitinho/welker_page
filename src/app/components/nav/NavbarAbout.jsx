"use client";
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';
import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import MenuOverlay from './MenuOverlay';
import Image from 'next/image';
import NavlinkAbout from './NavlinkAbout';

const navLinks = [
    {
        title: 'HOME',
        path: './',
    }
]

const NavbarAbout = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Função para fechar o menu quando se clica em qualquer lugar fora do menu
    const handleCloseMenu = () => {
        setNavbarOpen(false);
    };

    // Detectar scroll para adicionar o overlay
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10); // Ativa o overlay após 10px de scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Limpa o evento ao desmontar
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? 'bg-gradient-to-b from-black/70 to-transparent' : 'bg-transparent'}`}>
            <div className="mobile-menu block md:hidden">
                {!navbarOpen ? (
                    <button 
                        onClick={() => setNavbarOpen(true)} 
                        className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
                    >
                        <Bars3Icon className="h-5 w-5" />
                    </button>
                ) : (
                    <button 
                        onClick={() => setNavbarOpen(false)} 
                        className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                )}
            </div>
            {/* Menu Overlay for mobile */}
            {navbarOpen && (
                <div 
                    className="fixed top-0 left-0 w-full h-full bg-black z-50 opacity-90"
                    onClick={handleCloseMenu} // Fechar o menu ao clicar em qualquer lugar do overlay
                >
                    <MenuOverlay links={navLinks} onClose={handleCloseMenu} />
                </div>
            )}
            {/* Desktop Menu */}
            <div className="menu hidden md:block md:w-auto" id="navbar">
                <ul className={styles.navLinksAbout}>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <NavlinkAbout href={link.path} title={link.title} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.logo}>
                <Image width={50} height={50} src="/images/wtype.svg" alt="Logo" />
            </div>
        </nav>
    );
};

export default NavbarAbout;