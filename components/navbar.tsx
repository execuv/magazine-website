"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="py-2 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold">ASTU</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={`text-sm font-medium ${isActive("/") ? "text-primary" : "hover:text-primary"}`}>
            Home
          </Link>
          <Link
            href="/products"
            className={`text-sm font-medium ${isActive("/products") ? "text-primary" : "hover:text-primary"}`}
          >
            Products
          </Link>
          <Link
            href="/blogs"
            className={`text-sm font-medium ${isActive("/blogs") || pathname.startsWith("/blogs/") ? "text-primary" : "hover:text-primary"}`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${isActive("/about") ? "text-primary" : "hover:text-primary"}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium ${isActive("/contact") ? "text-primary" : "hover:text-primary"}`}
          >
            Contact
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => setIsAuthModalOpen(true)}>
              Sign In
            </Button>
            <Button onClick={() => setIsAuthModalOpen(true)}>Sign Up</Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/"
              className={`text-sm font-medium ${isActive("/") ? "text-primary" : "hover:text-primary"}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-sm font-medium ${isActive("/products") ? "text-primary" : "hover:text-primary"}`}
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              href="/blogs"
              className={`text-sm font-medium ${isActive("/blogs") || pathname.startsWith("/blogs/") ? "text-primary" : "hover:text-primary"}`}
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${isActive("/about") ? "text-primary" : "hover:text-primary"}`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${isActive("/contact") ? "text-primary" : "hover:text-primary"}`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button
              onClick={() => {
                setIsAuthModalOpen(true)
                setIsMenuOpen(false)
              }}
            >
              Sign In / Sign Up
            </Button>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </header>
  )
}

