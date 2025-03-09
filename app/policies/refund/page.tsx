import React from "react"

export default function RefundPolicy() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Refund & Return Policy</h1>
      
      <section className="space-y-6">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Return, Refund, and Cancellation Policy</h2>
          
          <div className="mb-6">
            <p className="mb-4">
              For our digital magazine subscriptions and products, refunds are 
              available under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>If the digital content is inaccessible due to technical issues from our end</li>
              <li>If the subscription payment was processed but access wasn&apos;t granted</li>
              <li>If you were charged multiple times for the same subscription</li>
              <li>If the magazine issue or digital content wasn&apos;t delivered as described</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">For Physical Magazine Copies:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Returns are accepted within 7 days of delivery if the magazine arrives damaged</li>
              <li>Photographic evidence of damage may be required</li>
              <li>Refunds will be processed for lost shipments that never arrive</li>
              <li>Full refund if we cancel your order for any reason</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Magazine Standards</h2>
            <ul className="list-none space-y-3">
              <li>✓ High-quality print materials</li>
              <li>✓ Premium photography and content</li>
              <li>✓ Carefully packaged for shipping</li>
              <li>✓ Quality-checked before dispatch</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivering exceptional magazine content that meets international standards</li>
              <li>Supporting quality journalism and visual storytelling</li>
              <li>Providing reliable customer service for all subscription-related queries</li>
              <li>Maintaining transparency in our refund and return processes</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mt-8">
            <p className="text-sm">
              For refund requests or queries, please contact us at:{" "}
              <a href="mailto:execuv@gmail.com" className="text-primary hover:underline">
                execuv@gmail.com
              </a>
            </p>
            <p className="text-sm mt-2">
              Note: Refunds are typically processed within 5-7 working days after approval.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-600">
              EXCLUVISION reserves the right to modify this refund policy at any time. 
              Any changes will be effective immediately upon posting on the website.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
