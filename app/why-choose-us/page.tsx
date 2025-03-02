import { BookOpen, Download, Clock, Sparkles, Shield, Award, Users, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WhyChooseUsPage() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Premium Content",
      description: "Curated articles from industry experts and thought leaders",
    },
    {
      icon: <Download className="h-6 w-6 text-primary" />,
      title: "Instant Access",
      description: "Download and read on any device, anytime, anywhere",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Regular Updates",
      description: "Fresh content delivered to your inbox every month",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "Stunning Design",
      description: "Beautiful layouts that enhance your reading experience",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure Platform",
      description: "Your data and purchases are always protected",
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Award-Winning",
      description: "Recognized for excellence in digital publishing",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community Access",
      description: "Join discussions with like-minded readers",
    },
    {
      icon: <Gift className="h-6 w-6 text-primary" />,
      title: "Exclusive Offers",
      description: "Special discounts and promotions for subscribers",
    },
  ]

  return (
    <div className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Us</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We deliver exceptional digital magazine experiences that stand out from the rest
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-muted/50 rounded-lg p-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Commitment to Quality</h2>
              <p className="text-muted-foreground">
                We believe that digital magazines should offer the same quality and experience as print, with the added
                benefits of digital technology. That's why we work with top writers, designers, and editors to create
                magazines that are informative, beautiful, and easy to read.
              </p>
              <p className="text-muted-foreground">
                Our platform is designed with readers in mind, offering features that enhance your reading experience
                and make it easy to discover new content that matches your interests.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Magazine quality showcase"
                className="rounded-lg shadow-md"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to experience the difference?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Browse Our Collection</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

