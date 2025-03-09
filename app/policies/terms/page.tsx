import React from "react"

export default function TermsAndConditions() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      
      <section className="space-y-6">
        <div className="prose prose-gray max-w-none">
          <div className="mb-8">
            <p className="mb-4">
              This website is operated by EXCLUVISION. Throughout the site, the terms "we", "us" and "our" 
              refer to EXCLUVISION. By accessing or using this website, including purchasing subscriptions 
              or products, you agree to be bound by these Terms and Conditions.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="border-b pb-6 last:border-b-0">
                <h2 className="text-2xl font-semibold mb-4">
                  {index + 1}. {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm">
              For any questions regarding these terms, please contact us at:{" "}
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

const sections = [
  {
    title: "Terms and Conditions",
    content: [
      "This website is operated by EXCLUVISION. Throughout the site, the terms 'we', 'us' and 'our' refer to EXCLUVISION. EXCLUVISION offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
      "By visiting our site and/or purchasing something from us, you engage in our 'Service' and agree to be bound by the following terms and conditions, including those additional terms and conditions and policies referenced herein and/or available by hyperlink.",
      "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services."
    ]
  },
  {
    title: "Online Store Terms",
    content: [
      "By agreeing to these Terms & Conditions, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
      "You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).",
      "You must not transmit any worms or viruses or any code of a destructive nature."
    ]
  },
  {
    title: "General Conditions",
    content: [
      "We reserve the right to refuse service to anyone for any reason at any time.",
      "You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.",
      "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission from us."
    ]
  },
  {
    title: "Accuracy, Completeness and Timeliness of Information",
    content: [
      "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information.",
      "We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site."
    ]
  },
  {
    title: "Modifications to the Service and Prices",
    content: [
      "Prices for our magazine subscriptions and products are subject to change without notice.",
      "We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
      "We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service."
    ]
  },
  {
    title: "Products or Services",
    content: [
      "Certain products or services may be available exclusively online through the website. These products or services may have limited quantities.",
      "We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction.",
      "We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us."
    ]
  },
  {
    title: "Accuracy of Billing and Account Information",
    content: [
      "You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.",
      "You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed."
    ]
  },
  {
    title: "Third-Party Links",
    content: [
      "Certain content, products and services available via our Service may include materials from third-parties.",
      "Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy.",
      "We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites."
    ]
  },
  {
    title: "User Comments and Feedback",
    content: [
      "If you send certain specific submissions or creative ideas, suggestions, proposals, plans, or other materials, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any feedback that you forward to us.",
      "We are and shall be under no obligation to maintain any comments in confidence or to pay compensation for any comments."
    ]
  },
  {
    title: "Personal Information",
    content: [
      "Your submission of personal information through the store is governed by our Privacy Policy.",
      "We may use your personal information to provide you with newsletters, marketing or promotional materials and other information that may be of interest to you."
    ]
  },
  {
    title: "Errors and Omissions",
    content: [
      "Occasionally there may be information on our site that contains typographical errors, inaccuracies or omissions. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information if any information in the Service is inaccurate at any time without prior notice.",
    ]
  },
  {
    title: "Prohibited Uses",
    content: [
      "You are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information."
    ]
  },
  {
    title: "Disclaimer of Warranties",
    content: [
      "We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.",
      "We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.",
      "You expressly agree that your use of, or inability to use, the service is at your sole risk."
    ]
  },
  {
    title: "Termination",
    content: [
      "These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.",
      "If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice."
    ]
  }
]
