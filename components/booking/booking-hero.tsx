import Image from "next/image"

export default function BookingHero() {
  return (
    <section className="relative h-[40vh] md:h-[50vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Aesthetic Lab booking"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Book Your Session</h1>
          <div className="w-20 h-1 gold-bg mb-8"></div>
          <p className="text-xl md:text-2xl">
            Schedule your training session, assessment, or recovery therapy with our expert team.
          </p>
        </div>
      </div>
    </section>
  )
}

