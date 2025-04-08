import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

export default function PressReleases() {
  const pressReleases = [
    {
      id: 1,
      title: "ExecuVision Launches New Digital Platform for Business Leaders",
      date: "April 5, 2025",
      excerpt: "The new platform offers enhanced features and personalized content for executives and decision-makers.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=120&h=80&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Industry Partnership Announced Between ExecuVision and Global Tech Forum",
      date: "March 22, 2025",
      excerpt:
        "This strategic partnership will bring exclusive content and networking opportunities to our subscribers.",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=120&h=80&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "ExecuVision Recognized with Industry Excellence Award",
      date: "February 15, 2025",
      excerpt: "The prestigious award acknowledges our commitment to quality journalism and digital innovation.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=80&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "New Executive Interview Series to Launch Next Month",
      date: "January 30, 2025",
      excerpt: "The series will feature in-depth conversations with C-suite leaders from Fortune 500 companies.",
      image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=120&h=80&auto=format&fit=crop&q=80",
    },
  ]

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Press Releases</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Latest news and announcements from ExecuVision
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressReleases.map((release) => (
            <Card key={release.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={release.image || "/placeholder.svg"}
                    alt={release.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{release.date}</span>
                  </div>
                </div>
                <CardTitle className="mt-2">{release.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{release.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 p-0 h-auto" asChild>
                  <Link href={`/press-releases/${release.id}`}>
                    Read Full Release <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/press-releases">View All Press Releases</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
