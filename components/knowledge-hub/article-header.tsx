import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

export default function ArticleHeader({ article }: { article: any }) {
  return (
    <section className="pt-32 pb-12 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href={`/knowledge-hub?category=${article.category}`}
              className="text-[hsl(var(--gold))] hover:underline"
            >
              ← Back to {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Link
              href={`/knowledge-hub?category=${article.category}`}
              className="px-3 py-1 bg-zinc-800 text-sm rounded-full hover:bg-zinc-700 transition-colors"
            >
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Link>
            <span className="text-zinc-400 text-sm flex items-center gap-1">
              <Calendar size={14} />
              {article.date}
            </span>
            <span className="text-zinc-400 text-sm flex items-center gap-1">
              <Clock size={14} />
              {article.readTime} min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>

          <p className="text-xl text-zinc-300 mb-8">{article.excerpt}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image
                src={article.author.image || "/placeholder.svg"}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">{article.author.name}</p>
              <p className="text-sm text-zinc-400">{article.author.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

