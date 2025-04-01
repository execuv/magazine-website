"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ShoppingCart, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/authContext"
import { useCart } from "@/context/CartContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/firebase/auth"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { userLoggedIn, currentUser } = useAuth()
  const { cartItems } = useCart()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const userInitial = currentUser?.email?.charAt(0).toUpperCase() || "U"

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Magazines", href: "/magazines" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo on the left */}
        <Link href="/" className="font-bold text-2xl">
        EXECU<span className="text-primary">VISION</span>
        </Link>

        {/* Desktop Navigation - moved to right */}
        <div className="hidden md:flex items-center gap-6">
          {/* Navigation menu now on the right */}
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === item.href &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* User controls remain on the right */}
          {isMounted && (
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {userLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{userInitial}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/cart">Cart</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="default" size="sm">
                  <Link href="/auth/login">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          {isMounted && (
            <>
              <Link href="/cart">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 py-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "px-2 py-1 text-lg",
                          pathname === item.href && "font-medium text-primary"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      {userLoggedIn ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-2">
                            Signed in as{" "}
                            <span className="font-medium">
                              {currentUser?.email}
                            </span>
                          </p>
                          <Link
                            href="/dashboard"
                            className="block px-2 py-1 text-lg"
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="px-2 py-1 text-lg text-red-600 mt-2"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <Button asChild className="w-full">
                          <Link href="/auth/login">
                            <User className="h-4 w-4 mr-2" />
                            Login
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
