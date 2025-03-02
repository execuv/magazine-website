import { BookOpen, Download, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WhyChooseUsPreview() {
  return (
    <section id="why-choose-us" className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Us</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We deliver exceptional digital magazine experiences that stand out from the rest
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Premium Content</h3>
            <p className="text-center text-muted-foreground">
              Curated articles from industry experts and thought leaders
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Instant Access</h3>
            <p className="text-center text-muted-foreground">Download and read on any device, anytime, anywhere</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Regular Updates</h3>
            <p className="text-center text-muted-foreground">Fresh content delivered to your inbox every month</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Stunning Design</h3>
            <p className="text-center text-muted-foreground">Beautiful layouts that enhance your reading experience</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/why-choose-us">Learn More About Our Benefits</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

