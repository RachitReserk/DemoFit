import { notFound } from "next/navigation"
import { trainers } from "@/data/trainers"
import TrainerHero from "@/components/trainers/trainer-hero"
import TrainerBio from "@/components/trainers/trainer-bio"
import TrainerTestimonials from "@/components/trainers/trainer-testimonials"
import TrainerVideos from "@/components/trainers/trainer-videos"
import TrainerCTA from "@/components/trainers/trainer-cta"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const trainer = trainers.find((t) => t.slug === params.slug)

  if (!trainer) {
    return {
      title: "Trainer Not Found | Aesthetic Lab",
      description: "The requested trainer profile could not be found.",
    }
  }

  return {
    title: `${trainer.name} | Aesthetic Lab Trainers`,
    description: trainer.shortBio,
  }
}

export async function generateStaticParams() {
  return trainers.map((trainer) => ({
    slug: trainer.slug,
  }))
}

export default function TrainerPage({ params }: { params: { slug: string } }) {
  const trainer = trainers.find((t) => t.slug === params.slug)

  if (!trainer) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <TrainerHero trainer={trainer} />
      <TrainerBio trainer={trainer} />
      <TrainerTestimonials trainer={trainer} />
      {trainer.videos && trainer.videos.length > 0 && <TrainerVideos trainer={trainer} />}
      <TrainerCTA trainer={trainer} />
    </main>
  )
}

