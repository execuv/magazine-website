import { data } from "../../../public/Blogdatas/Articles"
import BlogDetail from "@/components/blog/BlogDetail"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// Function to get markdown content
async function getMarkdownContent(contentPath: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', contentPath.replace(/^\//, ''))
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found')
    }
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(fileContent)
    return marked(content)
  } catch (error) {
    console.error("Error reading markdown file:", error)
    throw error
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  // Return all blog post slugs from the data
  return data.map(post => ({ slug: post.slug }))
}

// Server component to fetch post data
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the post with the matching slug
  const normalizedSlug = params.slug.toLowerCase().trim()
  const postData = data.find(post => post.slug.toLowerCase() === normalizedSlug)

  if (!postData) {
    return <BlogDetail error="Post not found" />
  }

  try {
    // Get content from markdown file
    const content = await getMarkdownContent(postData.content)

    // Use the title from the Articles.ts data
    const title = postData.title || postData.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Create post object with all required fields
    const post = {
      ...postData,
      title,
      content,
      image: postData.images?.[0] || "/placeholder.svg?height=600&width=1200"
    }

    // Related posts - get posts with same category
    const relatedPosts = data
      .filter(item => item.category === post.category && item.id !== post.id)
      .slice(0, 3)
      .map(item => ({
        id: item.id,
        title: item.title || item.slug.split('-').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        excerpt: `Related article about ${item.category}.`,
        date: item.date,
        author: item.author,
        image: item.images && item.images[0] ? item.images[0] : "/placeholder.svg?height=200&width=300",
        slug: item.slug,
      }))

    return <BlogDetail post={post} relatedPosts={relatedPosts} />
  } catch (error) {
    console.error("Error rendering blog post page:", error)
    return <BlogDetail error="Failed to load blog post" />
  }
}

