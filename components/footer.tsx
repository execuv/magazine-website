import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-muted/80 border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">EXCLUVISION</h3>
            <p className="text-muted-foreground">
              Premium digital magazines for modern readers. Quality content
              delivered straight to your device.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/why-choose-us"
                  className="text-muted-foreground hover:text-primary"
                >
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  Art & Culture
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter to get updates on new releases and
              special offers.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Your email"
                type="email"
                className="max-w-[240px]"
              />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} EXCLUVISION. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/policies/terms" className="hover:text-primary">
                Terms & Conditions
              </Link>
              <Link href="/policies/refund" className="hover:text-primary">
                Refund Policy
              </Link>
              <Link href="/policies/shipping" className="hover:text-primary">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

