import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions or feedback? We'd love to hear from you
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold">Email Us</h3>
                <p className="text-muted-foreground">contact@magpdf.com</p>
                <p className="text-muted-foreground">support@magpdf.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold">Call Us</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground">Mon-Fri: 9am-5pm EST</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold">Visit Us</h3>
                <p className="text-muted-foreground">123 Magazine Street</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-bold mb-2">Office Hours</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>Monday - Friday</div>
                <div>9:00 AM - 5:00 PM</div>
                <div>Saturday</div>
                <div>10:00 AM - 2:00 PM</div>
                <div>Sunday</div>
                <div>Closed</div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-bold mb-2">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">How do I access my purchased magazines?</h4>
                  <p className="text-sm text-muted-foreground">
                    After purchase, you can download your magazines from your account dashboard or access them via the
                    email link we send you.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">What devices can I read the magazines on?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our PDF magazines can be read on any device that supports PDF viewing, including computers, tablets,
                    e-readers, and smartphones.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Do you offer refunds?</h4>
                  <p className="text-sm text-muted-foreground">
                    We offer a 14-day money-back guarantee if you're not satisfied with your purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Send us a message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="Last Name" />
                </div>
              </div>
              <div className="space-y-2">
                <Input placeholder="Email" type="email" />
              </div>
              <div className="space-y-2">
                <Input placeholder="Subject" />
              </div>
              <div className="space-y-2">
                <Textarea placeholder="Your Message" className="min-h-[120px]" />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>

        <div className="mt-16">
          <div className="rounded-lg overflow-hidden h-[400px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564562986!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="MagPDF Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

