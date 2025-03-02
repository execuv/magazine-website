import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Clock, Facebook, Twitter, Linkedin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: number
  title: string
  content: string
  date: string
  author: string
  authorBio: string
  category: string
  image: string
  slug: string
  readTime: string
  tags: string[]
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // This would typically come from a database or CMS
  const post: BlogPost = {
    id: 1,
    title: "The Future of Digital Publishing in 2025",
    content: `
      <p>The digital publishing landscape is evolving at an unprecedented pace. As we look ahead to 2025, several key trends are emerging that will shape how content is created, distributed, and consumed.</p>
      
      <h2>Interactive Content Takes Center Stage</h2>
      <p>Static PDFs are giving way to dynamic, interactive experiences. Readers now expect content that responds to their actions, with embedded videos, animations, and interactive infographics becoming standard features rather than novelties.</p>
      <p>Publishers who embrace these interactive elements are seeing higher engagement rates and longer time spent with their content. The technology to create these experiences is becoming more accessible, allowing even smaller publishers to compete with larger media companies.</p>
      
      <h2>AI-Driven Personalization</h2>
      <p>Artificial intelligence is revolutionizing how content is delivered to readers. By analyzing reading habits, preferences, and behavior, publishers can now offer highly personalized experiences that adapt to individual users.</p>
      <p>From recommending relevant articles to dynamically adjusting content length and complexity based on reader preferences, AI is helping publishers build deeper relationships with their audiences.</p>
      
      <h2>Subscription Models Evolve</h2>
      <p>The subscription economy continues to mature in the publishing world. We're seeing a move beyond simple paywalls to more nuanced models that offer different tiers of access, bundled content packages, and partnerships across publishers.</p>
      <p>Micropayments are also gaining traction, allowing readers to pay small amounts for individual articles rather than committing to full subscriptions.</p>
      
      <h2>Mobile-First Becomes Mobile-Only</h2>
      <p>While responsive design has been important for years, we're now seeing a shift where many publishers are designing exclusively for mobile first, with desktop becoming a secondary consideration.</p>
      <p>This reflects changing consumption patterns, with over 70% of digital content now being consumed on mobile devices. Publishers who optimize for this reality are seeing significant advantages in reach and engagement.</p>
      
      <h2>Sustainability Enters the Conversation</h2>
      <p>Digital publishing has long been positioned as the environmentally friendly alternative to print. However, there's growing awareness of the carbon footprint associated with digital infrastructure.</p>
      <p>Forward-thinking publishers are now addressing this by optimizing their digital assets for energy efficiency, using green hosting providers, and being transparent about their environmental impact.</p>
      
      <h2>Conclusion</h2>
      <p>The future of digital publishing is bright, with technology enabling more engaging, personalized, and sustainable content experiences. Publishers who stay ahead of these trends will be well-positioned to thrive in the evolving landscape of 2025 and beyond.</p>
    `,
    date: "March 15, 2025",
    author: "Sarah Johnson",
    authorBio:
      "Sarah is our Content Director with over 15 years of experience in digital publishing. She specializes in emerging media trends and technology.",
    category: "Industry Insights",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "future-of-digital-publishing-2025",
    readTime: "8 min read",
    tags: ["Digital Publishing", "Future Trends", "Content Strategy", "Technology"],
  }

  // Related posts would typically be fetched based on tags or category
  const relatedPosts = [
    {
      id: 2,
      title: "How to Create a Stunning Magazine Layout",
      excerpt: "Learn the principles of effective magazine design that captivates readers and enhances content.",
      date: "March 10, 2025",
      author: "David Chen",
      image: "/placeholder.svg?height=200&width=300",
      slug: "create-stunning-magazine-layout",
    },
    {
      id: 3,
      title: "The Rise of Niche Digital Magazines",
      excerpt: "Discover why specialized content is gaining popularity and how it's changing reader expectations.",
      date: "March 5, 2025",
      author: "Emily Rodriguez",
      image: "/placeholder.svg?height=200&width=300",
      slug: "rise-of-niche-digital-magazines",
    },
    {
      id: 4,
      title: "7 Essential Tools for Digital Magazine Creators",
      excerpt: "A comprehensive guide to the software and platforms that can help you create professional magazines.",
      date: "February 28, 2025",
      author: "Michael Thompson",
      image: "/placeholder.svg?height=200&width=300",
      slug: "essential-tools-digital-magazine-creators",
    },
  ]

  return (
    <div className="py-10">
      <div className="container px-4 md:px-6">
        {/* Back to blog link */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link href="/blogs">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>{post.category}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="my-8">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="mx-auto aspect-video rounded-lg object-cover"
            width={1200}
            height={600}
          />
        </div>

        {/* Article content */}
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <div key={tag} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </div>
            ))}
          </div>

          {/* Share buttons */}
          <div className="mt-8 border-t pt-8">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Share this article:</div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" aria-label="Share on Facebook">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Author bio */}
          <div className="mt-8 rounded-lg border p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
                <img
                  src={`/placeholder.svg?height=64&width=64&text=${post.author.charAt(0)}`}
                  alt={post.author}
                  width={64}
                  height={64}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{post.author}</h3>
                <p className="text-muted-foreground">{post.authorBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-center">Related Articles</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="group flex flex-col overflow-hidden rounded-lg border">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={300}
                    height={200}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold leading-tight">
                      <Link href={`/blogs/${relatedPost.slug}`} className="hover:underline">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                  </div>
                  <div className="pt-4">
                    <Link
                      href={`/blogs/${relatedPost.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 rounded-lg bg-muted/50 p-8">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground">
                Stay updated with the latest articles, tips, and insights from our blog. We'll never spam you.
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
  )
}

