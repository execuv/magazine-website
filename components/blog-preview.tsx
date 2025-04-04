import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getAllArticles } from "@/firebase/firestore";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: any;
  author: string;
  category: string;
  imageUrl: string;
}

export default async function BlogPreview() {
  const articles = await getAllArticles();

  // Get the most recent 3 articles
  const recentPosts = articles
    .sort((a: any, b: any) => b.createdAt?.toDate() - a.createdAt?.toDate())
    .slice(0, 3);

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Latest from Our Blog
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Insights, tips, and news from the world of digital publishing
            </p>
          </div>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post: any) => (
              <div
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-lg border"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.imageUrl || "/placeholder.svg"}
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
                        <span>
                          {post.createdAt?.toDate().toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{post.category}</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight">
                        <Link
                          href={`/blogs/${post.id}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                    </div>
                    <div className="">

                    <ReactMarkdown>
                    {post.content.slice(0,10)}
                    </ReactMarkdown>
                    </div>
                  </div>
                  <div className="pt-4">
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
        ) : (
          <p className="text-center text-muted-foreground">
            No blog posts available.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/blogs">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
