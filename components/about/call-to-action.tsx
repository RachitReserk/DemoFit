// done
import Link from "next/link"
import Image from "next/image"
import bg from "@/public/bg3.avif"

export default function CallToAction() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <Image
          src={bg}
          alt="Aesthetic Lab training"
          fill
          className="object-cover"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet the Experts Behind Your Transformation</h2>
          <p className="text-xl mb-10 text-zinc-300">
            Our team of elite trainers brings decades of specialized experience and a passion for excellence to every
            session.
          </p>
          <Link href="/trainers" className="btn-primary inline-block">
            Meet Our Trainers
          </Link>
        </div>
      </div>
    </section>
  )
}

