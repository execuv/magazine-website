import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Premium PDF Magazines for Modern Readers
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover our curated collection of high-quality digital magazines. Immerse yourself in thought-provoking
                content, stunning visuals, and expert insights.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1" asChild>
                <Link href="/products" className="flex">
                  Browse Collection <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {/*<Button size="lg" variant="outline" asChild>
                <Link href="/why-choose-us">Learn More</Link>
              </Button>*/}
            </div>
          </div>
          <div className="mx-auto lg:ml-auto flex items-center justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542871793-fd7e2b3cd0b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hZ2F6aW5lfGVufDB8fDB8fHww"
                alt="Magazine cover showcase"
                className="rounded-lg shadow-2xl"
                width={450}
                height={600}
              />
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-lg">
                <div className="text-sm font-medium">Latest Issue</div>
                <div className="text-xl font-bold">Design Trends 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

