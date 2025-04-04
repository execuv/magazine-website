import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogById } from "@/firebase/blog/getBlogById";
import { getAllArticles } from "@/firebase/firestore";
import ReactMarkdown from "react-markdown";
import Footer from "@/components/footer";
import Image from "next/image";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { blog, relatedBlogs }: any = await getBlogById(params.slug);

    // Fetch all articles for featured section
    const allArticles = await getAllArticles();
    // Get up to 3 random articles excluding current blog
    const featuredBlogs = allArticles
      .filter((article: any) => article.id !== params.slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    console.log("Blog Data:", {
      title: blog.title,
      category: blog.category,
      content: blog.content?.slice(0, 100) + "...", // Log first 100 chars of content
      createdAt: blog.createdAt,
      imageUrl: blog.imageUrl,
      readingTime: blog.readingTime,
      author: blog.author,
    });
    console.log("Related Blogs:", relatedBlogs);

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
          <div className="mx-auto max-w-2xl space-y-4 text-center px-4">
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                {blog.category}
              </div>
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                {blog.title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{blog.createdAt?.toDate().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{blog.author || "Admin"}</span>
              </div>
              {blog.readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{blog.readingTime} min read</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured image */}
          {blog.imageUrl && (
            <div
              className="my-8 mx-auto"
              style={{ maxWidth: "min(100%, 1000px)" }}
            >
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full aspect-video rounded-lg object-cover shadow-md"
                width={1000}
                height={560}
                priority
              />
            </div>
          )}

          {/* Article content */}
          <div className="mx-auto max-w-2xl markdown">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-left prose-p:text-justify prose-img:mx-auto">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            {/* Share buttons */}
            <div className="mt-8 border-t pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm font-medium">Share this article:</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 hover:text-blue-600"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-sky-50 hover:text-sky-600"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured blogs */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16 py-12 rounded-xl">
              <div className="container px-4 md:px-6">
                <h2 className="mb-8 text-2xl font-bold text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {relatedBlogs.map((post: any) => (
                    <div
                      key={post.id}
                      className="group flex flex-col overflow-hidden rounded-lg border bg-white shadow-md"
                    >
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={post.imageUrl || "/placeholder.svg"}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          width={300}
                          height={200}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-primary">
                            {post.category}
                          </div>
                          <h3 className="font-bold leading-tight">
                            <Link
                              href={`/blogs/${post.id}`}
                              className="hover:underline"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {post.content.slice(0, 100)}...
                          </p>
                        </div>
                        <div className="pt-4 flex justify-between items-center">
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {post.createdAt?.toDate().toLocaleDateString()}
                            </span>
                          </div>
                          <Link
                            href={`/blogs/${post.id}`}
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
            </div>
          )}

          {/* Featured Blogs Section */}
          {featuredBlogs.length > 0 && (
            <div className="mt-16 py-12 border-t">
              <div className="container px-4 md:px-6">
                <h2 className="mb-8 text-2xl font-bold text-center">
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {featuredBlogs.map((post: any) => (
                    <div
                      key={post.id}
                      className="group flex flex-col overflow-hidden rounded-lg border bg-white shadow-md"
                    >
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={post.imageUrl || "/placeholder.svg"}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          width={300}
                          height={200}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-primary">
                            {post.category}
                          </div>
                          <h3 className="font-bold leading-tight">
                            <Link
                              href={`/blogs/${post.id}`}
                              className="hover:underline"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {post.content?.slice(0, 100)}...
                          </p>
                        </div>
                        <div className="pt-4 flex justify-between items-center">
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {post.createdAt?.toDate().toLocaleDateString()}
                            </span>
                          </div>
                          <Link
                            href={`/blogs/${post.id}`}
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
            </div>
          )}

          {/* Newsletter signup */}
          <div className="mt-16 rounded-lg p-6 sm:p-8">
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
                <Button className="">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error rendering blog post page:", error);
    return (
      <div className="container py-10">
        <h1>Error loading post</h1>
        <Button asChild>
          <Link href="/blogs">Back to Blog</Link>
        </Button>
      </div>
    );
  }
}
