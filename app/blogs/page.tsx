import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import { data } from "../../public/Blogdatas/Articles"
import Image from "next/image"

interface BlogPost {
  id: number
  title?: string
  excerpt?: string
  content?: string
  date: string
  author: string
  authorBio?: string
  category: string
  images?: string[]
  image?: string
  slug: string
  readTime?: string
  tags?: string[]
  featured?: boolean
}

export default function BlogsPage() {
  // Convert data from Articles.ts to BlogPost format with required fields
  const blogPosts: BlogPost[] = data.map(post => ({
    id: post.id,
    title: post.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    excerpt: `This is an excerpt for ${post.slug}. The complete article contains more detailed information.`,
    date: post.date,
    author: post.author,
    authorBio: post.authorBio,
    category: post.category,
    image: post.images && post.images[0] ? post.images[0] : "/placeholder.svg?height=400&width=600",
    slug: post.slug,
    readTime: post.readTime,
    tags: post.tags,
    featured: post.id <= 3 // Mark first 3 posts as featured
  }));

  // Get the featured post (first in the array)
  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0]
  // Get the rest of the posts
  const regularPosts = blogPosts.filter((post) => post.id !== featuredPost.id)

  return (
    <>
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Blog
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Insights, tips, and news from the world of digital publishing
              </p>
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="group relative overflow-hidden rounded-lg border">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="aspect-video overflow-hidden md:aspect-auto md:h-full">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={600}
                    height={400}
                  />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        Featured
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{featuredPost.date}</span>
                        <span>•</span>
                        <span>{featuredPost.category}</span>
                      </div>
                      <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                        <Link
                          href={`/blogs/${featuredPost.slug}`}
                          className="hover:underline"
                        >
                          {featuredPost.title}
                        </Link>
                      </h2>
                    </div>
                    <p className="text-muted-foreground">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                        <img
                          src={`/placeholder.svg?height=40&width=40&text=${featuredPost.author.charAt(
                            0
                          )}`}
                          alt={featuredPost.author}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">{featuredPost.author}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href={`/blogs/${featuredPost.slug}`}>
                        Read Article
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filter Categories */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button variant="outline" className="rounded-full">
              All Categories
            </Button>
            {Array.from(new Set(blogPosts.map(post => post.category))).map(category => (
              <Button key={category} variant="outline" className="rounded-full">
                {category}
              </Button>
            ))}
          </div>

          {/* Regular Posts */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <div
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-lg border"
              >
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
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                    </div>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
                        <img
                          src={`/placeholder.svg?height=32&width=32&text=${post.author.charAt(
                            0
                          )}`}
                          alt={post.author}
                          width={32}
                          height={32}
                        />
                      </div>
                      <span className="text-sm">{post.author}</span>
                    </div>
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

          {/* Pagination */}
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

          {/* Newsletter Signup */}
          <div className="mt-16 rounded-lg bg-muted/50 p-8">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-muted-foreground">
                  Stay updated with the latest articles, tips, and insights from
                  our blog. We'll never spam you.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
