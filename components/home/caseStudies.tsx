import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: "How Company X Increased Digital Subscriptions by 200%",
      description: "A strategic approach to content marketing and user experience design led to unprecedented growth.",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Transforming Print Legacy into Digital Success",
      description:
        "This traditional publisher's digital transformation journey offers valuable lessons for the industry.",
      category: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Building a Loyal Reader Community from Scratch",
      description: "How a niche publication created an engaged audience through community-building strategies.",
      category: "Audience Development",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=200&auto=format&fit=crop&q=80",
    },
  ]

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Case Studies</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Real-world success stories and actionable insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <Card key={study.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">{study.category}</div>
                <CardTitle>{study.title}</CardTitle>
                <CardDescription>{study.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="gap-1 p-0 h-auto" asChild>
                  <Link href={`/case-studies/${study.id}`}>
                    Read Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/case-studies">View All Case Studies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
