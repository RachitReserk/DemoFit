"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail("")
    }, 1500)
  }

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-zinc-300 mb-8">
            Stay updated with the latest fitness insights, training tips, and exclusive content delivered directly to
            your inbox.
          </p>

          {isSubmitted ? (
            <div className="bg-zinc-800 p-8 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--gold))] flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thank You for Subscribing!</h3>
              <p className="text-zinc-300">
                You've been added to our newsletter. Watch your inbox for exclusive fitness content and special offers.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-black rounded-full mr-2"></span>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

