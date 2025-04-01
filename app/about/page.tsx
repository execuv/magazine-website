"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 15 years in digital publishing, Sarah founded MagPDF with a vision to revolutionize how we consume magazine content.",
    },
    {
      name: "David Chen",
      role: "Creative Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "David brings his award-winning design expertise to ensure all our magazines maintain the highest visual standards.",
    },
    {
      name: "Emily Rodriguez",
      role: "Content Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emily curates our magazine collection, working with writers and editors to deliver exceptional content.",
    },
    {
      name: "Michael Thompson",
      role: "Technical Lead",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael ensures our platform provides a seamless reading experience across all devices.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <div className="py-8 sm:py-16 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center mb-12 sm:mb-16"
          >
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                About The Execuvison
              </h1>
              <p className="max-w-[800px] text-muted-foreground text-lg sm:text-xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed">
                Where Vision Meets Business Excellence
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center mb-16 sm:mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="inline-block rounded-lg bg-primary px-3 py-1 sm:px-4 sm:py-1.5 text-sm font-medium text-white">
                Our Story
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
                Illuminating the Business Landscape
              </h2>
              <div className="space-y-3 sm:space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                <p>
                  <span className="text-primary font-semibold">The Execuvison</span> manifests an intelligible & clear perspective of the global business ecosystem, bridging the gap between visionary ideas and strategic execution.
                </p>
                <p>
                  Our skilled team of analysts and industry experts explore the world of economics with innovative thinking to provide accurate projections and insights. We conduct comprehensive ground research and meticulous data analysis to emerge as your trusted strategic partner in business development.
                </p>
                <p>
                  From detailed case studies of business successes to in-depth market analysis across IT, finance, retail, healthcare and more, we deliver content that inspires both established entrepreneurs and emerging talents alike.
                </p>
                <p>
                  With over <span className="text-primary font-medium">250,000 readers worldwide</span>, we've established ourselves as one of the most trusted global business publications, providing essential insights for tomorrow's business leaders.
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.03 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Button size="lg" className="rounded-full w-full sm:w-auto">
                  <Link href="/magazines">Explore Our Publications</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto">
                  <Link href="/contact">Partner With Us</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end mt-8 sm:mt-0"
            >
              <div className="relative">
                <div className="absolute -z-10 top-4 sm:top-8 left-4 sm:left-8 w-full h-full bg-primary/10 rounded-xl"></div>
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="The Execuvison Team"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-xl"
                  width={600}
                  height={500}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 rounded-lg bg-background p-4 sm:p-6 shadow-xl border border-border"
                >
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">Est.</div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">2018</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-px md:grid-cols-4 mb-16 sm:mb-24 bg-border rounded-xl overflow-hidden shadow-lg"
          >
            {[
              { value: "50+", label: "Magazine Titles" },
              { value: "250k+", label: "Global Readers" },
              { value: "12", label: "Industry Awards" },
              { value: "24/7", label: "Expert Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 bg-card p-4 sm:p-8"
              >
                <div className="text-2xl sm:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wide uppercase text-center">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

            <section className="mb-16 sm:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-2xl sm:text-4xl font-bold tracking-tighter mb-8 sm:mb-12 text-center"
            >
              <span className="relative">
              Our Guiding Principles
              <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
              <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)" }}
              className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-md relative overflow-hidden group"
              >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/50"></div>
              <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex flex-col space-y-3 relative z-10">
                <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="inline-block rounded-lg bg-primary/10 p-2.5 text-primary w-fit"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path d="M12 2 4 7l8 5 8-5-8-5Z" />
                  <path d="m4 12 8 5 8-5" />
                  <path d="m4 17 8 5 8-5" />
                </svg>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                We empower businesses through precision planning and <span className="text-primary font-medium">actionable intelligence</span> that transforms strategic
                initiatives into tangible results. <span className="text-primary font-semibold">"The Execuvison"</span> is
                dedicated to illuminating the path to sustainable growth and operational excellence.
                </p>
                <div className="h-0.5 w-12 bg-primary/30 rounded-full mt-1"></div>
              </div>
              </motion.div>

              <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)" }}
              className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-md relative overflow-hidden group"
              >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/80"></div>
              <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex flex-col space-y-3 relative z-10">
                <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="inline-block rounded-lg bg-primary/10 p-2.5 text-primary w-fit"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                We envision a business landscape where innovation thrives through <span className="text-primary font-medium">strategic foresight</span>. 
                We aim to be the premier catalyst for developing tomorrow's business leaders by mapping
                emerging opportunities and illuminating pathways through the complex challenges of the modern commercial ecosystem.
                </p>
                <div className="h-0.5 w-12 bg-primary/30 rounded-full mt-1"></div>
              </div>
              </motion.div>
            </div>
            </section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-24"
          >
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tighter mb-8 sm:mb-12 text-center">
              <span className="relative">
                Why Choose The Execuvison
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  title: "Data-Driven Insights",
                  description: "Our analysis is built on comprehensive research and verified data points",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  ),
                },
                {
                  title: "Industry Expertise",
                  description: "Our team brings decades of specialized experience across business sectors",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  ),
                },
                {
                  title: "Global Perspective",
                  description: "We analyze market trends and opportunities from an international viewpoint",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                  ),
                },
                {
                  title: "Forward Thinking",
                  description: "We don't just report on the present, we anticipate future market directions",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V10" />
                      <path d="M8.5 2h7" />
                      <path d="m7 16 3-3 3 3" />
                    </svg>
                  ),
                },
                {
                  title: "Actionable Strategies",
                  description: "Every insight comes with practical applications for your business growth",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  ),
                },
                {
                  title: "Editorial Excellence",
                  description: "Our content meets the highest standards of journalistic integrity and clarity",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L21 13" />
                      <path d="M22 21H7" />
                      <path d="m5 11 9 9" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4 rounded-xl border border-border bg-card hover:bg-accent/10 transition-colors"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary w-fit">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}
