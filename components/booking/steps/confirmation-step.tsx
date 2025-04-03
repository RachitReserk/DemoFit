"use client"

import Link from "next/link"
import { locations } from "@/data/locations"
import { services } from "@/data/services"
import { trainers } from "@/data/trainers"
import { format } from "date-fns"
import { CalendarIcon, Check, Clock, Download, MapPin, User } from "lucide-react"

interface ConfirmationStepProps {
  bookingData: any
  resetBooking: () => void
}

export default function ConfirmationStep({ bookingData, resetBooking }: ConfirmationStepProps) {
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

  // In a real application, this would generate a calendar file for download
  const handleDownloadCalendar = () => {
    alert("In a real application, this would download a calendar file (.ics) for your booking.")
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-[hsl(var(--gold))] flex items-center justify-center mx-auto mb-6">
        <Check size={32} className="text-black" />
      </div>

      <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
      <p className="text-zinc-300 mb-8">
        Your booking has been confirmed. We've sent a confirmation email to {bookingData.email}.
      </p>

      <div className="bg-zinc-900 p-6 rounded-lg mb-8 text-left">
        <h3 className="text-xl font-semibold mb-4 text-center">Booking Details</h3>
        <p className="text-sm text-zinc-400 text-center mb-6">Booking ID: {bookingData.bookingId}</p>

        <div className="space-y-6">
          {/* Location */}
          <div className="flex items-start gap-4">
            <MapPin className="gold-text mt-1" size={20} />
            <div>
              <h4 className="font-semibold mb-1">Location</h4>
              <p className="text-zinc-300">{location?.name}</p>
              <p className="text-sm text-zinc-400">{location?.address}</p>
            </div>
          </div>

          {/* Service */}
          <div className="flex items-start gap-4">
            <Clock className="gold-text mt-1" size={20} />
            <div>
              <h4 className="font-semibold mb-1">Service</h4>
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
              <h4 className="font-semibold mb-1">Trainer</h4>
              <p className="text-zinc-300">{trainer?.name}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <CalendarIcon className="gold-text mt-1" size={20} />
            <div>
              <h4 className="font-semibold mb-1">Date & Time</h4>
              <p className="text-zinc-300">{formatDate(bookingData.date)}</p>
              <p className="text-sm text-zinc-400">{formatTime(bookingData.time)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          onClick={handleDownloadCalendar}
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold))] hover:text-black transition-all duration-300 rounded-md"
        >
          <Download size={18} />
          Add to Calendar
        </button>

        <Link
          href={`/contact`}
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-zinc-700 text-white hover:border-zinc-500 transition-all duration-300 rounded-md"
        >
          Contact Us
        </Link>
      </div>

      <div className="text-center">
        <button onClick={resetBooking} className="text-[hsl(var(--gold))] hover:underline">
          Book Another Session
        </button>
      </div>
    </div>
  )
}

