import Image from "next/image"
import trainers from "@/public/gymTrainers.avif"

export default function TrainersHero() {
  return (
    <section className="relative h-[70vh] md:h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src={trainers}
          alt="Aesthetic Lab trainers"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Elite Trainers</h1>
          <div className="w-20 h-1 gold-bg mb-8"></div>
          <p className="text-xl md:text-2xl">
            Meet our team of expert coaches who will guide your transformation journey.
          </p>
        </div>
      </div>
    </section>
  )
}

