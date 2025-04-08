import Hero from "@/components/hero"
import WhyChooseUsPreview from "@/components/why-choose-us-preview"
import ProductsPreview from "@/components/products-preview"
import dynamic from "next/dynamic"
const ClientReviewsPreview = dynamic(() => import("@/components/client-reviews-preview"), { ssr: false })
import WhoWeArePreview from "@/components/who-we-are-preview"
import ContactPreview from "@/components/contact-preview"
import BlogPreview from "@/components/blog-preview"
import Footer from "@/components/footer"

import AdvertisementSection from "@/components/home/advertisementSection"
import CoverStory from "@/components/home/coverStory"
import VideoInterviews from "@/components/home/videosecton"
import PressReleases from "@/components/home/presRelease"
import CaseStudies from "@/components/home/caseStudies"
import TrustedBrands from "@/components/home/tuustedBrand"

export default function Home() {
  return (
    <>
      <Hero />
      <AdvertisementSection />
      <BlogPreview />
      <CoverStory />
      <CaseStudies />
      <VideoInterviews />
      <PressReleases />
      <TrustedBrands />
      {/* <WhyChooseUsPreview />
      <ProductsPreview />
      <WhoWeArePreview />
      <ClientReviewsPreview />
      <ContactPreview /> */}
      <Footer />
    </>
  )
}

