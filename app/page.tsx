import HeroSection from "@/components/hero-section"
import CoreValues from "@/components/core-values"
import TrainerShowcase from "@/components/trainer-showcase"
import RecoveryEquipment from "@/components/recovery-equipment"
import LocationSelector from "@/components/location-selector"
import TestimonialsSlider from "@/components/testimonials-slider"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <CoreValues />
      <TrainerShowcase />
      <RecoveryEquipment />
      <LocationSelector />
      <TestimonialsSlider />
    </main>
  )
}

