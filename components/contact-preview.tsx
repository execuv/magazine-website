import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactPreview() {
  return (
    <section id="contact-us" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions or feedback? We'd love to hear from you
            </p>
          </div>
          <div className="mt-6 py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

