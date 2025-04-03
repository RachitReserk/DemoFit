import Link from "next/link"
import LocationGallery from "./location-gallery"
import LocationMap from "./location-map"
import LocationTrainers from "./location-trainers"
import LocationInfo from "./location-info"

export default function LocationDetail({ location }: { location: any }) {
  return (
    <div className="space-y-16">
      {/* Gallery Section */}
      <LocationGallery images={location.gallery} locationName={location.name} />

      {/* Info and Map Section */}
      <div className="grid md:grid-cols-2 gap-12">
        <LocationInfo location={location} />
        <LocationMap address={location.address} mapUrl={location.mapUrl} locationName={location.name} />
      </div>

      {/* Trainers Section */}
      <LocationTrainers trainers={location.trainers} locationName={location.name} />

      {/* Booking Section */}
      <div className="bg-black p-10 rounded-lg text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Experience {location.name}?</h3>
        <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
          Schedule a complimentary assessment or book a session with one of our expert trainers at our {location.name}{" "}
          location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/booking?location=${location.slug}`} className="btn-primary">
            Book a Session
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border-2 border-zinc-700 text-white hover:border-[hsl(var(--gold))] transition-all duration-300 uppercase tracking-wider text-sm font-semibold"
          >
            Schedule a Tour
          </Link>
        </div>
      </div>
    </div>
  )
}

