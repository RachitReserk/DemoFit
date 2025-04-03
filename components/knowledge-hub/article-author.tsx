import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter } from "lucide-react"

export default function ArticleAuthor({ author }: { author: any }) {
  return (
    <section className="py-12 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black p-8 rounded-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden relative flex-shrink-0">
                <Image src={author.image || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{author.name}</h3>
                <p className="text-[hsl(var(--gold))] mb-4">{author.title}</p>
                <p className="text-zinc-300 mb-4">{author.bio}</p>

                <div className="flex gap-4">
                  {author.social?.instagram && (
                    <Link
                      href={author.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[hsl(var(--gold))] transition-colors"
                    >
                      <Instagram size={20} />
                    </Link>
                  )}

                  {author.social?.twitter && (
                    <Link
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[hsl(var(--gold))] transition-colors"
                    >
                      <Twitter size={20} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

