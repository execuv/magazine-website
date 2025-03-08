"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Magazine, getMagazines } from "@/firebase/firestore"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsPreview() {
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const data = await getMagazines()
        // Only take first 4 magazines for preview
        setMagazines(data.slice(0, 4))
      } catch (err) {
        setError("Failed to fetch magazines")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMagazines()
  }, [])

  if (loading)
    return (
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
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
          <div className="flex justify-center mt-8">
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </section>
    )
  if (error)
    return <div className="py-16 text-center text-red-500">{error}</div>

  return (
    <section id="products" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore latest editorials
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our collection of premium digital magazines
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {magazines.map((magazine) => (
            <Link
              href={`/magazines/${magazine.id}`}
              key={magazine.id}
              className="h-full"
            >
              <div className="group relative overflow-hidden rounded-lg border h-full flex flex-col">
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
                    {magazine.badge && (
                      <Badge variant="secondary">{magazine.badge}</Badge>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">Explore now</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-20 bg-muted/50 mt-20 py-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Exclusive edition
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our collection of premium digital magazines
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {magazines.map((magazine) => (
            <Link
              href={`/magazines/${magazine.id}`}
              key={magazine.id}
              className="h-full"
            >
              <div className="group relative overflow-hidden rounded-lg border h-full flex flex-col">
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
                    {magazine.badge && (
                      <Badge variant="secondary">{magazine.badge}</Badge>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{magazine.name}</h3>
                  <div className="mt-auto flex items-center justify-between">
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
          <Button size="lg" variant="outline" asChild>
            <Link href="/magazines">View All Magazines</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
