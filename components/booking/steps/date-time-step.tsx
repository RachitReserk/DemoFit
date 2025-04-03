"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay, isBefore } from "date-fns"

interface DateTimeStepProps {
  bookingData: any
  updateBookingData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export default function DateTimeStep({ bookingData, updateBookingData, nextStep, prevStep }: DateTimeStepProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })) // Start on Monday
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  // Generate dates for the week view
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // Format day name (e.g., "Mon")
  const formatDayName = (date: Date) => format(date, "EEE")

  // Format day number (e.g., "15")
  const formatDayNumber = (date: Date) => format(date, "d")

  // Format month name (e.g., "January")
  const formatMonthName = (date: Date) => format(date, "MMMM yyyy")

  // Check if date is today
  const isToday = (date: Date) => isSameDay(date, new Date())

  // Check if date is in the past
  const isPastDate = (date: Date) => isBefore(date, new Date()) && !isToday(date)

  // Go to previous week
  const prevWeek = () => {
    setWeekStart(subWeeks(weekStart, 1))
  }

  // Go to next week
  const nextWeek = () => {
    setWeekStart(addWeeks(weekStart, 1))
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isPastDate(date)) return

    setSelectedDate(date)
    setSelectedTime(null)

    // Generate available times based on selected date
    // In a real application, this would come from your backend
    generateAvailableTimes(date)
  }

  // Generate available times for the selected date
  const generateAvailableTimes = (date: Date) => {
    // In a real application, this would be fetched from your backend
    // based on the selected location, service, trainer, and date

    // For demo purposes, we'll generate random available times
    const times = []
    const isWeekend = [0, 6].includes(date.getDay())
    const startHour = isWeekend ? 8 : 6 // 6am weekdays, 8am weekends
    const endHour = isWeekend ? 18 : 21 // 9pm weekdays, 6pm weekends

    // Generate times every 30 minutes
    for (let hour = startHour; hour < endHour; hour++) {
      for (const minute of [0, 30]) {
        // Skip some times randomly to simulate unavailable slots
        if (Math.random() > 0.7) continue

        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        times.push(timeString)
      }
    }

    setAvailableTimes(times.sort())
  }

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  // Handle continue button
  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      updateBookingData({
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
      })
      nextStep()
    }
  }

  // Format time for display (e.g., "9:00 AM")
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
      <p className="text-zinc-300 mb-8">Choose your preferred date and time for your session.</p>

      {/* Calendar Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Select Date</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={prevWeek}
              className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg">{formatMonthName(weekStart)}</span>
            <button
              onClick={nextWeek}
              className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
              aria-label="Next week"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date) => (
            <button
              key={date.toString()}
              onClick={() => handleDateSelect(date)}
              disabled={isPastDate(date)}
              className={`
                p-4 rounded-lg flex flex-col items-center justify-center transition-all
                ${isPastDate(date) ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                ${
                  selectedDate && isSameDay(date, selectedDate)
                    ? "bg-[hsl(var(--gold))] text-black"
                    : isToday(date)
                      ? "bg-zinc-800 border border-[hsl(var(--gold))]"
                      : "bg-zinc-800 hover:bg-zinc-700"
                }
              `}
            >
              <span className="text-sm font-medium">{formatDayName(date)}</span>
              <span className="text-xl font-bold mt-1">{formatDayNumber(date)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection Section */}
      {selectedDate && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Select Time</h3>

          {availableTimes.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`
                    p-3 rounded-lg text-center transition-all
                    ${selectedTime === time ? "bg-[hsl(var(--gold))] text-black" : "bg-zinc-800 hover:bg-zinc-700"}
                  `}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-800 p-6 rounded-lg text-center mb-8">
              <Clock size={32} className="mx-auto mb-3 text-zinc-500" />
              <p className="text-zinc-300">No available times for this date. Please select another date.</p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between">
        <button
          className="px-6 py-3 border-2 border-zinc-700 text-white hover:border-zinc-500 transition-all duration-300 rounded-md"
          onClick={prevStep}
        >
          Back
        </button>

        <button
          className={`btn-primary ${!selectedDate || !selectedTime ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

