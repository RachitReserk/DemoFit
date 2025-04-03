import { Check } from "lucide-react"

export default function CoreValues() {
  const values = [
    {
      title: "Scientific Precision",
      description:
        "We ground every decision in exercise science and evidence-based practices, rejecting fitness fads in favor of methodologies with proven efficacy.",
    },
    {
      title: "Personalized Excellence",
      description:
        "We recognize the unique physiological and psychological profile of each client, crafting bespoke programs that honor individual needs and goals.",
    },
    {
      title: "Continuous Evolution",
      description:
        "We commit to perpetual learning and refinement of our craft, staying at the forefront of scientific research and innovative training techniques.",
    },
    {
      title: "Holistic Approach",
      description:
        "We address all facets of physical performance—from training stimulus to recovery protocols and nutritional strategies—creating comprehensive solutions for lasting results.",
    },
    {
      title: "Uncompromising Quality",
      description:
        "We maintain the highest standards in every aspect of our operation, from our meticulously selected equipment to our rigorously trained staff.",
    },
    {
      title: "Transformative Experience",
      description:
        "We deliver more than physical results; we create environments and relationships that positively impact our clients' relationship with fitness and themselves.",
    },
  ]

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto mb-16">Our Core Values</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-black p-8 border-t-2 gold-border">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-6 h-6 rounded-full gold-bg flex items-center justify-center">
                    <Check size={16} className="text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-zinc-300">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

