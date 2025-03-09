import React from "react"

export default function ShippingPolicy() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
      
      <section className="space-y-6">
        <div className="prose prose-gray max-w-none">
          <div className="mb-8">
            <p className="text-lg">
              At EXCLUVISION, we strive to provide our customers with a smooth and hassle-free shipping experience. 
              We use trusted and reliable delivery services to ensure that your magazines reach you in a timely 
              and pristine condition.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Digital Delivery</h2>
              <p>
                For digital magazine subscriptions, access is granted immediately after successful payment processing. 
                You will receive login credentials via email within 24 hours of purchase.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Physical Magazine Shipping</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Shipping Charges:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free shipping on annual subscriptions</li>
                  <li>Standard shipping rates apply for single issues and shorter subscription periods</li>
                  <li>International shipping available at additional cost</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Delivery Timeframes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Domestic orders: 3-5 business days</li>
                <li>International orders: 7-14 business days</li>
                <li>Processing time: 24-48 hours</li>
              </ul>
              <p className="mt-4">
                You will receive a tracking number via email once your order is dispatched.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <p>
                While we ship to most countries, some restrictions may apply. We cannot deliver to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>P.O. Box addresses</li>
                <li>Certain remote areas</li>
                <li>Countries with shipping restrictions</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Delivery Issues</h2>
              <p>
                We partner with reliable courier services, but delays can occasionally occur due to circumstances 
                beyond our control. In case of any shipping issues:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Contact our customer service immediately</li>
                <li>Provide your order number and tracking information</li>
                <li>We'll work with our shipping partners to resolve the issue</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm">
              For shipping-related queries, please contact us at:{" "}
              <a href="mailto:execuv@gmail.com" className="text-primary hover:underline">
                execuv@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
