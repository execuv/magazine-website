import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Product {
  id: number
  title: string
  category: string
  price: number
  image: string
  popular?: boolean
  new?: boolean
}

export default function ProductsPreview() {
  const products: Product[] = [
    {
      id: 1,
      title: "Design Insights",
      category: "Design",
      price: 9.99,
      image: "/placeholder.svg?height=400&width=300",
      popular: true,
    },
    {
      id: 2,
      title: "Tech Today",
      category: "Technology",
      price: 12.99,
      image: "/placeholder.svg?height=400&width=300",
      new: true,
    },
    {
      id: 3,
      title: "Business Quarterly",
      category: "Business",
      price: 14.99,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 4,
      title: "Creative Mind",
      category: "Art & Culture",
      price: 8.99,
      image: "/placeholder.svg?height=400&width=300",
    },
  ]

  return (
    <section id="products" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore latest editorials</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our collection of premium digital magazines
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
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
                <h3 className="mt-2 text-xl font-bold">Explore now</h3>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="mt-12 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">View All Magazines</Link>
          </Button>
        </div> */}
      </div>
      <div className="container px-4 md:px-6 mt-20 bg-muted/50 mt-20 py-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Exclusive edition</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our collection of premium digital magazines
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
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
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button size="sm">Explore</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">View All Magazines</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

