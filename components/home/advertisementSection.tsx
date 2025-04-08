import AdvertisementBar from "./advertisementbar"

export default function AdvertisementSection() {
  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        {/* First horizontal ad bar (287x90px) */}
        <div className="flex justify-center mb-8">
          <AdvertisementBar
           width={980}
            height={110}
            imageUrl="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=287&h=90&auto=format&fit=crop&q=80"
          />
        </div>

        {/* Second horizontal ad bar (980x110px) */}
        <div className="flex justify-center mb-8">
          <AdvertisementBar
            width={980}
            height={110}
            imageUrl="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=980&h=110&auto=format&fit=crop&q=80"
          />
        </div>

        {/* Two-column layout with sidebar ad */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          

          {/* Content area */}
          <div className="md:col-span-3">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Advertise with ExecuVision</h3>
              <p className="text-muted-foreground mb-4">
                Reach our audience of business executives, industry leaders, and decision-makers through strategic
                advertising placements on our platform.
              </p>
              <p className="text-muted-foreground mb-4">
                Our various ad formats provide flexibility to showcase your brand, products, or services to a highly
                engaged professional audience.
              </p>
              <p className="text-muted-foreground">
                Contact our advertising team today to learn more about our competitive rates and premium placement
                opportunities.
              </p>
            </div>
          </div>

          {/* Sidebar ad (280x280px) */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-4">
              <AdvertisementBar
                width={280}
                height={280}
                className="mx-auto"
                imageUrl="https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=280&h=280&auto=format&fit=crop&q=80"
              />
              <div className="text-center">
                <h3 className="text-lg font-medium">Smart and responsive</h3>
                <p className="text-sm text-muted-foreground">Side bar adv</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
