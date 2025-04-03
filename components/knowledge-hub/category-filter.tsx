"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "strength", name: "Strength" },
    { id: "nutrition", name: "Nutrition" },
    { id: "recovery", name: "Recovery" },
    { id: "lifestyle", name: "Lifestyle" },
  ]

  return (
    <section className="py-8 bg-zinc-900 border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.id === "all" ? "/knowledge-hub" : `/knowledge-hub?category=${category.id}`}
              className={`px-6 py-2 rounded-full transition-all ${
                currentCategory === category.id
                  ? "bg-[hsl(var(--gold))] text-black font-semibold"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

