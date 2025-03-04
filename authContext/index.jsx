"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "@/firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { logout } from "@/firebase/auth"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        setUserLoggedIn(true)
      } else {
        setCurrentUser(null)
        setUserLoggedIn(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const handleLogout = async () => {
    const { error } = await logout()
    if (error) {
      console.error("Logout error:", error)
      return false
    }
    return true
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    logout: handleLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
