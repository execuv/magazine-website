"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/authContext"
import { toast } from "sonner"
import { logout } from "@/firebase/auth"
import CartButton from "@/components/cart-button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { userLoggedIn } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = async () => {
    const success = await logout()
    if (success) {
      toast.success("Logged out successfully")
    } else {
      toast.error("Failed to logout")
    }
  }

  return (
    <header className="px-4 lg:px-6 h-20 flex items-center border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold">ASTU</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
              isActive("/") ? "text-primary" : "hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/magazines"
            className={`text-sm font-medium ${
              isActive("/products") ? "text-primary" : "hover:text-primary"
            }`}
          >
            Products
          </Link>
          <Link
            href="/blogs"
            className={`text-sm font-medium ${
              isActive("/blogs") || pathname.startsWith("/blogs/")
                ? "text-primary"
                : "hover:text-primary"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${
              isActive("/about") ? "text-primary" : "hover:text-primary"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium ${
              isActive("/contact") ? "text-primary" : "hover:text-primary"
            }`}
          >
            Contact
          </Link>
          <div className="flex items-center gap-4">
            <CartButton />
            {userLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                href="auth/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/"
              className={`text-sm font-medium ${
                isActive("/") ? "text-primary" : "hover:text-primary"
              }`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-sm font-medium ${
                isActive("/products") ? "text-primary" : "hover:text-primary"
              }`}
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              href="/blogs"
              className={`text-sm font-medium ${
                isActive("/blogs") || pathname.startsWith("/blogs/")
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${
                isActive("/about") ? "text-primary" : "hover:text-primary"
              }`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${
                isActive("/contact") ? "text-primary" : "hover:text-primary"
              }`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
            {userLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
