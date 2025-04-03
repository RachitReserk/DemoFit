"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    location: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        location: "",
      })
    }, 1500)
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>

          {isSubmitted ? (
            <div className="bg-zinc-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--gold))] flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p className="text-zinc-300">
                Your message has been sent successfully. Our team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black border ${
                      errors.name ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black border ${
                      errors.email ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                    placeholder="Your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="Your phone number"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Preferred Location (Optional)
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  >
                    <option value="">Select a location</option>
                    <option value="greenwich">Greenwich Village</option>
                    <option value="tribeca">TriBeCa</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="md:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="Subject of your message"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-black border ${
                      errors.message ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
              </div>

              <button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-black rounded-full mr-2"></span>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

