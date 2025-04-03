import Image from "next/image"
import knowledge from "@/public/knowledge.avif"

export default function KnowledgeHubHero() {
  return (
    <section className="relative h-[55vh] md:h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <Image
          src={knowledge}
          alt="Aesthetic Lab Knowledge Hub"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Knowledge Hub</h1>
          <div className="w-20 h-1 gold-bg mb-8"></div>
          <p className="text-xl md:text-2xl">
            Expert insights on strength training, nutrition, recovery, and lifestyle optimization.
          </p>
        </div>
      </div>
    </section>
  )
}

