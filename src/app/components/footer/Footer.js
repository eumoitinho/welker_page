"use client";

import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Logotipo JAUZ à esquerda */}
                <div className="w-1/2 md:w-auto flex justify-center md:justify-start">
                    <Image
                        src="/images/wtype.svg" // Substitua pelo caminho do logotipo no diretório public
                        alt="Welker Logo"
                        width={200} // Ajuste o tamanho conforme necessário
                        height={100} // Ajuste o tamanho conforme necessário
                        className="object-contain"
                    />
                </div>

                {/* Formulário e redes sociais ao centro */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-end gap-4">
                    {/* Título "FOLLOW JAUZ" */}
                    <h2 className="text-lg font-semibold text-blue-400">FOLLOW WELKER</h2>

                    {/* Formulário de e-mail */}
                    <div className="flex w-full max-w-md">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-2 bg-white text-black rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button className="px-4 py-2 bg-white text-black rounded-r border border-gray-300 hover:bg-gray-200 transition-colors duration-200">
                            FOLLOW
                        </button>
                    </div>

                    {/* Ícones de redes sociais */}
                    <div className="flex gap-4 mt-2">
                        <a href="https://www.instagram.com/welkermusic" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                            <span className="sr-only">Instagram</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                            </svg>
                        </a>
                        <a href="https://open.spotify.com/intl-pt/artist/2cKII1nypeEZZ1JsRSPs3t?si=WA0ghgi5TK2ik-00aimvGg" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                            <span className="sr-only">Spotify</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-spotify" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
                            </svg>
                        </a>
                        <a href="https://soundcloud.com/welkermusic" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                            <span className="sr-only">SoundCloud</span>
                            <svg viewBox="0 0 50 23" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path d="M49.139 15.466a6.88 6.88 0 01-6.966 6.495H25.429a1.404 1.404 0 01-1.39-1.396V2.536a1.536 1.536 0 01.925-1.468S26.504 0 29.748 0a10.973 10.973 0 015.63 1.547 11.14 11.14 0 015.242 7.26 6.465 6.465 0 011.776-.242 6.703 6.703 0 016.744 6.901h-.001zm-27.19-11.79c.505 6.115.872 11.692 0 17.787a.544.544 0 01-1.081 0c-.813-6.043-.46-11.725 0-17.787a.542.542 0 01.83-.52c.176.11.274.313.25.52zM18.56 21.469a.569.569 0 01-1.127 0 67.976 67.976 0 010-15.695.57.57 0 011.134 0c.673 5.21.67 10.485-.007 15.695zM15.166 5.243c.55 5.603.8 10.623-.006 16.213a.545.545 0 01-1.088 0c-.78-5.518-.518-10.682 0-16.213.03-.28.266-.49.547-.49.28 0 .517.21.547.49zm-3.4 16.233a.559.559 0 01-1.108 0 57.407 57.407 0 010-14.654.563.563 0 111.127 0 53.55 53.55 0 01-.02 14.654zM8.37 10.486c.859 3.8.472 7.156-.032 11.029a.532.532 0 01-1.05 0c-.458-3.82-.838-7.255-.032-11.03a.558.558 0 011.114.001zm-3.388-.577c.787 3.893.53 7.189-.02 11.095-.065.577-1.054.583-1.107 0-.498-3.847-.734-7.242-.02-11.095a.578.578 0 011.147 0zm-3.42 1.887c.825 2.582.543 4.68-.033 7.327a.537.537 0 01-1.07 0c-.497-2.595-.7-4.738-.044-7.327a.575.575 0 011.146 0z" fill="#f50" /></svg>
                        </a>
                    </div>

                    {/* Link "ABOUT" */}
                    <a href="/about" className="mt-2 text-white hover:text-gray-300 text-sm">
                        ABOUT
                    </a>
                </div>
            </div>

            {/* Links de rodapé inferior */}
            <div className="mt-8 text-center text-gray-400 text-sm">
                <a href="/contact" className="hover:text-white">CONTACT</a> |
                <a href="/privacy" className="hover:text-white"> PRIVACY</a> |
                <a href="/terms" className="hover:text-white"> TERMS OF SERVICE</a>
            </div>
        </footer>
    );
};

export default Footer;