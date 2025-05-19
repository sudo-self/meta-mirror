import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
 title: "Meta Mirror – Preview & Debug Link Metadata Easily",
 description: "Easily debug, validate, and preview Open Graph and Twitter Card metadata to ensure accurate link previews across social media platforms.",
  generator: "sudo-self.com",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-192-maskable.png", type: "image/png", sizes: "192x192", purpose: "maskable" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-512-maskable.png", type: "image/png", sizes: "512x512", purpose: "maskable" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  },
  openGraph: {
   title: "Meta Mirror – Preview & Debug Link Metadata Easily",
   description: "Easily debug, validate, and preview Open Graph and Twitter Card metadata to ensure accurate link previews across social media platforms.",
    url: "https://meta-mirror.vercel.app", 
    siteName: "Meta-Mirror",
    images: [
      {
        url: "https://meta-mirror.vercel.app/og.png", 
        width: 1200,
        height: 630,
        alt: "Open Graph Debugger Image"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Mirror – Preview & Debug Link Metadata Easily",
    description: "Easily debug, validate, and preview Open Graph and Twitter Card metadata to ensure accurate link previews across social media platforms.",
    images: ["https://meta-mirror.vercel.app/og.png"] 
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}











