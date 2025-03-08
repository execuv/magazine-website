import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image: string
  slug: string
  featured?: boolean
}

export default function BlogsPage() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Digital Publishing in 2025",
      excerpt:
        "Explore the emerging trends that will shape the digital publishing landscape in the coming years, from interactive content to AI-driven personalization.",
      date: "March 15, 2025",
      author: "Sarah Johnson",
      category: "Industry Insights",
      image: "/placeholder.svg?height=400&width=600",
      slug: "future-of-digital-publishing-2025",
      featured: true,
    },
    {
      id: 2,
      title: "How to Create a Stunning Magazine Layout",
      excerpt:
        "Learn the principles of effective magazine design that captivates readers and enhances content. Discover typography tips, grid systems, and visual hierarchy.",
      date: "March 10, 2025",
      author: "David Chen",
      category: "Design Tips",
      image: "/placeholder.svg?height=400&width=600",
      slug: "create-stunning-magazine-layout",
      featured: true,
    },
    {
      id: 3,
      title: "The Rise of Niche Digital Magazines",
      excerpt:
        "Discover why specialized content is gaining popularity and how it's changing reader expectations. Explore successful niche publications and their strategies.",
      date: "March 5, 2025",
      author: "Emily Rodriguez",
      category: "Market Trends",
      image: "/placeholder.svg?height=400&width=600",
      slug: "rise-of-niche-digital-magazines",
      featured: true,
    },
    {
      id: 4,
      title: "7 Essential Tools for Digital Magazine Creators",
      excerpt:
        "A comprehensive guide to the software and platforms that can help you create, publish, and distribute professional-quality digital magazines.",
      date: "February 28, 2025",
      author: "Michael Thompson",
      category: "Resources",
      image: "/placeholder.svg?height=400&width=600",
      slug: "essential-tools-digital-magazine-creators",
    },
    {
      id: 5,
      title: "Monetization Strategies for Digital Publications",
      excerpt:
        "Explore different revenue models for digital magazines, from subscriptions and paywalls to advertising and affiliate marketing.",
      date: "February 20, 2025",
      author: "Jennifer Lee",
      category: "Business",
      image: "/placeholder.svg?height=400&width=600",
      slug: "monetization-strategies-digital-publications",
    },
    {
      id: 6,
      title: "The Psychology of Reading: Print vs. Digital",
      excerpt:
        "An in-depth look at how readers interact with different formats and what it means for digital magazine publishers.",
      date: "February 15, 2025",
      author: "Dr. Robert Anderson",
      category: "Research",
      image: "/placeholder.svg?height=400&width=600",
      slug: "psychology-reading-print-vs-digital",
    },
    {
      id: 7,
      title: "Accessibility in Digital Publishing: A Complete Guide",
      excerpt:
        "Learn how to make your digital magazines accessible to all readers, including those with disabilities. Best practices and tools explained.",
      date: "February 10, 2025",
      author: "Lisa Martinez",
      category: "Best Practices",
      image: "/placeholder.svg?height=400&width=600",
      slug: "accessibility-digital-publishing-guide",
    },
    {
      id: 8,
      title: "How to Build a Loyal Readership for Your Digital Magazine",
      excerpt:
        "Strategies for growing and maintaining an engaged audience for your publication, from content planning to community building.",
      date: "February 5, 2025",
      author: "James Wilson",
      category: "Marketing",
      image: "/placeholder.svg?height=400&width=600",
      slug: "build-loyal-readership-digital-magazine",
    },
    {
      id: 9,
      title: "The Impact of AI on Editorial Workflows",
      excerpt:
        "How artificial intelligence is transforming content creation, editing, and curation in the digital publishing industry.",
      date: "January 30, 2025",
      author: "Sarah Johnson",
      category: "Technology",
      image: "/placeholder.svg?height=400&width=600",
      slug: "impact-ai-editorial-workflows",
    },
  ]

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
            <Button variant="outline" className="rounded-full">
              Industry Insights
            </Button>
            <Button variant="outline" className="rounded-full">
              Design Tips
            </Button>
            <Button variant="outline" className="rounded-full">
              Market Trends
            </Button>
            <Button variant="outline" className="rounded-full">
              Technology
            </Button>
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
