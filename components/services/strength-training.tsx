import Image from "next/image"
import Link from "next/link"

export default function StrengthTraining() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title visible on mobile only */}
        <h2 className="section-title mb-8 md:hidden">Strength Training</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* Title visible on md screens and up */}
            <h2 className="section-title hidden md:block">Strength Training</h2>

            <div className="mt-8 md:mt-0">
              <p className="mb-6 text-zinc-300">
                Our signature strength training program is built on scientific principles and personalized to your
                unique physiology. We reject cookie-cutter approaches in favor of meticulously designed protocols that
                optimize your results.
              </p>
              <p className="mb-6 text-zinc-300">
                Each session is guided by an expert coach who ensures proper technique, appropriate progression, and
                optimal training stimulus. We utilize state-of-the-art equipment and cutting-edge methodologies to
                maximize efficiency and effectiveness.
              </p>
              <p className="mb-8 text-zinc-300">
                Whether your goal is building muscle, reducing body fat, improving athletic performance, or enhancing
                overall health, our strength training program provides the foundation for your transformation.
              </p>

              <Link href="/contact" className="btn-primary inline-block">
                Book a Trial
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden order-1 md:order-2">
            <Image
              src="https://plus.unsplash.com/premium_photo-1663012934387-fa3199db8862?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEhlYXZ5JTIwd2VpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Strength training at Aesthetic Lab"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

