import LocationsHero from "@/components/locations/locations-hero"
import LocationTabs from "@/components/locations/location-tabs"
import LocationCTA from "@/components/locations/location-cta"

export const metadata = {
  title: "Our Locations | Aesthetic Lab",
  description:
    "Visit our premium fitness studios in Greenwich Village and TriBeCa, Manhattan. Book a session or tour our facilities.",
}

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <LocationsHero />
      <LocationTabs />
      <LocationCTA />
    </main>
  )
}

