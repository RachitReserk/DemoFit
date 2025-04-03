import Image from "next/image"

export default function TrainerHero({ trainer }: { trainer: any }) {
  return (
    <section className="relative h-[85vh] md:h-[70vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
        <Image
          src={trainer.image || "/placeholder.svg"}
          alt={trainer.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center 19%" }} // Adjust the percentage to control how much from the top
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{trainer.name}</h1>
          <p className="text-xl gold-text mb-6">{trainer.title}</p>
          <div className="w-20 h-1 gold-bg mb-8"></div>
          <p className="text-xl md:text-2xl">{trainer.shortBio}</p>
        </div>
      </div>
    </section>
  )
}

