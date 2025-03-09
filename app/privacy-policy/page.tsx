import React from "react"

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <section className="space-y-6">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
          <p>
            When customers make purchases on our website, as part of the buying and selling process, 
            we collect personal information including names, addresses, and email addresses. While 
            browsing our store, we automatically receive your computer&apos;s internet protocol (IP) 
            address to help us understand browser types and operating systems. With your permission, 
            we may send you emails about our magazine subscriptions, new issues, and other important updates.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Consent</h2>
          <p>
            When you provide personal information for transactions, subscription purchases, or 
            digital content access, we imply that you consent to our collecting and using this 
            information for that specific purpose only. For secondary purposes like marketing, 
            we will explicitly request your consent or provide an opt-out option.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Withdrawal of Consent</h2>
          <p>
            You may withdraw your consent for us to contact you or process your information at any 
            time by contacting us at execuv@gmail.com or through our contact form.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Payment Security</h2>
          <p>
            EXCLUVISION uses secure third-party payment gateways for processing payments. We do not 
            store your card data on our servers. All payment data is encrypted through the Payment 
            Card Industry Data Security Standard (PCI-DSS). Your transaction data is only used to 
            complete your purchase and is not saved afterward.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Third-Party Services</h2>
          <p>
            Third-party providers we use will only collect, use, and disclose your information as 
            necessary to provide their services to us. Each third-party service provider has its own 
            privacy policy regarding customer information handling.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Changes to Privacy Policy</h2>
          <p>
            EXCLUVISION reserves the right to modify this privacy policy at any time. Changes will 
            be effective immediately upon posting to the website. We encourage you to review this 
            policy frequently to stay informed about how we protect your information.
          </p>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm">
              For any questions regarding this privacy policy, please contact us at:{" "}
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
