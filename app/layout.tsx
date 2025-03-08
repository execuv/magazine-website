import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/authContext"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "sonner"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Magazine Shop",
  description: "Buy your favorite magazines",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
