import Image from "next/image"
import location from "@/public/location.avif"

export default function LocationsHero() {
  return (
    <section className="relative h-[70vh] md:h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src={location}
          alt="Aesthetic Lab locations"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Locations</h1>
          <div className="w-20 h-1 gold-bg mb-8"></div>
          <p className="text-xl md:text-2xl">
            Experience luxury fitness at our two premium Manhattan studios, each offering a unique atmosphere with the
            same uncompromising quality.
          </p>
        </div>
      </div>
    </section>
  )
}

