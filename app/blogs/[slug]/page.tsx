import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Clock, Facebook, Twitter, Linkedin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { data } from "../../../public/Blogdatas/Articles"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Footer from "@/components/footer"

interface BlogPost {
  id: number
  title?: string
  content?: string
  date: string
  author: string
  authorBio?: string
  category: string
  image?: string
  images?: string[]
  slug: string
  readTime?: string
  tags?: string[]
}

// Function to get markdown content
async function getMarkdownContent(contentPath: string) {
  try {
    // Remove leading slash from path
    const filePath = path.join(process.cwd(), 'public', contentPath.replace(/^\//, ''))
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return '<p>Content not available at this time.</p>'
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(fileContent)
    return marked(content)
  } catch (error) {
    console.error("Error reading markdown file:", error)
    return '<p>Unable to load content.</p>'
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the post with the matching slug
  const postData = data.find(post => post.slug === params.slug)
  
  if (!postData) {
    return (
      <div className="container py-10">
        <h1>Post not found</h1>
        <Button asChild>
          <Link href="/blogs">Back to Blog</Link>
        </Button>
      </div>
    )
  }
  
  // Generate title if not provided
  const title = postData.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  // Get content from markdown file if available
  let content = '<p>Content not available</p>'
  if (postData.content) {
    content = await getMarkdownContent(postData.content)
  }
  
  // Image handling
  const featuredImage = postData.images && postData.images[0] 
    ? postData.images[0] 
    : "/placeholder.svg?height=600&width=1200"
  
  // Create post object with all required fields
  const post: BlogPost = {
    ...postData,
    title: title,
    content: content,
    image: featuredImage
  }
  
  // Related posts - get posts with same category
  const relatedPosts = data
    .filter(item => item.category === post.category && item.id !== post.id)
    .slice(0, 3)
    .map(item => ({
      id: item.id,
      title: item.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      excerpt: `Related article about ${item.category}.`,
      date: item.date,
      author: item.author,
      image: item.images && item.images[0] ? item.images[0] : "/placeholder.svg?height=200&width=300",
      slug: item.slug,
    }))

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
            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            )}
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
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <div key={tag} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
                  <Tag className="h-3 w-3" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          )}

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
          {post.authorBio && (
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
          )}
        </div>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
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
        )}

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
      <Footer />
    </div>
  )
}

