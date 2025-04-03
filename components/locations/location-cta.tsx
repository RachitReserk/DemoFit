import Link from "next/link"
import Image from "next/image"

export default function LocationCTA() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Aesthetic Lab training"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-xl mb-10 text-zinc-300">
            Visit either of our premium Manhattan locations and discover why Aesthetic Lab is the destination of choice
            for discerning fitness enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="btn-primary">
              Schedule Complimentary Assessment
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-zinc-700 text-white hover:border-[hsl(var(--gold))] transition-all duration-300 uppercase tracking-wider text-sm font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

