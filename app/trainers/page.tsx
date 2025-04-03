import TrainersGrid from "@/components/trainers/trainers-grid"
import TrainersHero from "@/components/trainers/trainers-hero"

export const metadata = {
  title: "Our Trainers | Aesthetic Lab",
  description: "Meet our elite team of trainers at Aesthetic Lab, Manhattan's premier luxury fitness experience.",
}

export default function TrainersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TrainersHero />
      <TrainersGrid />
    </main>
  )
}

