export default function TrustedBrands() {
    const brands = [
        { 
          name: "Microsoft", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" 
        },
        { 
          name: "Google", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" 
        },
        { 
          name: "Amazon", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png" 
        },
        { 
          name: "Apple", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png" 
        },
        { 
          name: "IBM", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/512px-IBM_logo.svg.png" 
        },
        { 
          name: "Oracle", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png" 
        },
        { 
          name: "Salesforce", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png" 
        },
        { 
          name: "Adobe", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/512px-Adobe_Systems_logo_and_wordmark.svg.png" 
        },
      ]
  
    return (
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by Leading Brands</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Companies that partner with and trust ExecuVision
              </p>
            </div>
          </div>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
  
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Join these industry leaders and discover how ExecuVision can help elevate your brand.
            </p>
          </div>
        </div>
      </section>
    )
  }
  