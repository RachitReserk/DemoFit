"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ChevronDown, Edit, Filter, Search, Trash, X } from "lucide-react"
import { locations } from "@/data/locations"
import { services } from "@/data/services"
import { trainers } from "@/data/trainers"

// Mock bookings data
const mockBookings = [
  {
    id: "AL-123456",
    location: "greenwich",
    service: "Personal Training Session",
    trainer: "alex-morgan",
    date: "2023-05-15",
    time: "09:00",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(212) 555-1234",
    notes: "First time client",
    status: "confirmed",
  },
  {
    id: "AL-234567",
    location: "tribeca",
    service: "Nutrition Consultation",
    trainer: "sarah-chen",
    date: "2023-05-16",
    time: "14:30",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "(212) 555-5678",
    notes: "",
    status: "confirmed",
  },
  {
    id: "AL-345678",
    location: "greenwich",
    service: "Recovery Therapy Session",
    trainer: "marcus-williams",
    date: "2023-05-17",
    time: "16:00",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(212) 555-9012",
    notes: "Focusing on lower back",
    status: "cancelled",
  },
  {
    id: "AL-456789",
    location: "tribeca",
    service: "3D Body Scan",
    trainer: "no-preference",
    date: "2023-05-18",
    time: "10:30",
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    phone: "(212) 555-3456",
    notes: "",
    status: "confirmed",
  },
  {
    id: "AL-567890",
    location: "greenwich",
    service: "Complimentary Assessment",
    trainer: "olivia-bennett",
    date: "2023-05-19",
    time: "11:00",
    name: "William Wilson",
    email: "william.wilson@example.com",
    phone: "(212) 555-7890",
    notes: "Interested in strength training",
    status: "confirmed",
  },
]

export default function BookingManagement() {
  const [bookings, setBookings] = useState(mockBookings)
  const [filteredBookings, setFilteredBookings] = useState(mockBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    service: "",
    trainer: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  // Apply filters and search
  useEffect(() => {
    let result = bookings

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (booking) =>
          booking.id.toLowerCase().includes(term) ||
          booking.name.toLowerCase().includes(term) ||
          booking.email.toLowerCase().includes(term) ||
          booking.phone.toLowerCase().includes(term),
      )
    }

    // Apply filters
    if (filters.location) {
      result = result.filter((booking) => booking.location === filters.location)
    }

    if (filters.service) {
      result = result.filter((booking) => booking.service === filters.service)
    }

    if (filters.trainer) {
      result = result.filter((booking) => booking.trainer === filters.trainer)
    }

    if (filters.status) {
      result = result.filter((booking) => booking.status === filters.status)
    }

    if (filters.dateFrom) {
      result = result.filter((booking) => booking.date >= filters.dateFrom)
    }

    if (filters.dateTo) {
      result = result.filter((booking) => booking.date <= filters.dateTo)
    }

    setFilteredBookings(result)
  }, [bookings, searchTerm, filters])

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy")
  }

  // Format time for display
  const formatTime = (time: string) => {
    if (!time) return ""
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  // Get location name
  const getLocationName = (locationKey: string) => {
    return locations[locationKey as keyof typeof locations]?.name || locationKey
  }

  // Get trainer name
  const getTrainerName = (trainerSlug: string) => {
    if (trainerSlug === "no-preference") return "No Preference"
    return trainers.find((t) => t.slug === trainerSlug)?.name || trainerSlug
  }

  // Handle edit booking
  const handleEditBooking = (booking: any) => {
    setSelectedBooking(booking)
    setIsEditModalOpen(true)
  }

  // Handle cancel booking
  const handleCancelBooking = (booking: any) => {
    setSelectedBooking(booking)
    setIsCancelModalOpen(true)
  }

  // Confirm cancel booking
  const confirmCancelBooking = () => {
    if (!selectedBooking) return

    // Update booking status to cancelled
    const updatedBookings = bookings.map((booking) =>
      booking.id === selectedBooking.id ? { ...booking, status: "cancelled" } : booking,
    )

    setBookings(updatedBookings)
    setIsCancelModalOpen(false)
    setSelectedBooking(null)
  }

  // Save edited booking
  const saveEditedBooking = (editedBooking: any) => {
    // Update booking
    const updatedBookings = bookings.map((booking) => (booking.id === editedBooking.id ? editedBooking : booking))

    setBookings(updatedBookings)
    setIsEditModalOpen(false)
    setSelectedBooking(null)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: "",
      service: "",
      trainer: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    })
    setSearchTerm("")
  }

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="bg-zinc-900 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, phone or booking ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            />
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-black border border-zinc-700 rounded-md flex items-center gap-2 hover:border-zinc-500 transition-colors"
              onClick={() => document.getElementById("filterPanel")?.classList.toggle("hidden")}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} />
            </button>

            <button
              className="px-4 py-2 bg-black border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div id="filterPanel" className="hidden mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            >
              <option value="">All Locations</option>
              {Object.entries(locations).map(([key, location]) => (
                <option key={key} value={key}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          {/* Service Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Service</label>
            <select
              value={filters.service}
              onChange={(e) => setFilters({ ...filters, service: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            >
              <option value="">All Services</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Trainer Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Trainer</label>
            <select
              value={filters.trainer}
              onChange={(e) => setFilters({ ...filters, trainer: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            >
              <option value="">All Trainers</option>
              <option value="no-preference">No Preference</option>
              {trainers.map((trainer) => (
                <option key={trainer.slug} value={trainer.slug}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            >
              <option value="">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date From Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            />
          </div>

          {/* Date To Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-zinc-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black">
              <tr>
                <th className="px-4 py-3 text-left">Booking ID</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Date & Time</th>
                <th className="px-4 py-3 text-left">Trainer</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-zinc-800">
                    <td className="px-4 py-3">{booking.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{booking.name}</div>
                        <div className="text-sm text-zinc-400">{booking.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{getLocationName(booking.location)}</td>
                    <td className="px-4 py-3">{booking.service}</td>
                    <td className="px-4 py-3">
                      <div>
                        <div>{formatDate(booking.date)}</div>
                        <div className="text-sm text-zinc-400">{formatTime(booking.time)}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{getTrainerName(booking.trainer)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === "confirmed" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditBooking(booking)}
                          className="p-1 hover:text-[hsl(var(--gold))] transition-colors"
                          aria-label="Edit booking"
                        >
                          <Edit size={18} />
                        </button>
                        {booking.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancelBooking(booking)}
                            className="p-1 hover:text-red-500 transition-colors"
                            aria-label="Cancel booking"
                          >
                            <Trash size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-zinc-400">
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Booking Modal */}
      {isEditModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Edit Booking</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <EditBookingForm
                booking={selectedBooking}
                onSave={saveEditedBooking}
                onCancel={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {isCancelModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Cancel Booking</h3>
              <p className="text-zinc-300 mb-6">
                Are you sure you want to cancel the booking for {selectedBooking.name} on{" "}
                {formatDate(selectedBooking.date)} at {formatTime(selectedBooking.time)}?
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  No, Keep It
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition-colors"
                >
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Edit Booking Form Component
function EditBookingForm({
  booking,
  onSave,
  onCancel,
}: { booking: any; onSave: (booking: any) => void; onCancel: () => void }) {
  const [editedBooking, setEditedBooking] = useState({ ...booking })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedBooking((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedBooking)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Booking ID - Read Only */}
        <div>
          <label className="block text-sm font-medium mb-2">Booking ID</label>
          <input
            type="text"
            value={editedBooking.id}
            disabled
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-400"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            name="status"
            value={editedBooking.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          >
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Client Name</label>
          <input
            type="text"
            name="name"
            value={editedBooking.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </div>

        {/* Client Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Client Email</label>
          <input
            type="email"
            name="email"
            value={editedBooking.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </div>

        {/* Client Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">Client Phone</label>
          <input
            type="tel"
            name="phone"
            value={editedBooking.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <select
            name="location"
            value={editedBooking.location}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          >
            {Object.entries(locations).map(([key, location]) => (
              <option key={key} value={key}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium mb-2">Service</label>
          <select
            name="service"
            value={editedBooking.service}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          >
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trainer */}
        <div>
          <label className="block text-sm font-medium mb-2">Trainer</label>
          <select
            name="trainer"
            value={editedBooking.trainer}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          >
            <option value="no-preference">No Preference</option>
            {trainers.map((trainer) => (
              <option key={trainer.slug} value={trainer.slug}>
                {trainer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={editedBooking.date}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium mb-2">Time</label>
          <input
            type="time"
            name="time"
            value={editedBooking.time}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            name="notes"
            value={editedBooking.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

