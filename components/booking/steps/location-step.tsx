"use client"

import { MapPin } from "lucide-react"
import { locations } from "@/data/locations"
import Image from "next/image"

interface LocationStepProps {
  bookingData: any
  updateBookingData: (data: any) => void
  nextStep: () => void
}

export default function LocationStep({ bookingData, updateBookingData, nextStep }: LocationStepProps) {
  const handleSelectLocation = (locationKey: string) => {
    updateBookingData({ location: locationKey })
  }

  const handleContinue = () => {
    if (bookingData.location) {
      nextStep()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Location</h2>
      <p className="text-zinc-300 mb-8">Choose your preferred Aesthetic Lab location for your session.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {Object.entries(locations).map(([key, location]) => (
          <div
            key={key}
            className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
              bookingData.location === key ? "border-[hsl(var(--gold))]" : "border-zinc-800 hover:border-zinc-600"
            }`}
            onClick={() => handleSelectLocation(key)}
          >
            <div className="relative h-48">
              <Image
                src={location.gallery[0].url || "/placeholder.svg"}
                alt={location.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-xl font-bold">{location.name}</h3>
                  <p className="text-sm text-zinc-300 flex items-center gap-1 mt-1">
                    <MapPin size={14} className="gold-text" />
                    {location.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-4 h-4 rounded-full border-2 border-[hsl(var(--gold))] flex-shrink-0 mt-1 relative">
                  {bookingData.location === key && (
                    <div className="absolute inset-0.5 rounded-full bg-[hsl(var(--gold))]"></div>
                  )}
                </div>
                <span>Select this location</span>
              </div>

              <ul className="text-sm text-zinc-300 space-y-1 mt-3">
                <li>• {location.hours.weekday} weekdays</li>
                <li>• {location.hours.weekend} weekends</li>
                <li>• {location.amenities.length} premium amenities</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className={`btn-primary ${!bookingData.location ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleContinue}
          disabled={!bookingData.location}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

