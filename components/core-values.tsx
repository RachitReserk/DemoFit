//done
export default function CoreValues() {
  const values = [
    {
      title: "Scientific Approach",
      description:
        "Our methodology is grounded in exercise science and biomechanics, ensuring every movement pattern is optimized for your unique physiology.",
    },
    {
      title: "Personalized Programming",
      description:
        "We reject one-size-fits-all solutions. Your training program is meticulously crafted to align with your specific goals, limitations, and lifestyle.",
    },
    {
      title: "Holistic Transformation",
      description:
        "True transformation extends beyond aesthetics. We integrate nutrition, recovery, and mindset coaching to create sustainable results.",
    },
    {
      title: "Luxury Experience",
      description:
        "From our state-of-the-art facilities to our attentive staff, every detail is designed to provide an unparalleled fitness experience.",
    },
  ]

  return (
    <section className="bg-zinc-900 py-20">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto">Our Core Values</h2>
        <p className="text-center max-w-3xl mx-auto mb-16 text-zinc-300">
          At Aesthetic Lab, we believe in a methodical approach to physical transformation. Our philosophy is built on
          these foundational principles:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="border border-zinc-800 p-8 hover:border-[hsl(var(--gold))] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 gold-text">{value.title}</h3>
              <p className="text-zinc-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

