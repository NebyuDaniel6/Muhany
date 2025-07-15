import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"
import { cn } from "@/lib/utils"

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
})

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "muhanychocos.shop",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(serif.variable, sans.variable, "font-sans antialiased")}>{children}</body>
    </html>
  )
}
