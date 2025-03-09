"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Magazine, getMagazines } from "@/firebase/firestore"
import { Skeleton } from "@/components/ui/skeleton"
import Footer from "@/components/footer"

export default function ProductsPage() {
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [filteredMagazines, setFilteredMagazines] = useState<Magazine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("All Categories")

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const data = await getMagazines()
        setMagazines(data)
        setFilteredMagazines(data)
      } catch (err) {
        setError("Failed to fetch magazines")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMagazines()
  }, [])

  // Get unique categories from magazines
  const categories = [
    "All Categories",
    ...new Set(magazines.map((mag) => mag.category)),
  ]

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    if (category === "All Categories") {
      setFilteredMagazines(magazines)
    } else {
      setFilteredMagazines(magazines.filter((mag) => mag.category === category))
    }
  }

  if (loading) {
    return (
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
          </div>

          {/* Categories skeleton */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-full" />
            ))}
          </div>

          {/* Products grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border"
                >
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-10 w-24 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  if (error)
    return <div className="py-16 text-center text-red-500">{error}</div>

  return (
    <>
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore latest editorials
              </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse our exclusive collection of premium magazines curated just for you
                </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="rounded-full"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredMagazines.map((magazine) => (
              <Link
                href={`/magazines/${magazine.id}`}
                key={magazine.id}
                className="h-full"
              >
                <div className="group relative overflow-hidden rounded-lg border cursor-pointer transition-shadow hover:shadow-lg h-full flex flex-col">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={magazine.image || "/placeholder.svg"}
                      alt={magazine.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      width={300}
                      height={400}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{magazine.category}</Badge>
                      {magazine.badge ? (
                        <Badge variant="secondary">{magazine.badge}</Badge>
                      ) : magazine.physicalDelivery ? (
                        <Badge variant="secondary">Physical Available</Badge>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-xl font-bold">{magazine.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3 min-h-[4.5em]">
                      {magazine.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">
                        ${(magazine.price / 100).toFixed(2)}
                      </span>
                      <Button size="sm">Explore</Button>
                    </div>
                  </div>
                </div>
              </Link>
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
      <Footer />
    </>
  )
}
