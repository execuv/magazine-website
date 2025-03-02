import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Review {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  content: string
}

export default function ClientReviews() {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Designer",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      content:
        "The quality of these magazines is exceptional. The content is always relevant and the design is stunning. I've been a subscriber for over a year now and I'm never disappointed.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      content:
        "These PDF magazines have become an essential resource for our team. The insights and case studies have directly influenced our strategies and improved our results.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Entrepreneur",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
      content:
        "I appreciate the convenience of having high-quality content available in PDF format. The magazines are well-researched and beautifully designed. Great value for money.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it — hear from our satisfied readers
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {reviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">{review.content}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

