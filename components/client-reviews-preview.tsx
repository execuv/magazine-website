"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Review {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  content: string
}

export default function ClientReviewsPreview() {
  const [showArrows, setShowArrows] = useState(false)

  useEffect(() => {
    setShowArrows(true)
  }, [])

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
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      content:
        "As a content creator, I find these magazines incredibly inspiring. They're a goldmine of ideas and keep me updated with the latest trends in my industry.",
    },
    {
      id: 5,
      name: "David Kim",
      role: "Tech Enthusiast",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
      content:
        "The tech magazines are my go-to source for in-depth analysis of the latest innovations. The writers really know their stuff and present complex topics in an accessible way.",
    },
    {
      id: 6,
      name: "Laura Thompson",
      role: "Lifestyle Blogger",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      content:
        "I love the variety of topics covered in these magazines. From fashion to travel, they always have something interesting that aligns with my blog's focus.",
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6 bg-muted/50 py-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it — hear from our satisfied readers
            </p>
          </div>
        </div>
        <div className="mt-12 relative">
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="px-2">
                <Card className="border-0 shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
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
              </div>
            ))}
          </Slider>
          {showArrows && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full shadow-md z-10"
                onClick={() => (document.querySelector(".slick-prev") as HTMLElement).click()}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full shadow-md z-10"
                onClick={() => (document.querySelector(".slick-next") as HTMLElement).click()}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

