"use client"

import type React from "react"

import { useState } from "react"

interface ContactStepProps {
  bookingData: any
  updateBookingData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export default function ContactStep({ bookingData, updateBookingData, nextStep, prevStep }: ContactStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateBookingData({ [name]: value })

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

    if (!bookingData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!bookingData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!bookingData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      nextStep()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Contact Information</h2>
      <p className="text-zinc-300 mb-8">Please provide your contact details so we can confirm your booking.</p>

      <div className="space-y-6 mb-8">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookingData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-zinc-900 border ${
              errors.name ? "border-red-500" : "border-zinc-700"
            } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={bookingData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-zinc-900 border ${
              errors.email ? "border-red-500" : "border-zinc-700"
            } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-zinc-900 border ${
              errors.phone ? "border-red-500" : "border-zinc-700"
            } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={bookingData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            placeholder="Any special requests or information we should know about"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-6 py-3 border-2 border-zinc-700 text-white hover:border-zinc-500 transition-all duration-300 rounded-md"
          onClick={prevStep}
        >
          Back
        </button>

        <button className="btn-primary" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  )
}

