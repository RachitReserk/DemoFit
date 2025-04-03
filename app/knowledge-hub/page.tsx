import { Suspense } from "react"
import KnowledgeHubHero from "@/components/knowledge-hub/knowledge-hub-hero"
import ArticleGrid from "@/components/knowledge-hub/article-grid"
import CategoryFilter from "@/components/knowledge-hub/category-filter"
import NewsletterSignup from "@/components/knowledge-hub/newsletter-signup"

export const metadata = {
  title: "Knowledge Hub | Aesthetic Lab",
  description:
    "Expert insights on strength training, nutrition, recovery, and lifestyle optimization from Manhattan's premier luxury fitness studio.",
}

export default function KnowledgeHubPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <KnowledgeHubHero />
      <Suspense
        fallback={<div className="py-8 bg-zinc-900 border-b border-zinc-800 text-center">Loading categories...</div>}
      >
        <CategoryFilter />
      </Suspense>
      <Suspense fallback={<div className="py-20 bg-black text-center">Loading articles...</div>}>
        <ArticleGrid />
      </Suspense>
      <NewsletterSignup />
    </main>
  )
}

