import Image from "next/image"
import philosophy from "@/public/philosophy.avif"

export default function TrainerPhilosophy() {
  return (
    <section className="py-20 bg-black">
      <div className="container-custom">
        {/* Title visible on mobile only */}
        <h2 className="section-title mb-8 md:hidden">Our Training Philosophy</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-3 md:order-1">
            {/* Title visible on md screens and up */}
            <h2 className="section-title hidden md:block">Our Training Philosophy</h2>

            <div className="mt-8 md:mt-0">
              <p className="mb-6 text-zinc-300">
                At Aesthetic Lab, our training philosophy is built on the foundation of scientific principles and
                individualized programming. We reject the conventional wisdom of generic workout plans and
                one-size-fits-all approaches that dominate the fitness industry.
              </p>
              <p className="mb-6 text-zinc-300">
                Instead, we begin with a comprehensive assessment of each client's biomechanics, movement patterns, and
                physiological baseline. This data-driven approach allows us to identify specific limitations and
                opportunities unique to your body, informing a training program precisely calibrated to your needs.
              </p>
              <p className="mb-6 text-zinc-300">
                Our methodology emphasizes quality over quantity, focusing on movement efficiency, progressive overload,
                and strategic recovery. We believe that optimal results come not from random, exhaustive workouts, but
                from intelligently designed training stimuli followed by adequate recovery.
              </p>
              <p className="text-zinc-300">
                Beyond physical training, we integrate nutritional guidance and recovery protocols that complement your
                training regimen, creating a holistic system that drives sustainable results. This comprehensive
                approach ensures that every aspect of your fitness journey is optimized for success.
              </p>
            </div>
          </div>
          <div className="relative h-[600px] order-2 md:order-2">
            <Image
              src={philosophy || "/placeholder.svg"}
              alt="Aesthetic Lab trainer with client"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

