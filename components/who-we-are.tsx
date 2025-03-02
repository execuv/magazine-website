import { Button } from "@/components/ui/button"

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Us</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Who We Are</h2>
            <p className="text-muted-foreground md:text-xl">
              We're a team of passionate writers, designers, and industry experts dedicated to creating exceptional
              digital magazines that inform, inspire, and entertain.
            </p>
            <p className="text-muted-foreground md:text-xl">
              Founded in 2018, our mission is to deliver premium content in a convenient digital format, making quality
              reading accessible to everyone, everywhere.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button>Our Story</Button>
              <Button variant="outline">Meet The Team</Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Our team working together"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={600}
                height={500}
              />
              <div className="absolute -bottom-6 -left-6 rounded-lg bg-background p-4 shadow-xl">
                <div className="text-sm font-medium">Established</div>
                <div className="text-3xl font-bold">2018</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center space-y-2 border-r border-t p-6 md:border-t-0">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm text-muted-foreground">Magazine Titles</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border-t p-6 md:border-r md:border-t-0">
            <div className="text-3xl font-bold">100k+</div>
            <div className="text-sm text-muted-foreground">Happy Readers</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border-r border-t p-6">
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Industry Awards</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border-t p-6">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

