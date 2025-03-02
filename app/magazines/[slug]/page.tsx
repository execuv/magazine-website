import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface MagazineDetails {
  id: number
  title: string
  description: string
  price: number
  coverImage: string
  rating: number
  author: string
  publicationDate: string
  pageCount: number
  language: string
  isbn: string
}

export default function MagazineDetailPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch this data based on the slug
  const magazine: MagazineDetails = {
    id: 1,
    title: "Design Insights: Summer 2025 Edition",
    description:
      "Dive into the latest trends and innovations in design with our Summer 2025 edition. Featuring exclusive interviews with leading designers, in-depth analysis of emerging technologies, and showcases of groundbreaking projects from around the world.",
    price: 14.99,
    coverImage: "/placeholder.svg?height=600&width=400",
    rating: 4.5,
    author: "Sarah Johnson",
    publicationDate: "June 1, 2025",
    pageCount: 120,
    language: "English",
    isbn: "978-1234567890",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <img
            src={magazine.coverImage || "/placeholder.svg"}
            alt={magazine.title}
            className="w-full max-w-md rounded-lg shadow-lg"
            width={400}
            height={600}
          />
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(magazine.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-sm text-muted-foreground">({magazine.rating.toFixed(1)})</span>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{magazine.title}</h1>
          <p className="text-xl font-semibold">${magazine.price.toFixed(2)}</p>
          <p className="text-muted-foreground">{magazine.description}</p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Author:</span> {magazine.author}
            </p>
            <p>
              <span className="font-semibold">Publication Date:</span> {magazine.publicationDate}
            </p>
            <p>
              <span className="font-semibold">Page Count:</span> {magazine.pageCount}
            </p>
            <p>
              <span className="font-semibold">Language:</span> {magazine.language}
            </p>
            <p>
              <span className="font-semibold">ISBN:</span> {magazine.isbn}
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg">Add to Cart</Button>
            <Button size="lg" variant="outline">
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Magazines</h2>
        {/* Add related magazines component here */}
      </div>
    </div>
  )
}

