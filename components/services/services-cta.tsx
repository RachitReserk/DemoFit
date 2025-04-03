import Link from "next/link"
import Image from "next/image"

export default function ServicesCTA() {
  return (
    <section className="py-20 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1639496908117-6633c4aa9592?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFRyYW5zZm9ybSUyMHBoeXNxaXVlJTIwZ3ltfGVufDB8fDB8fHww"
          alt="Aesthetic Lab training"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Physique?</h2>
          <p className="text-xl mb-10 text-zinc-300">
            Experience the Aesthetic Lab difference with our comprehensive approach to fitness, nutrition, and recovery.
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

