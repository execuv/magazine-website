import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/footer"

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 15 years in digital publishing, Sarah founded MagPDF with a vision to revolutionize how we consume magazine content.",
    },
    {
      name: "David Chen",
      role: "Creative Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "David brings his award-winning design expertise to ensure all our magazines maintain the highest visual standards.",
    },
    {
      name: "Emily Rodriguez",
      role: "Content Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emily curates our magazine collection, working with writers and editors to deliver exceptional content.",
    },
    {
      name: "Michael Thompson",
      role: "Technical Lead",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael ensures our platform provides a seamless reading experience across all devices.",
    },
  ]

  return (
    <>
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Us
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get to know the team behind MagPDF and our mission
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mb-16">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Our Story
              </div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Who We Are
              </h2>
              <p className="text-muted-foreground md:text-xl">
                We're a team of passionate writers, designers, and industry
                experts dedicated to creating exceptional digital magazines that
                inform, inspire, and entertain.
              </p>
              <p className="text-muted-foreground md:text-xl">
                Founded in 2018, our mission is to deliver premium content in a
                convenient digital format, making quality reading accessible to
                everyone, everywhere.
              </p>
              <p className="text-muted-foreground md:text-xl">
                We believe that the future of publishing is digital, but that
                doesn't mean sacrificing quality or the joy of reading. Our
                magazines combine the best of traditional publishing with the
                convenience and interactivity of digital technology.
              </p>
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

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-16">
            <div className="flex flex-col items-center justify-center space-y-2 border-r border-t p-6 md:border-t-0">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">
                Magazine Titles
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border-t p-6 md:border-r md:border-t-0">
              <div className="text-3xl font-bold">100k+</div>
              <div className="text-sm text-muted-foreground">Happy Readers</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border-r border-t p-6">
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">
                Industry Awards
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border-t p-6">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">
                Customer Support
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. From the content we publish to
                  the user experience we provide, excellence is our standard.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly exploring new ways to enhance the digital
                  reading experience and bring fresh ideas to our publications.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe great content should be accessible to everyone. We
                  strive to make our magazines available across all devices and
                  platforms.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">
              Meet Our Team
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <div key={index} className="rounded-lg border overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full aspect-square object-cover"
                    width={300}
                    height={300}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Want to join our team?</h2>
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
