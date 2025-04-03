import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

export default function TrainerCTA({ trainer }: { trainer: any }) {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-zinc-900 p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Train with {trainer.name.split(" ")[0]}</h2>

          <div className="flex items-center gap-4 mb-8 justify-center">
            <Clock className="gold-text" />
            <p className="text-zinc-300">{trainer.availability}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary flex items-center justify-center gap-2">
              <Calendar size={18} />
              Book a Session
            </Link>

            <Link
              href="/assessment"
              className="px-6 py-3 border-2 border-zinc-700 text-white hover:border-[hsl(var(--gold))] transition-all duration-300 uppercase tracking-wider text-sm font-semibold flex items-center justify-center gap-2"
            >
              Schedule Assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

