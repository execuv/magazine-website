import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image: string
  slug: string
}

export default function BlogPreview() {
  const featuredPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Digital Publishing in 2025",
      excerpt: "Explore the emerging trends that will shape the digital publishing landscape in the coming years.",
      date: "March 15, 2025",
      author: "Sarah Johnson",
      category: "Industry Insights",
      image: "/placeholder.svg?height=400&width=600",
      slug: "future-of-digital-publishing-2025",
    },
    {
      id: 2,
      title: "How to Create a Stunning Magazine Layout",
      excerpt: "Learn the principles of effective magazine design that captivates readers and enhances content.",
      date: "March 10, 2025",
      author: "David Chen",
      category: "Design Tips",
      image: "/placeholder.svg?height=400&width=600",
      slug: "create-stunning-magazine-layout",
    },
    {
      id: 3,
      title: "The Rise of Niche Digital Magazines",
      excerpt: "Discover why specialized content is gaining popularity and how it's changing reader expectations.",
      date: "March 5, 2025",
      author: "Emily Rodriguez",
      category: "Market Trends",
      image: "/placeholder.svg?height=400&width=600",
      slug: "rise-of-niche-digital-magazines",
    },
  ]

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest from Our Blog</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Insights, tips, and news from the world of digital publishing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <div key={post.id} className="group flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={600}
                  height={400}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight">
                      <Link href={`/blogs/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </div>
                <div className="pt-4">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/blogs">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

