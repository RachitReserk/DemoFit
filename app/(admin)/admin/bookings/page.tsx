import BookingManagement from "@/components/admin/booking-management"

export const metadata = {
  title: "Booking Management | Aesthetic Lab Admin",
  description: "Manage bookings and reservations for Aesthetic Lab",
}

export default function AdminBookingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>
      <BookingManagement />
    </div>
  )
}

