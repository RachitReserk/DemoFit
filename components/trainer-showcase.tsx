//done
import Image from "next/image"
import alex from "@/public/alex.avif"
import sarah from "@/public/sarah.avif"
import mark from "@/public/mark.avif"

export default function TrainerShowcase() {
  const trainers = [
    {
      name: "Alex Morgan",
      title: "Head Strength Coach",
      bio: "With over 15 years of experience training elite athletes and executives, Alex specializes in strength development and body composition transformation. NSCA Certified Strength and Conditioning Specialist.",
      image: alex,
    },
    {
      name: "Sarah Chen",
      title: "Nutrition & Recovery Specialist",
      bio: "Sarah combines her background in nutritional biochemistry with practical coaching to help clients optimize their metabolism and recovery protocols. Precision Nutrition Level 2 Coach.",
      image: sarah,
    },
    {
      name: "Marcus Williams",
      title: "Movement & Mobility Expert",
      bio: "Former professional dancer turned fitness expert, Marcus focuses on functional movement patterns and mobility to enhance performance and prevent injuries. FRC Mobility Specialist.",
      image: mark,
    },
  ]

  return (
    <section className="bg-black py-20">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto">Elite Trainers</h2>
        <p className="text-center max-w-3xl mx-auto mb-16 text-zinc-300">
          Our team of expert coaches brings decades of specialized experience to help you achieve your fitness goals.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                <Image
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white">{trainer.bio}</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold">{trainer.name}</h3>
              <p className="gold-text">{trainer.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

