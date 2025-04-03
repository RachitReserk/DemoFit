"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check both localStorage and cookies for authentication
        let isAuth = false
        try {
          // Check localStorage first (client-side only)
          if (typeof window !== "undefined") {
            isAuth = localStorage.getItem("aestheticlab_admin_auth") === "true"
          }

          // If not authenticated via localStorage, check cookies
          if (!isAuth) {
            const cookies = document.cookie.split(";")
            for (const cookie of cookies) {
              const [name, value] = cookie.trim().split("=")
              if (name === "aestheticlab_admin_auth" && value === "true") {
                isAuth = true
                // Sync with localStorage
                localStorage.setItem("aestheticlab_admin_auth", "true")
                break
              }
            }
          }
        } catch (error) {
          console.error("Auth check error:", error)
          isAuth = false
        }

        if (isAuth) {
          // Mock user data - in a real app, you would fetch this from your API
          setUser({
            id: "1",
            name: "Admin User",
            email: "admin@aestheticlab.com",
            role: "admin",
          })
        } else {
          setUser(null)
          // Redirect to login if on an admin page
          if (pathname?.startsWith("/admin") && pathname !== "/admin/login") {
            router.push("/login")
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to authenticate
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "admin@aestheticlab.com" && password === "password") {
        localStorage.setItem("aestheticlab_admin_auth", "true")
        setUser({
          id: "1",
          name: "Admin User",
          email,
          role: "admin",
        })
        router.push("/admin")
        return
      }

      throw new Error("Invalid credentials")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("aestheticlab_admin_auth")
    // Also remove the cookie
    document.cookie = "aestheticlab_admin_auth=; path=/; max-age=0"
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

