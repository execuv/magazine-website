import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Toaster } from "sonner"
import { AuthProvider } from "@/authContext"
import { CartProvider } from "@/context/CartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MagPDF - Premium PDF Magazines",
  description:
    "Discover our curated collection of high-quality digital magazines.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

import "./globals.css"
