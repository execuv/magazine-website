import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"

export default function VideoInterviews() {
    const interviews = [
        {
          id: 1,
          title: "The Future of Media with Jane Smith",
          role: "CEO, Global Media Inc.",
          thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=350&h=200&auto=format&fit=crop&q=80",
          duration: "12:45",
        },
        {
          id: 2,
          title: "Digital Innovation Strategies with John Doe",
          role: "CTO, Tech Solutions",
          thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=350&h=200&auto=format&fit=crop&q=80",
          duration: "18:30",
        },
        {
          id: 3,
          title: "Content Creation in the AI Era with Sarah Johnson",
          role: "Content Director, Future Publishing",
          thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=350&h=200&auto=format&fit=crop&q=80",
          duration: "15:20",
        },
      ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Video Interviews</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Exclusive conversations with industry leaders and innovators
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interviews.map((interview) => (
            <div key={interview.id} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={interview.thumbnail || "/placeholder.svg"}
                  alt={interview.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {interview.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{interview.title}</h3>
                <p className="text-muted-foreground text-sm">{interview.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/interviews">View All Interviews</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
