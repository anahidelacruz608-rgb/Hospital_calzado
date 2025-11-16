import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const _geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hospital del calzado | Artículos de piel y calzado de primera calidad",
  description: "Artículos de cuero, calzado y accesorios hechos a mano",
  generator: "PatricioVargasR && v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.ico",
        type: "image/icon",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={_playfair.variable}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
