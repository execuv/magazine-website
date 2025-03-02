import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  title: string
  category: string
  price: number
  image: string
  popular?: boolean
  new?: boolean
  description: string
}

export default function ProductsPage() {
  const products: Product[] = [
    {
      id: 1,
      title: "Design Insights",
      category: "Design",
      price: 9.99,
      image: "/placeholder.svg?height=400&width=300",
      popular: true,
      description:
        "A comprehensive guide to the latest design trends and techniques. Perfect for designers of all levels.",
    },
    {
      id: 2,
      title: "Tech Today",
      category: "Technology",
      price: 12.99,
      image: "/placeholder.svg?height=400&width=300",
      new: true,
      description: "Stay up-to-date with the latest technology news, reviews, and insights from industry experts.",
    },
    {
      id: 3,
      title: "Business Quarterly",
      category: "Business",
      price: 14.99,
      image: "/placeholder.svg?height=400&width=300",
      description: "In-depth analysis of business trends, strategies, and case studies to help you grow your business.",
    },
    {
      id: 4,
      title: "Creative Mind",
      category: "Art & Culture",
      price: 8.99,
      image: "/placeholder.svg?height=400&width=300",
      description: "Explore the world of art and culture with inspiring stories, interviews, and creative projects.",
    },
    {
      id: 5,
      title: "Lifestyle Quarterly",
      category: "Lifestyle",
      price: 10.99,
      image: "/placeholder.svg?height=400&width=300",
      description:
        "Discover tips and advice for a balanced lifestyle, including health, wellness, and personal development.",
    },
    {
      id: 6,
      title: "Science Explorer",
      category: "Science",
      price: 11.99,
      image: "/placeholder.svg?height=400&width=300",
      description: "Dive into the fascinating world of science with articles on the latest discoveries and research.",
    },
    {
      id: 7,
      title: "Travel Adventures",
      category: "Travel",
      price: 9.99,
      image: "/placeholder.svg?height=400&width=300",
      description: "Explore destinations around the world with stunning photography and insider travel tips.",
    },
    {
      id: 8,
      title: "Food & Cooking",
      category: "Food",
      price: 7.99,
      image: "/placeholder.svg?height=400&width=300",
      description: "Delicious recipes, cooking techniques, and food culture from around the world.",
    },
  ]

  return (
    <div className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our collection of premium digital magazines
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button variant="outline" className="rounded-full">
            All Categories
          </Button>
          <Button variant="outline" className="rounded-full">
            Design
          </Button>
          <Button variant="outline" className="rounded-full">
            Technology
          </Button>
          <Button variant="outline" className="rounded-full">
            Business
          </Button>
          <Button variant="outline" className="rounded-full">
            Art & Culture
          </Button>
          <Button variant="outline" className="rounded-full">
            Lifestyle
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  width={300}
                  height={400}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{product.category}</Badge>
                  <div className="flex gap-1">
                    {product.popular && <Badge variant="secondary">Popular</Badge>}
                    {product.new && <Badge>New</Badge>}
                  </div>
                </div>
                <h3 className="mt-2 text-xl font-bold">{product.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled>
              <span className="sr-only">Previous page</span>
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
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="icon">
              <span className="sr-only">Next page</span>
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
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

