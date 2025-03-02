import Hero from "@/components/hero"
import WhyChooseUsPreview from "@/components/why-choose-us-preview"
import ProductsPreview from "@/components/products-preview"
import dynamic from "next/dynamic"
const ClientReviewsPreview = dynamic(() => import("@/components/client-reviews-preview"), { ssr: false })
import WhoWeArePreview from "@/components/who-we-are-preview"
import ContactPreview from "@/components/contact-preview"
import BlogPreview from "@/components/blog-preview"

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUsPreview />
      <ProductsPreview />
      <WhoWeArePreview />
      <ClientReviewsPreview />
      <BlogPreview />
      <ContactPreview />
    </>
  )
}

