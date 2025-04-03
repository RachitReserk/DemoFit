"use client"

import { useState } from "react"
import { locations } from "@/data/locations"
import { services } from "@/data/services"
import { trainers } from "@/data/trainers"
import { format } from "date-fns"
import { CalendarIcon, MapPin, User, Mail, FileText } from "lucide-react"

interface ReviewStepProps {
  bookingData: any
  prevStep: () => void
  submitBooking: () => Promise<void>
}

export default function ReviewStep({ bookingData, prevStep, submitBooking }: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const location = locations[bookingData.location as keyof typeof locations]
  const service = services.find((s) => s.name === bookingData.service)
  const trainer =
    bookingData.trainer === "no-preference"
      ? { name: "No Preference", title: "Any available trainer" }
      : trainers.find((t) => t.slug === bookingData.trainer)

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return format(date, "EEEE, MMMM d, yyyy")
  }

  const formatTime = (time: string) => {
    if (!time) return ""
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await submitBooking()
    } catch (error) {
      console.error("Error submitting booking:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review Your Booking</h2>
      <p className="text-zinc-300 mb-8">Please review your booking details before confirming.</p>

      <div className="space-y-8 mb-8">
        {/* Location */}
        <div className="flex items-start gap-4">
          <MapPin className="gold-text mt-1" size={20} />
          <div>
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-zinc-300">{location?.name}</p>
            <p className="text-sm text-zinc-400">{location?.address}</p>
          </div>
        </div>

        {/* Service */}
        <div className="flex items-start gap-4">
          <FileText className="gold-text mt-1" size={20} />
          <div>
            <h3 className="font-semibold mb-1">Service</h3>
            <p className="text-zinc-300">{service?.name}</p>
            <p className="text-sm text-zinc-400">
              {service?.duration} | ${service?.price}
            </p>
          </div>
        </div>

        {/* Trainer */}
        <div className="flex items-start gap-4">
          <User className="gold-text mt-1" size={20} />
          <div>
            <h3 className="font-semibold mb-1">Trainer</h3>
            <p className="text-zinc-300">{trainer?.name}</p>
            <p className="text-sm text-zinc-400">{trainer?.title}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-start gap-4">
          <CalendarIcon className="gold-text mt-1" size={20} />
          <div>
            <h3 className="font-semibold mb-1">Date & Time</h3>
            <p className="text-zinc-300">{formatDate(bookingData.date)}</p>
            <p className="text-sm text-zinc-400">{formatTime(bookingData.time)}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex items-start gap-4">
          <Mail className="gold-text mt-1" size={20} />
          <div>
            <h3 className="font-semibold mb-1">Contact Information</h3>
            <p className="text-zinc-300">{bookingData.name}</p>
            <p className="text-sm text-zinc-400">{bookingData.email}</p>
            <p className="text-sm text-zinc-400">{bookingData.phone}</p>
          </div>
        </div>

        {/* Notes */}
        {bookingData.notes && (
          <div className="flex items-start gap-4">
            <FileText className="gold-text mt-1" size={20} />
            <div>
              <h3 className="font-semibold mb-1">Additional Notes</h3>
              <p className="text-zinc-300">{bookingData.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Cancellation Policy */}
      <div className="bg-zinc-900 p-4 rounded-lg mb-8">
        <p className="text-sm text-zinc-300">
          <span className="font-semibold">Cancellation Policy:</span> We require 24 hours' notice for cancellations or
          rescheduling to avoid being charged for the session. You can cancel or reschedule your appointment by
          contacting us directly.
        </p>
      </div>

      <div className="flex justify-between">
        <button
          className="px-6 py-3 border-2 border-zinc-700 text-white hover:border-zinc-500 transition-all duration-300 rounded-md"
          onClick={prevStep}
          disabled={isSubmitting}
        >
          Back
        </button>

        <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-black rounded-full mr-2"></span>
              Confirming...
            </span>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  )
}

