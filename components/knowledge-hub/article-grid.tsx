"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { articles } from "@/data/articles"
import { Calendar, Clock } from "lucide-react"

export default function ArticleGrid() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get("category") || "all"

  const filteredArticles =
    categoryFilter === "all" ? articles : articles.filter((article) => article.category === categoryFilter)

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {filteredArticles.length > 0 ? (
          <>
            {/* Featured Article */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-12 relative">
                Featured Article
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-[hsl(var(--gold))] -mb-4"></span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={filteredArticles[0].image || "/placeholder.svg"}
                    alt={filteredArticles[0].title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-zinc-800 text-sm rounded-full">
                      {filteredArticles[0].category.charAt(0).toUpperCase() + filteredArticles[0].category.slice(1)}
                    </span>
                    <span className="text-zinc-400 text-sm flex items-center gap-1">
                      <Calendar size={14} />
                      {filteredArticles[0].date}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-4">{filteredArticles[0].title}</h3>
                  <p className="text-zinc-300 mb-6">{filteredArticles[0].excerpt}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                      <Image
                        src={filteredArticles[0].author.image || "/placeholder.svg"}
                        alt={filteredArticles[0].author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{filteredArticles[0].author.name}</p>
                      <p className="text-sm text-zinc-400">{filteredArticles[0].author.title}</p>
                    </div>
                  </div>

                  <Link
                    href={`/knowledge-hub/${filteredArticles[0].slug}`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>

            {/* Article Grid */}
            <div>
              <h2 className="text-3xl font-bold mb-12 relative">
                Latest Articles
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-[hsl(var(--gold))] -mb-4"></span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.slice(1).map((article) => (
                  <Link key={article.slug} href={`/knowledge-hub/${article.slug}`} className="group">
                    <div className="relative h-[240px] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-zinc-800 text-xs rounded-full">
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </span>
                      <span className="text-zinc-400 text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                      <span className="text-zinc-400 text-xs flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime} min read
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-[hsl(var(--gold))] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-zinc-300 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative">
                        <Image
                          src={article.author.image || "/placeholder.svg"}
                          alt={article.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm">{article.author.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4">No articles found</h3>
            <p className="text-zinc-300 mb-8">
              There are currently no articles in this category. Please check back later or explore other categories.
            </p>
            <Link href="/knowledge-hub" className="btn-primary">
              View All Articles
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

