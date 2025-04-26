import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Roboto } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "WELKER | Official Website",
  description: "Electronic music producer and DJ",
  generator: "v0.dev",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${montserrat.variable} ${roboto.variable}`}>{children}</body>
    </html>
  )
}
