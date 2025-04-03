"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Edit, Eye, Filter, Plus, Search, Trash } from "lucide-react"
import { articles } from "@/data/articles"

// Add status to articles if not present
const articlesWithDefaults = articles.map((article) => ({
  ...article,
  status: article.status || "published", // Default status if not present
}))

export default function ArticlesManagementClientPage() {
  const [allArticles, setAllArticles] = useState(articlesWithDefaults)
  const [filteredArticles, setFilteredArticles] = useState(articlesWithDefaults)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    author: "",
    status: "",
  })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Apply filters and search
  useEffect(() => {
    let result = allArticles

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          (article.author?.name && article.author.name.toLowerCase().includes(term)),
      )
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((article) => article.category === filters.category)
    }

    // Apply author filter
    if (filters.author) {
      result = result.filter((article) => article.author?.slug === filters.author)
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter((article) => article.status === filters.status)
    }

    setFilteredArticles(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [allArticles, searchTerm, filters])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Handle article deletion
  const handleDeleteArticle = () => {
    if (!selectedArticle) return

    // Remove article
    const updatedArticles = allArticles.filter((article) => article.slug !== selectedArticle.slug)
    setAllArticles(updatedArticles)
    setIsDeleteModalOpen(false)
    setSelectedArticle(null)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: "",
      author: "",
      status: "",
    })
    setSearchTerm("")
  }

  // Get unique categories with null check
  const categories = [...new Set(allArticles.map((article) => article.category).filter(Boolean))]

  // Get unique authors with null check
  const authors = [...new Set(allArticles.map((article) => article.author?.slug).filter(Boolean))]
    .map((authorSlug) => {
      const article = allArticles.find((a) => a.author?.slug === authorSlug)
      return article?.author || null
    })
    .filter(Boolean)

  // Safe capitalize function
  const capitalize = (str: string | undefined | null) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-zinc-400 mt-1">Manage Knowledge Hub articles</p>
        </div>

        <Link
          href="/admin/knowledge-hub/articles/new"
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Article
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-zinc-900 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            />
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-black border border-zinc-700 rounded-md flex items-center gap-2 hover:border-zinc-500 transition-colors"
              onClick={() => document.getElementById("filterPanel")?.classList.toggle("hidden")}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} />
            </button>

            <button
              className="px-4 py-2 bg-black border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div id="filterPanel" className="hidden mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {capitalize(category)}
                </option>
              ))}
            </select>
          </div>

          {/* Author Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <select
              value={filters.author}
              onChange={(e) => setFilters({ ...filters, author: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            >
              <option value="">All Authors</option>
              {authors.map((author: any) => (
                <option key={author.slug} value={author.slug}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            >
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-zinc-900 rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {currentItems.length > 0 ? (
                currentItems.map((article) => (
                  <tr key={article.slug} className="hover:bg-zinc-800">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded overflow-hidden mr-3">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{article.title}</div>
                          <div className="text-sm text-zinc-400 truncate max-w-[300px]">{article.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize">{article.category}</td>
                    <td className="px-4 py-3">{article.author?.name || "Unknown"}</td>
                    <td className="px-4 py-3">{formatDate(article.date)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          article.status === "published"
                            ? "bg-green-900/30 text-green-300"
                            : "bg-amber-900/30 text-amber-300"
                        }`}
                      >
                        {capitalize(article.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/knowledge-hub/${article.slug}`}
                          className="p-1 hover:text-[hsl(var(--gold))] transition-colors"
                          aria-label={`View ${article.title}`}
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/knowledge-hub/articles/${article.slug}`}
                          className="p-1 hover:text-[hsl(var(--gold))] transition-colors"
                          aria-label={`Edit ${article.title}`}
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedArticle(article)
                            setIsDeleteModalOpen(true)
                          }}
                          className="p-1 hover:text-red-500 transition-colors"
                          aria-label={`Delete ${article.title}`}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-zinc-400">
                    No articles found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredArticles.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-zinc-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredArticles.length)} of{" "}
            {filteredArticles.length} articles
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-zinc-800 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page ? "bg-[hsl(var(--gold))] text-black" : "bg-zinc-800"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-zinc-800 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedArticle && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Delete Article</h3>
              <p className="text-zinc-300 mb-6">
                Are you sure you want to delete the article{" "}
                <span className="font-semibold">{selectedArticle.title}</span>? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteArticle}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

