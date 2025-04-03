import BookingHero from "@/components/booking/booking-hero"
import BookingProcess from "@/components/booking/booking-process"

export const metadata = {
  title: "Book a Session | Aesthetic Lab",
  description:
    "Schedule your training session, assessment, or recovery therapy at Aesthetic Lab. Choose your preferred location, service, and time.",
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <BookingHero />
      <BookingProcess />
    </main>
  )
}

