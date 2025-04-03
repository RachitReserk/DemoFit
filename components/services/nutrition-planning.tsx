import Image from "next/image"
import Link from "next/link"

export default function NutritionPlanning() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title visible on mobile only */}
        <h2 className="section-title mb-8 md:hidden">Nutrition Planning</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden order-2 md:order-1">
            <Image
              src="https://plus.unsplash.com/premium_photo-1669056783542-9176a2579347?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fE51dHJpdGlvbiUyMFBsYW5uaW5nfGVufDB8fDB8fHww"
              alt="Nutrition planning at Aesthetic Lab"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-3 md:order-2">
            {/* Title visible on md screens and up */}
            <h2 className="section-title hidden md:block">Nutrition Planning</h2>

            <div className="mt-8 md:mt-0">
              <p className="mb-6 text-zinc-300">
                Our nutrition planning service goes beyond generic meal plans and calorie counting. We take a scientific
                approach to nutrition, analyzing your metabolic profile, activity level, and goals to create a
                personalized nutrition strategy.
              </p>
              <p className="mb-6 text-zinc-300">
                Led by our nutrition specialists, this service includes comprehensive nutritional assessment, customized
                macro and micronutrient recommendations, meal timing strategies, and ongoing adjustments based on your
                progress and feedback.
              </p>
              <p className="mb-8 text-zinc-300">
                We focus on sustainable practices that fit your lifestyle, preferences, and dietary requirements,
                ensuring that your nutrition plan supports your training program and accelerates your results.
              </p>

              <Link href="/contact" className="btn-primary inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

