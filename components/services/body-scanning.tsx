import Image from "next/image"
import Link from "next/link"

export default function BodyScanning() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title visible on mobile only */}
        <h2 className="section-title mb-8 md:hidden">3D Body Scanning</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* Title visible on md screens and up */}
            <h2 className="section-title hidden md:block">3D Body Scanning</h2>

            <div className="mt-8 md:mt-0">
              <p className="mb-6 text-zinc-300">
                Our state-of-the-art 3D body scanning technology provides unprecedented insight into your body
                composition, posture, and proportions. This non-invasive assessment creates a detailed digital model of
                your physique, allowing for precise measurements and analysis.
              </p>
              <p className="mb-6 text-zinc-300">
                The scan captures hundreds of measurements in seconds, tracking changes in muscle mass, fat
                distribution, circumference measurements, and postural alignment. This objective data allows us to
                identify imbalances, monitor progress, and refine your training and nutrition protocols with scientific
                precision.
              </p>
              <p className="mb-8 text-zinc-300">
                Regular scanning sessions provide visual and numerical feedback on your transformation journey, offering
                motivation and accountability while enabling our team to make data-driven adjustments to your program.
              </p>

              <Link href="/scanner" className="btn-primary inline-block">
                Book a Scan
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden order-1 md:order-2">
            <Image
              src="https://images.unsplash.com/photo-1587010580103-fd86b8ea14ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9keSUyMHNjYW4lMjBtYWNoaW5lfGVufDB8fDB8fHww"
              alt="3D body scanning at Aesthetic Lab"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

