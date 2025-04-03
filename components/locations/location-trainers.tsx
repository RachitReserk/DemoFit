import Image from "next/image"
import Link from "next/link"

export default function LocationTrainers({
  trainers,
  locationName,
}: {
  trainers: any[]
  locationName: string
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-8">Trainers at {locationName}</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trainers.map((trainer) => (
          <Link key={trainer.slug} href={`/trainers/${trainer.slug}`} className="group">
            <div className="relative aspect-square overflow-hidden rounded-full mb-4 border-2 border-zinc-800 group-hover:border-[hsl(var(--gold))] transition-colors duration-300">
              <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
            </div>
            <h4 className="text-center font-semibold">{trainer.name}</h4>
            <p className="text-center text-sm gold-text">{trainer.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

