"use client"

import { useState } from "react"
import LocationStep from "./steps/location-step"
import ServiceStep from "./steps/service-step"
import TrainerStep from "./steps/trainer-step"
import DateTimeStep from "./steps/date-time-step"
import ContactStep from "./steps/contact-step"
import ReviewStep from "./steps/review-step"
import ConfirmationStep from "./steps/confirmation-step"
import BookingProgress from "./booking-progress"

export default function BookingProcess() {
  // Current step in the booking process
  const [currentStep, setCurrentStep] = useState(1)

  // Booking data
  const [bookingData, setBookingData] = useState({
    location: "",
    service: "",
    trainer: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    bookingId: "",
  })

  // Update booking data
  const updateBookingData = (data: Partial<typeof bookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  // Go to next step
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Go to previous step
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Reset booking process
  const resetBooking = () => {
    setCurrentStep(1)
    setBookingData({
      location: "",
      service: "",
      trainer: "",
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
      bookingId: "",
    })
  }

  // Submit booking
  const submitBooking = async () => {
    try {
      // In a real application, this would be an API call to your backend
      // For now, we'll simulate a successful booking with a timeout

      // Generate a random booking ID
      const bookingId = `AL-${Math.floor(100000 + Math.random() * 900000)}`

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update booking data with ID
      updateBookingData({ bookingId })

      // Move to confirmation step
      nextStep()
    } catch (error) {
      console.error("Error submitting booking:", error)
      // Handle error (would show error message in a real application)
    }
  }

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <BookingProgress currentStep={currentStep} />

          {/* Step content */}
          <div className="mt-12 bg-black p-8 rounded-lg">
            {currentStep === 1 && (
              <LocationStep bookingData={bookingData} updateBookingData={updateBookingData} nextStep={nextStep} />
            )}

            {currentStep === 2 && (
              <ServiceStep
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {currentStep === 3 && (
              <TrainerStep
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {currentStep === 4 && (
              <DateTimeStep
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {currentStep === 5 && (
              <ContactStep
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {currentStep === 6 && (
              <ReviewStep bookingData={bookingData} prevStep={prevStep} submitBooking={submitBooking} />
            )}

            {currentStep === 7 && <ConfirmationStep bookingData={bookingData} resetBooking={resetBooking} />}
          </div>
        </div>
      </div>
    </section>
  )
}

