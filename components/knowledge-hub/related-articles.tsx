import Link from "next/link"
import Image from "next/image"

export default function RelatedArticles({ articles }: { articles: any[] }) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 relative">
            Related Articles
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-[hsl(var(--gold))] -mb-4"></span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} href={`/knowledge-hub/${article.slug}`} className="group">
                <div className="relative h-[200px] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-[hsl(var(--gold))] transition-colors">
                  {article.title}
                </h3>

                <p className="text-zinc-300 text-sm line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

