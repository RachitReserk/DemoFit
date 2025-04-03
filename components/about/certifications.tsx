export default function Certifications() {
  const certifications = [
    {
      category: "Strength & Conditioning",
      items: [
        "NSCA Certified Strength and Conditioning Specialist (CSCS)",
        "NSCA Certified Personal Trainer (CPT)",
        "ACSM Certified Personal Trainer",
        "NASM Performance Enhancement Specialist (PES)",
        "USA Weightlifting Sports Performance Coach",
      ],
    },
    {
      category: "Nutrition & Metabolism",
      items: [
        "Precision Nutrition Level 2 Certification",
        "ISSN Sports Nutrition Specialist",
        "NASM Fitness Nutrition Specialist",
        "PN1 Nutrition Coach",
      ],
    },
    {
      category: "Corrective Exercise & Rehabilitation",
      items: [
        "NASM Corrective Exercise Specialist (CES)",
        "Functional Range Conditioning (FRC)",
        "Functional Movement Screen (FMS)",
        "Postural Restoration Institute (PRI) Certification",
        "Dynamic Neuromuscular Stabilization (DNS)",
      ],
    },
    {
      category: "Specialized Training Methodologies",
      items: [
        "Kettlebell Athletics Level 2",
        "TRX Suspension Training Specialist",
        "Westside Barbell Certified",
        "EXOS Performance Specialist",
        "Kinstretch Certified Practitioner",
      ],
    },
  ]

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto mb-16">Our Certifications</h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {certifications.map((cert, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold mb-6 gold-text">{cert.category}</h3>
              <ul className="space-y-3">
                {cert.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[hsl(var(--gold))] text-xl leading-none">•</span>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

