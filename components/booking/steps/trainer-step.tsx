"use client"
import { trainers } from "@/data/trainers"
import { locations } from "@/data/locations"
import Image from "next/image"

interface TrainerStepProps {
  bookingData: any
  updateBookingData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export default function TrainerStep({ bookingData, updateBookingData, nextStep, prevStep }: TrainerStepProps) {
  // Filter trainers based on selected location
  const availableTrainers = trainers.filter((trainer) =>
    locations[bookingData.location as keyof typeof locations]?.trainers.some((t: any) => t?.slug === trainer.slug),
  )

  const handleSelectTrainer = (trainerSlug: string) => {
    updateBookingData({ trainer: trainerSlug })
  }

  const handleNoPreference = () => {
    updateBookingData({ trainer: "no-preference" })
  }

  const handleContinue = () => {
    // Trainer selection is optional, so we can continue even if no trainer is selected
    // But we'll set it to 'no-preference' if nothing is selected
    if (!bookingData.trainer) {
      updateBookingData({ trainer: "no-preference" })
    }
    nextStep()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Trainer (Optional)</h2>
      <p className="text-zinc-300 mb-8">
        Choose your preferred trainer or select "No Preference" if you don't have a specific trainer in mind.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {availableTrainers.map((trainer) => (
          <div
            key={trainer.slug}
            className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
              bookingData.trainer === trainer.slug
                ? "border-[hsl(var(--gold))]"
                : "border-zinc-800 hover:border-zinc-600"
            }`}
            onClick={() => handleSelectTrainer(trainer.slug)}
          >
            <div className="relative h-48">
              <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-xl font-bold">{trainer.name}</h3>
                  <p className="text-sm gold-text">{trainer.title}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-4 h-4 rounded-full border-2 border-[hsl(var(--gold))] flex-shrink-0 mt-1 relative">
                  {bookingData.trainer === trainer.slug && (
                    <div className="absolute inset-0.5 rounded-full bg-[hsl(var(--gold))]"></div>
                  )}
                </div>
                <span>Select this trainer</span>
              </div>

              <p className="text-sm text-zinc-300 mt-3 line-clamp-3">{trainer.shortBio}</p>
            </div>
          </div>
        ))}

        {/* No Preference Option */}
        <div
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
            bookingData.trainer === "no-preference"
              ? "border-[hsl(var(--gold))]"
              : "border-zinc-800 hover:border-zinc-600"
          }`}
          onClick={handleNoPreference}
        >
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-[hsl(var(--gold))] flex-shrink-0 mt-1 relative">
              {bookingData.trainer === "no-preference" && (
                <div className="absolute inset-0.5 rounded-full bg-[hsl(var(--gold))]"></div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold">No Preference</h3>
              <p className="text-zinc-300 mt-2">
                We'll assign you to an available trainer who specializes in your selected service.
              </p>
            </div>
          </div>
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

