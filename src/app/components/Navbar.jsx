"use client";
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import Navlink from './Navlink';
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import MenuOverlay from './MenuOverlay';

const navLinks = [
    {
        title: 'SOBRE',
        path: '#about',
    },
    {
        title: 'PROJETOS',
        path: '#projects',
    },
    {
        title: 'CONTATO',
        path: '#contact',
    }
]

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    // Função para fechar o menu quando se clica em qualquer lugar fora do menu
    const handleCloseMenu = () => {
        setNavbarOpen(false);
    };

    return (
        <nav className={styles.navbar}>
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
                <ul className={styles.navLinks}>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Navlink href={link.path} title={link.title} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.logo}>
                <Link href="/">Jauz Official</Link>
            </div>
        </nav>
    );
};

export default Navbar;