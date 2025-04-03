"use client"

import { useState, useEffect } from "react"
import { locations } from "@/data/locations"
import { services } from "@/data/services"
import { trainers } from "@/data/trainers"
import { CalendarIcon, Clock, MapPin, User } from "lucide-react"

export default function BookingForm() {
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [selectedTrainer, setSelectedTrainer] = useState("")
  const [calendlyUrl, setCalendlyUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Filter trainers based on selected location
  const availableTrainers = selectedLocation
    ? trainers.filter((trainer) =>
        locations[selectedLocation as keyof typeof locations]?.trainers.some((t: any) => t?.slug === trainer.slug),
      )
    : []

  // Update Calendly URL when selections change
  useEffect(() => {
    if (selectedLocation && selectedService) {
      setIsLoading(true)

      // Base Calendly URL
      let url = "https://calendly.com/aestheticlab/"

      // Add service to URL
      url += selectedService.toLowerCase().replace(/\s+/g, "-")

      // Add location as a query parameter
      url += `?location=${selectedLocation}`

      // Add trainer as a query parameter if selected
      if (selectedTrainer) {
        url += `&trainer=${selectedTrainer}`
      }

      // Set the URL and hide loading state
      setCalendlyUrl(url)

      // Simulate loading delay for Calendly widget
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [selectedLocation, selectedService, selectedTrainer])

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Booking Options */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">Booking Details</h2>
                <p className="text-zinc-300 mb-8">
                  Select your preferred location, service, and trainer to schedule your session.
                </p>
              </div>

              {/* Location Selection */}
              <div>
                <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin size={18} className="gold-text" />
                  Select Location
                </label>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(locations).map(([key, location]) => (
                    <button
                      key={key}
                      className={`p-4 border-2 text-left transition-all ${
                        selectedLocation === key
                          ? "border-[hsl(var(--gold))] bg-black"
                          : "border-zinc-800 hover:border-zinc-600"
                      }`}
                      onClick={() => {
                        setSelectedLocation(key)
                        setSelectedTrainer("") // Reset trainer when location changes
                      }}
                    >
                      <h3 className="font-semibold">{location.name}</h3>
                      <p className="text-sm text-zinc-400">{location.address}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarIcon size={18} className="gold-text" />
                  Select Service
                </label>
                <div className="grid grid-cols-1 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      className={`p-4 border-2 text-left transition-all ${
                        selectedService === service.name
                          ? "border-[hsl(var(--gold))] bg-black"
                          : "border-zinc-800 hover:border-zinc-600"
                      }`}
                      onClick={() => setSelectedService(service.name)}
                      disabled={!selectedLocation}
                    >
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-zinc-400">
                        {service.duration} | ${service.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trainer Selection (Optional) */}
              {selectedLocation && selectedService && (
                <div>
                  <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
                    <User size={18} className="gold-text" />
                    Select Trainer (Optional)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availableTrainers.map((trainer) => (
                      <button
                        key={trainer.slug}
                        className={`p-4 border-2 text-left transition-all ${
                          selectedTrainer === trainer.slug
                            ? "border-[hsl(var(--gold))] bg-black"
                            : "border-zinc-800 hover:border-zinc-600"
                        }`}
                        onClick={() => setSelectedTrainer(trainer.slug)}
                      >
                        <h3 className="font-semibold">{trainer.name}</h3>
                        <p className="text-sm text-zinc-400">{trainer.title}</p>
                      </button>
                    ))}
                    <button
                      className={`p-4 border-2 text-left transition-all ${
                        selectedTrainer === ""
                          ? "border-[hsl(var(--gold))] bg-black"
                          : "border-zinc-800 hover:border-zinc-600"
                      }`}
                      onClick={() => setSelectedTrainer("")}
                    >
                      <h3 className="font-semibold">No Preference</h3>
                      <p className="text-sm text-zinc-400">Any available trainer</p>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar View */}
            <div className="md:col-span-3 bg-zinc-800 rounded-lg overflow-hidden">
              {!selectedLocation || !selectedService ? (
                <div className="h-full flex items-center justify-center p-8 text-center">
                  <div>
                    <Clock size={48} className="mx-auto mb-4 text-zinc-500" />
                    <h3 className="text-xl font-semibold mb-2">Select Location and Service</h3>
                    <p className="text-zinc-400">
                      Please select your preferred location and service to view available time slots.
                    </p>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--gold))]"></div>
                </div>
              ) : (
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Schedule appointment"
                  className="w-full"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

