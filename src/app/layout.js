import { Geist, Geist_Mono, Overpass } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const overpasSans = Overpass({
  variable: "--font-overpass-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "WELKER",
  description: "Electronic music producer and DJ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${overpasSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
