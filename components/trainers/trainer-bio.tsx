export default function TrainerBio({ trainer }: { trainer: any }) {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="section-title">About {trainer.name.split(" ")[0]}</h2>
            <div className="space-y-4">
              {trainer.fullBio.split("\n\n").map((paragraph: string, index: number) => (
                <p key={index} className="text-zinc-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Specializations</h2>
              <ul className="space-y-2">
                {trainer.specializations.map((specialization: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[hsl(var(--gold))] text-xl leading-none">•</span>
                    <span className="text-zinc-300">{specialization}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Certifications</h2>
              <ul className="space-y-2">
                {trainer.certifications.map((certification: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[hsl(var(--gold))] text-xl leading-none">•</span>
                    <span className="text-zinc-300">{certification}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

