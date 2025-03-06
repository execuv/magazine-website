"use client"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { Magazine, getMagazineById } from "@/app/utils/firestore"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/authContext"
import { toast } from "sonner"

export default function MagazineDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const [magazine, setMagazine] = useState<Magazine | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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
      await addItem(params.slug)
      toast.success("Added to cart")
    } catch (error) {
      toast.error("Failed to add to cart")
    }
  }

  if (loading)
    return <div className="py-16 text-center">Loading magazine...</div>
  if (error)
    return <div className="py-16 text-center text-red-500">{error}</div>
  if (!magazine) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <img
            src={magazine.image || "/placeholder.svg"}
            alt={magazine.name}
            className="w-full max-w-md rounded-lg shadow-lg"
            width={400}
            height={600}
          />
          <div className="grid grid-cols-2 gap-2">
            {magazine.previewImage?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preview ${idx + 1}`}
                className="w-full rounded-lg cursor-pointer hover:opacity-80"
                width={200}
                height={300}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{magazine.name}</h1>
          <p className="text-xl font-semibold">
            ${(magazine.price / 100).toFixed(2)}
          </p>
          <p className="text-muted-foreground">{magazine.description}</p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Brand:</span> {magazine.brand}
            </p>
            <p>
              <span className="font-semibold">Publication Date:</span>{" "}
              {magazine.publicationDate}
            </p>
            <p>
              <span className="font-semibold">Page Count:</span>{" "}
              {magazine.pageCount}
            </p>
            <p>
              <span className="font-semibold">Language:</span>{" "}
              {magazine.language}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {magazine.category}
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
