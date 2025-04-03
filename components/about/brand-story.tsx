import Image from "next/image"
import bg from "@/public/bg2.avif"

export default function BrandStory() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container-custom">
        {/* Title visible on all screen sizes */}
        <h2 className="section-title mb-8 md:hidden">The Genesis of Aesthetic Lab</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Title only visible on md screens and up */}
            <h2 className="section-title hidden md:block">The Genesis of Aesthetic Lab</h2>

            <div className="mt-8 md:mt-0">
              <p className="mb-6 text-zinc-300">
                Aesthetic Lab was born from a vision to transform the landscape of personal training in Manhattan.
                Founded in 2018 by a collective of elite trainers and exercise scientists, our studio emerged as a
                response to the industry's one-size-fits-all approach that often prioritized quick fixes over
                sustainable results.
              </p>
              <p className="mb-6 text-zinc-300">
                Our founders, disillusioned with commercial gym environments that compromised client experience and
                results, set out to create a space where scientific principles, personalized attention, and luxury
                converge. They envisioned a training sanctuary where every detail—from equipment selection to recovery
                protocols—was meticulously curated to optimize client outcomes.
              </p>
              <p className="text-zinc-300">
                What began as a boutique studio in Greenwich Village quickly evolved into Manhattan's premier
                destination for discerning individuals seeking transformative fitness experiences. Today, with our
                expansion to TriBeCa, Aesthetic Lab continues to redefine what's possible when passion for excellence
                meets scientific precision.
              </p>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden order-first md:order-last">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <Image src={bg || "/placeholder.svg"} alt="Aesthetic Lab founders" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

