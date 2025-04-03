import ServicesHero from "@/components/services/services-hero"
import StrengthTraining from "@/components/services/strength-training"
import NutritionPlanning from "@/components/services/nutrition-planning"
import BodyScanning from "@/components/services/body-scanning"
import RecoveryTherapies from "@/components/services/recovery-therapies"
import ServicesCTA from "@/components/services/services-cta"

export const metadata = {
  title: "Services | Aesthetic Lab",
  description:
    "Explore our premium fitness services including strength training, nutrition planning, 3D body scanning, and recovery therapies.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <ServicesHero />
      <StrengthTraining />
      <NutritionPlanning />
      <BodyScanning />
      <RecoveryTherapies />
      <ServicesCTA />
    </main>
  )
}

