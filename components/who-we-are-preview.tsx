import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WhoWeArePreview() {
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
              <Button asChild>
                <Link href="/about">Our Story</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Meet The Team</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=500&q=80"
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
      </div>
    </section>
  )
}

