"use client"

import { Clock, DollarSign } from "lucide-react"
import { services } from "@/data/services"
import { locations } from "@/data/locations"

interface ServiceStepProps {
  bookingData: any
  updateBookingData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export default function ServiceStep({ bookingData, updateBookingData, nextStep, prevStep }: ServiceStepProps) {
  const handleSelectService = (serviceName: string) => {
    updateBookingData({ service: serviceName })
  }

  const handleContinue = () => {
    if (bookingData.service) {
      nextStep()
    }
  }

  // Group services by category
  const servicesByCategory: Record<string, typeof services> = {}
  services.forEach((service) => {
    if (!servicesByCategory[service.category]) {
      servicesByCategory[service.category] = []
    }
    servicesByCategory[service.category].push(service)
  })

  // Category display names
  const categoryNames: Record<string, string> = {
    consultation: "Consultations",
    training: "Training Sessions",
    nutrition: "Nutrition Services",
    assessment: "Assessments",
    recovery: "Recovery Services",
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Service</h2>
      <p className="text-zinc-300 mb-8">
        Choose the service you'd like to book at our{" "}
        {bookingData.location && locations[bookingData.location as keyof typeof locations]?.name} location.
      </p>

      {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 gold-text">{categoryNames[category]}</h3>

          <div className="space-y-4">
            {categoryServices.map((service) => (
              <div
                key={service.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  bookingData.service === service.name
                    ? "border-[hsl(var(--gold))]"
                    : "border-zinc-800 hover:border-zinc-600"
                }`}
                onClick={() => handleSelectService(service.name)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[hsl(var(--gold))] flex-shrink-0 mt-1 relative">
                    {bookingData.service === service.name && (
                      <div className="absolute inset-0.5 rounded-full bg-[hsl(var(--gold))]"></div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-semibold">{service.name}</h4>
                      <div className="flex items-center gap-1 text-[hsl(var(--gold))]">
                        <DollarSign size={16} />
                        <span className="font-semibold">{service.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    <p className="text-zinc-300 mt-3 text-sm">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          className="px-6 py-3 border-2 border-zinc-700 text-white hover:border-zinc-500 transition-all duration-300 rounded-md"
          onClick={prevStep}
        >
          Back
        </button>

        <button
          className={`btn-primary ${!bookingData.service ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleContinue}
          disabled={!bookingData.service}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

