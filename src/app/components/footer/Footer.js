"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-transparent text-white p-4 md:p-8">
           <div className="z-10 mt-8 flex justify-center gap-6 w-full col-span-2">
        <Link
          href="#contact"
          className="text-white text-sm font-medium hover:text-[#6e1212] transition-colors"
        >
          CONTACT
        </Link>
        <Link
          href="/privacy"
          className="text-white text-sm font-medium hover:text-[#6e1212] transition-colors"
        >
          PRIVACY
        </Link>
        <Link
          href="/terms"
          className="text-white text-sm font-medium hover:text-[#6e1212] transition-colors"
        >
          TERMS OF SERVICE
        </Link>
      </div>
        </footer>
    );
};

export default Footer;