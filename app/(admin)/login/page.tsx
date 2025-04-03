"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to your authentication endpoint
      // For now, we'll simulate a successful login with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple validation for demo purposes
      if (email === "admin@aestheticlab.com" && password === "password") {
        // Set a cookie or localStorage item to maintain the session
        localStorage.setItem("aestheticlab_admin_auth", "true")
        // Also set a cookie for the middleware
        document.cookie = "aestheticlab_admin_auth=true; path=/; max-age=86400"
        router.push("/admin")
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOneClickLogin = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      // Set a cookie or localStorage item to maintain the session
      localStorage.setItem("aestheticlab_admin_auth", "true")
      // Also set a cookie for the middleware
      document.cookie = "aestheticlab_admin_auth=true; path=/; max-age=86400"
      router.push("/admin")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wider">
            <span className="block">AESTHETIC</span>
            <span className="block">LAB</span>
          </h1>
          <p className="text-zinc-400 mt-2">Admin Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-zinc-900 rounded-lg p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-zinc-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  placeholder="admin@aestheticlab.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-zinc-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-zinc-500" />
                  ) : (
                    <Eye size={18} className="text-zinc-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[hsl(var(--gold))] text-black font-semibold rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></span>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Development One-Click Login */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="text-center">
              <p className="text-sm text-zinc-500 mb-4">Development Mode</p>
              <button
                onClick={handleOneClickLogin}
                disabled={isLoading}
                className="w-full py-3 bg-zinc-800 text-white font-medium rounded-md hover:bg-zinc-700 transition-colors"
              >
                {isLoading ? "Logging in..." : "One-Click Login"}
              </button>
              <p className="text-xs text-zinc-600 mt-2">For development purposes only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

