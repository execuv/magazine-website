"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { type Magazine, getMagazineById } from "@/firebase/firestore"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/authContext"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Add after the imports
const hideScrollbarStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

export default function MagazineDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const [magazine, setMagazine] = useState<Magazine | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState(false)
  const [formatSelection, setFormatSelection] = useState<
    "digital" | "physical"
  >("digital")
  const { addItem } = useCart()
  const { userLoggedIn } = useAuth()

  useEffect(() => {
    const fetchMagazine = async () => {
      try {
        const data = await getMagazineById(params.slug)
        if (!data) {
          setError("Magazine not found")
          return
        }
        setMagazine(data)
        setSelectedImage(data.image || "/placeholder.svg")
      } catch (err) {
        setError("Failed to fetch magazine")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMagazine()
  }, [params.slug])

  const handleAddToCart = async () => {
    if (!userLoggedIn) {
      toast.error("Please login to add items to cart")
      return
    }

    try {
      setAddingToCart(true)
      const isPhysical = formatSelection === "physical"
      await addItem(params.slug, isPhysical)
      toast.success(`Added to cart (${formatSelection} edition)`)
    } catch (error) {
      toast.error("Failed to add to cart")
    } finally {
      setAddingToCart(false)
    }
  }

  const handleImageSelect = (image: string) => {
    setSelectedImage(image)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Skeleton className="w-full h-[500px] rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-full h-24 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-3/4 h-10 rounded-md" />
            <Skeleton className="w-1/4 h-8 rounded-md" />
            <Skeleton className="w-full h-32 rounded-md" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-full h-6 rounded-md" />
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <Skeleton className="w-32 h-10 rounded-md" />
              <Skeleton className="w-32 h-10 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <h2 className="text-xl font-semibold text-red-600">{error}</h2>
            <p className="text-muted-foreground">
              We couldn't find the magazine you're looking for.
            </p>
            <Button asChild>
              <Link href="/magazines">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Magazines
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!magazine) return null

  // Calculate delivery cost - assuming a default 10% of magazine price if not specified
  const deliveryPrice =
    magazine.deliveryPrice || Math.round(magazine.price * 0.1)
  const physicalPrice =
    magazine.price + (formatSelection === "physical" ? deliveryPrice : 0)

  return (
    <>
      <style jsx global>
        {hideScrollbarStyles}
      </style>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/magazines"
              className="hover:text-primary transition-colors"
            >
              Magazines
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {magazine.name}
            </span>
          </nav>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-muted/20 border shadow-sm flex items-center justify-center h-[550px]">
              <img
                src={selectedImage || magazine.image || "/placeholder.svg"}
                alt={magazine.name}
                className="object-contain w-full h-full transition-all duration-300 hover:scale-105"
                width={400}
                height={600}
              />
            </div>

            <div className="overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex gap-2 min-w-max">
                {magazine.image && (
                  <button
                    onClick={() => handleImageSelect(magazine.image || "")}
                    className={`rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === magazine.image
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <img
                      src={magazine.image || "/placeholder.svg"}
                      alt={`Main image`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                      width={80}
                      height={80}
                    />
                  </button>
                )}

                {magazine.previewImage?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleImageSelect(img)}
                    className={`rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Preview ${idx + 1}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                      width={80}
                      height={80}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-sm font-medium">
                  {magazine.category}
                </Badge>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    (24 reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold mt-2">{magazine.name}</h1>

              <div className="mt-2">
                <span className="text-2xl font-semibold text-primary">
                  ${(magazine.price / 100).toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  Free shipping
                </span>
              </div>
            </div>

            <Separator />

            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{magazine.description}</p>
            </div>

            {/* Add format selection */}
            <div className="space-y-4">
              <h3 className="font-semibold">Select Format</h3>

              <RadioGroup
                value={formatSelection}
                onValueChange={(val) =>
                  setFormatSelection(val as "digital" | "physical")
                }
                className="flex gap-4 flex-wrap"
              >
                <div
                  className={`border rounded-lg p-4 flex-1 min-w-[150px] cursor-pointer ${
                    formatSelection === "digital"
                      ? "border-primary bg-muted/20"
                      : ""
                  }`}
                >
                  <RadioGroupItem
                    value="digital"
                    id="digital"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="digital"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                    <div className="font-medium">Digital Edition</div>
                    <div className="text-sm text-muted-foreground">
                      ${(magazine.price / 100).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Instant delivery
                    </div>
                  </Label>
                </div>

                {magazine.physicalDelivery && (
                  <div
                    className={`border rounded-lg p-4 flex-1 min-w-[150px] cursor-pointer ${
                      formatSelection === "physical"
                        ? "border-primary bg-muted/20"
                        : ""
                    }`}
                  >
                    <RadioGroupItem
                      value="physical"
                      id="physical"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="physical"
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                      </svg>
                      <div className="font-medium">Digital + Physical</div>
                      <div className="text-sm text-muted-foreground">
                        ${(physicalPrice / 100).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        3-5 day delivery
                      </div>
                    </Label>
                  </div>
                )}
              </RadioGroup>

              {formatSelection === "physical" && (
                <div className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                  <p>
                    Includes ${(deliveryPrice / 100).toFixed(2)} shipping and
                    handling
                  </p>
                  <p className="mt-1">
                    Get instant access to digital edition plus a physical copy
                    delivered to your door
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Brand</p>
                <p className="text-sm text-muted-foreground">
                  {magazine.brand}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Publication Date</p>
                <p className="text-sm text-muted-foreground">
                  {magazine.publicationDate}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Page Count</p>
                <p className="text-sm text-muted-foreground">
                  {magazine.pageCount}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Language</p>
                <p className="text-sm text-muted-foreground">
                  {magazine.language}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 gap-2"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="w-5 h-5" />
                  View Cart
                </Link>
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 text-sm">
              <p className="font-medium">Shipping Information</p>
              <p className="text-muted-foreground mt-1">
                Free shipping on orders over $50. Delivery within 3-5 business
                days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
