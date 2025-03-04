"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { isEmailLink, signInWithEmail } from "@/firebase/auth"
import { Icons } from "@/components/ui/icons"

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const verifyEmail = async () => {
      // Check if link is valid
      if (isEmailLink(window.location.href)) {
        // Get email from localStorage
        let email = window.localStorage.getItem('emailForSignIn')
        
        if (!email) {
          // If email is not in storage, prompt user
          email = window.prompt('Please provide your email for confirmation')
        }

        if (email) {
          try {
            const { user, error } = await signInWithEmail(email, window.location.href)
            if (error) throw new Error(error)
            
            toast.success("Email verified successfully!")
            router.push("/")
          } catch (error) {
            toast.error(error.message || "Verification failed")
            router.push("/auth/login")
          }
        }
      } else {
        toast.error("Invalid verification link")
        router.push("/auth/login")
      }
      setIsVerifying(false)
    }

    verifyEmail()
  }, [router])

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center">
      {isVerifying ? (
        <div className="flex flex-col items-center space-y-4">
          <Icons.loader className="h-8 w-8 animate-spin" />
          <p>Verifying your email...</p>
        </div>
      ) : null}
    </div>
  )
}
