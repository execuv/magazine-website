import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CoverStory() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              Featured
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Cover Story</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              In-depth analysis and exclusive interviews with industry leaders
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=600&auto=format&fit=crop&q=80"
              alt="Cover story featured image"
              className="rounded-lg shadow-xl"
              width={500}
              height={600}
            />
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
              Latest Issue
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">The Future of Digital Publishing: Trends to Watch in 2025</h3>
            <p className="text-muted-foreground">
              In this exclusive cover story, we explore how emerging technologies and changing consumer behaviors are
              reshaping the digital publishing landscape. Industry experts share their insights on what publishers need
              to know to stay ahead of the curve.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="font-medium">AI-powered content creation and curation</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="font-medium">Immersive reading experiences through AR/VR</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="font-medium">Sustainable business models for digital publishers</p>
              </div>
            </div>
            <Button className="gap-2" asChild>
              <Link href="/cover-story">
                Read Full Story <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
