import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import Footer from "../components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Meta Mirror – Debug & Preview Link Metadata Easily",
  description:
    "Meta Mirror helps you easily debug and preview Open Graph and Twitter Card metadata, ensuring accurate link previews for social media and SEO.",
  generator: "sudo-self.com",
  keywords: ["preview", "debug", "link", "metadata", "easily"],
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
    title: "Meta Mirror – Debug & Preview Link Metadata Easily",
    description:
      "Meta Mirror helps you easily debug and preview Open Graph and Twitter Card metadata, ensuring accurate link previews for social media and SEO.",
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
    title: "Meta Mirror – Debug & Preview Link Metadata Easily",
    description:
      "Meta Mirror helps you easily debug and preview Open Graph and Twitter Card metadata, ensuring accurate link previews for social media and SEO.",
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
     <body className={`${inter.className} flex min-h-screen flex-col`}>
        <ThemeProvider>
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



























