import { notFound } from "next/navigation"
import { articles } from "@/data/articles"
import ArticleHeader from "@/components/knowledge-hub/article-header"
import ArticleContent from "@/components/knowledge-hub/article-content"
import ArticleAuthor from "@/components/knowledge-hub/article-author"
import RelatedArticles from "@/components/knowledge-hub/related-articles"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) {
    return {
      title: "Article Not Found | Aesthetic Lab",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: `${article.title} | Aesthetic Lab Knowledge Hub`,
    description: article.excerpt,
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  // Find related articles in the same category
  const relatedArticles = articles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-black text-white">
      <ArticleHeader article={article} />
      <ArticleContent article={article} />
      <ArticleAuthor author={article.author} />
      <RelatedArticles articles={relatedArticles} />
    </main>
  )
}

