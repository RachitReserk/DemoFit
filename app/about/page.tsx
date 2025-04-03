import AboutHero from "@/components/about/about-hero"
import BrandStory from "@/components/about/brand-story"
import MissionVision from "@/components/about/mission-vision"
import CoreValues from "@/components/about/core-values"
import TrainerPhilosophy from "@/components/about/trainer-philosophy"
import Certifications from "@/components/about/certifications"
import CallToAction from "@/components/about/call-to-action"

export const metadata = {
  title: "About | Aesthetic Lab",
  description:
    "Learn about Aesthetic Lab, Manhattan's premier luxury fitness experience, our story, mission, and training philosophy.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <AboutHero />
      <BrandStory />
      <MissionVision />
      <CoreValues />
      <TrainerPhilosophy />
      <Certifications />
      <CallToAction />
    </main>
  )
}

