import Link from "next/link"
import Image from "next/image"

export default function ArticleContent({ article }: { article: any }) {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative h-[50vh] rounded-lg overflow-hidden mb-12">
            <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            {article.content.map((section: any, index: number) => (
              <div key={index} className="mb-8">
                {section.type === "paragraph" && <p className="text-zinc-300 mb-6">{section.content}</p>}

                {section.type === "heading" && <h2 className="text-2xl font-bold mb-6">{section.content}</h2>}

                {section.type === "image" && (
                  <div className="relative h-[400px] rounded-lg overflow-hidden my-8">
                    <Image
                      src={section.url || "/placeholder.svg"}
                      alt={section.caption || ""}
                      fill
                      className="object-cover"
                    />
                    {section.caption && <p className="text-sm text-zinc-400 mt-2 text-center">{section.caption}</p>}
                  </div>
                )}

                {section.type === "list" && (
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    {section.items.map((item: string, i: number) => (
                      <li key={i} className="text-zinc-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === "quote" && (
                  <blockquote className="border-l-4 border-[hsl(var(--gold))] pl-6 py-2 my-8">
                    <p className="text-xl italic text-zinc-300">{section.content}</p>
                    {section.author && <footer className="text-sm text-zinc-400 mt-2">— {section.author}</footer>}
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/knowledge-hub?tag=${tag}`}
                    className="px-3 py-1 bg-zinc-800 text-sm rounded-full hover:bg-zinc-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

