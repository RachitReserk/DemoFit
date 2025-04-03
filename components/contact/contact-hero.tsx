import Image from "next/image"
import contact from "@/public/contact.avif"

export default function ContactHero() {
  return (
    <section className="relative h-[70vh] md:h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src={contact}
          alt="Aesthetic Lab contact"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Contact Us</h1>
          <div className="w-20 h-1 gold-bg mb-8"></div>
          <p className="text-xl md:text-2xl">
            Get in touch with our team to learn more about our services or schedule your complimentary assessment.
          </p>
        </div>
      </div>
    </section>
  )
}

