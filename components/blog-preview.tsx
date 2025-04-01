import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
}

export default function BlogPreview() {
  const featuredPosts = [
    {
      id: 1,
      title: "US Bitcoin Reserve: Trump's Vision",
      excerpt:
        "In a surprising policy shift, former President Donald Trump has announced his support for creating a strategic U.S. Bitcoin reserve if elected in 2024...",
      content: "/Blogdatas/Blog1.md",
      image: "/Blogdatas/images/health.jpg",
      date: "March 15, 2025",
      author: "Sarah Johnson",
      category: "Cryptocurrency",
      slug: "us-bitcoin-reserve-trumps-vision",
      readTime: "8 min read",
      tags: [
        "Bitcoin",
        "Cryptocurrency",
        "Donald Trump",
        "Blockchain",
        "Digital Currency",
        "Government Policy",
      ],
    },
    {
      id: 2,
      title: "The Rise of Cryptocurrency Adoption",
      excerpt:
        "Cryptocurrency adoption has reached unprecedented levels in 2025, with major financial institutions fully embracing blockchain technology...",
      content: "/Blogdatas/Blog2.md",
      image: "/Blogdatas/images/crypto.jpg",
      date: "March 15, 2025",
      author: "Sarah Johnson",
      category: "Cryptocurrency",
      slug: "the-rise-of-cryptocurrency-adoption",
      readTime: "8 min read",
      tags: [
        "Cryptocurrency",
        "Blockchain",
        "Bitcoin",
        "Finance",
        "Digital Assets",
        "Regulation",
      ],
    },
    {
      id: 3,
      title: "The Future of NFTs in Digital Publishing",
      excerpt:
        "NFTs are transforming digital publishing by revolutionizing content distribution, monetization, and ownership...",
      content: "/Blogdatas/Blog3.md",
      image: "/Blogdatas/images/telecom.jpg",
      date: "March 15, 2025",
      author: "Sarah Johnson",
      category: "NFTs",
      slug: "the-future-of-nfts-in-digital-publishing",
      readTime: "8 min read",
      tags: [
        "NFTs",
        "Digital Publishing",
        "Blockchain",
        "Content Ownership",
        "Smart Contracts",
        "Web3",
      ],
    },
  ];
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
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
  );
}
