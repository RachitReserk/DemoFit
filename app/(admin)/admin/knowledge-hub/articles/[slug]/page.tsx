"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Check, Clock, ImagePlus, Plus, Save, Trash, X } from "lucide-react"
import { articles } from "@/data/articles"
import { trainers } from "@/data/trainers"

export default function ArticleEditor({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { slug } = params

  // Get article data if editing existing article
  const articleData = slug !== "new" ? articles.find((a) => a.slug === slug) : null

  // State for form data
  const [formData, setFormData] = useState({
    title: articleData?.title || "",
    slug: articleData?.slug || "",
    excerpt: articleData?.excerpt || "",
    content: articleData?.content || [],
    category: articleData?.category || "strength",
    tags: articleData?.tags || [],
    image: articleData?.image || "/placeholder.svg?height=800&width=1200",
    author: articleData?.author?.name || trainers[0].name,
    date: articleData?.date || new Date().toISOString().split("T")[0],
    readTime: articleData?.readTime || 5,
  })

  // State for new tag
  const [newTag, setNewTag] = useState("")

  // State for new content section
  const [newSection, setNewSection] = useState({
    type: "paragraph",
    content: "",
  })

  // State for errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // State for success message
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Add tag
  const addTag = () => {
    if (!newTag.trim()) return
    if (formData.tags.includes(newTag.trim())) return

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag.trim()],
    }))

    setNewTag("")
  }

  // Remove tag
  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  // Add content section
  const addContentSection = () => {
    if (newSection.type === "paragraph" && !newSection.content.trim()) return

    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { ...newSection }],
    }))

    setNewSection({
      type: "paragraph",
      content: "",
    })
  }

  // Remove content section
  const removeContentSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required"
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required"
    }

    if (formData.content.length === 0) {
      newErrors.content = "At least one content section is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // In a real application, this would be an API call to save the data
    // For now, we'll just show a success message
    setSaveSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  // Generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    setFormData((prev) => ({ ...prev, slug }))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => router.push("/admin/knowledge-hub/articles")}
            className="mr-4 p-2 rounded-full hover:bg-zinc-800 transition-colors"
            aria-label="Back to articles"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">{slug === "new" ? "Create New Article" : `Edit Article`}</h1>
            <p className="text-zinc-400 mt-1">
              {slug === "new" ? "Create a new knowledge hub article" : "Update article content and metadata"}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save Article
        </button>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-900/30 border border-green-800 text-green-200 px-4 py-3 rounded-md mb-6 flex items-center">
          <Check size={20} className="mr-2" />
          Article saved successfully!
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-black border ${
                  errors.title ? "border-red-500" : "border-zinc-700"
                } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={`flex-grow px-3 py-2 bg-black border ${
                    errors.slug ? "border-red-500" : "border-zinc-700"
                  } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  disabled={slug !== "new"} // Only allow editing slug for new articles
                />
                {slug === "new" && (
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-3 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors"
                  >
                    Generate
                  </button>
                )}
              </div>
              {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
              {slug !== "new" && <p className="mt-1 text-xs text-zinc-500">Slug cannot be changed after creation</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 bg-black border ${
                  errors.excerpt ? "border-red-500" : "border-zinc-700"
                } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
              />
              {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                >
                  <option value="strength">Strength</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="recovery">Recovery</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <select
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                >
                  {trainers.map((trainer) => (
                    <option key={trainer.slug} value={trainer.name}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-medium mb-2">Read Time (minutes)</label>
                <div className="flex items-center">
                  <Clock size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="number"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    min={1}
                    max={60}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>
              </div>
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Publication Date</label>
              <div className="flex items-center">
                <Calendar size={18} className="text-zinc-500 mr-2" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Featured Image</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="relative h-48 rounded-md overflow-hidden mb-4">
                <Image src={formData.image || "/placeholder.svg"} alt="Featured image" fill className="object-cover" />
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors flex items-center"
              >
                <ImagePlus size={18} className="mr-2" />
                Change Image
              </button>
            </div>

            <div>
              <p className="text-zinc-400 mb-4">
                The featured image will be displayed at the top of the article and in article previews. For best
                results, use an image with a 16:9 aspect ratio and at least 1200x675 pixels.
              </p>
              <p className="text-zinc-400">Supported formats: JPG, PNG, WebP</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Tags</h2>

          {/* Add Tag */}
          <div className="flex mb-6">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a new tag..."
              className="flex-grow px-3 py-2 bg-black border border-zinc-700 rounded-l-md focus:outline-none focus:border-[hsl(var(--gold))]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
              }}
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-r-md hover:bg-[hsl(var(--gold-light))] transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Tags List */}
          <div className="flex flex-wrap gap-2">
            {formData.tags.length === 0 ? (
              <p className="text-zinc-500 text-sm">No tags added yet</p>
            ) : (
              formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center bg-zinc-800 px-3 py-1 rounded-full">
                  <span className="mr-2">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Content</h2>

          {errors.content && <p className="mb-4 text-sm text-red-500">{errors.content}</p>}

          {/* Content Sections List */}
          <div className="space-y-6 mb-8">
            {formData.content.length === 0 ? (
              <p className="text-zinc-500 text-sm">No content sections added yet</p>
            ) : (
              formData.content.map((section, index) => (
                <div key={index} className="bg-zinc-800 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <span className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs uppercase">
                        {section.type}
                      </span>
                      <span className="ml-2 text-zinc-400 text-sm">Section {index + 1}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeContentSection(index)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                  </div>

                  {section.type === "paragraph" && (
                    <div className="text-zinc-300 whitespace-pre-wrap">{section.content}</div>
                  )}

                  {section.type === "heading" && <div className="text-xl font-bold">{section.content}</div>}

                  {section.type === "list" && (
                    <ul className="list-disc pl-6 space-y-1">
                      {section.items.map((item: string, i: number) => (
                        <li key={i} className="text-zinc-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.type === "quote" && (
                    <blockquote className="border-l-4 border-[hsl(var(--gold))] pl-4 py-2 italic text-zinc-300">
                      {section.content}
                      {section.author && <footer className="text-sm text-zinc-400 mt-1">— {section.author}</footer>}
                    </blockquote>
                  )}

                  {section.type === "image" && (
                    <div>
                      <div className="relative h-48 rounded-md overflow-hidden mb-2">
                        <Image
                          src={section.url || "/placeholder.svg"}
                          alt={section.caption || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {section.caption && <p className="text-sm text-zinc-400 text-center">{section.caption}</p>}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Add Content Section */}
          <div className="bg-zinc-800 p-4 rounded-md">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Section Type</label>
              <select
                value={newSection.type}
                onChange={(e) => setNewSection({ ...newSection, type: e.target.value })}
                className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
              >
                <option value="paragraph">Paragraph</option>
                <option value="heading">Heading</option>
                <option value="list">List</option>
                <option value="quote">Quote</option>
                <option value="image">Image</option>
              </select>
            </div>

            {newSection.type === "paragraph" && (
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  value={newSection.content}
                  onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  placeholder="Enter paragraph text..."
                />
              </div>
            )}

            {newSection.type === "heading" && (
              <div>
                <label className="block text-sm font-medium mb-2">Heading Text</label>
                <input
                  type="text"
                  value={newSection.content}
                  onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  placeholder="Enter heading text..."
                />
              </div>
            )}

            {newSection.type === "list" && (
              <div>
                <label className="block text-sm font-medium mb-2">List Items (one per line)</label>
                <textarea
                  value={newSection.content}
                  onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  placeholder="Enter list items, one per line..."
                />
              </div>
            )}

            {newSection.type === "quote" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quote Text</label>
                  <textarea
                    value={newSection.content}
                    onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="Enter quote text..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author (optional)</label>
                  <input
                    type="text"
                    value={newSection.author || ""}
                    onChange={(e) => setNewSection({ ...newSection, author: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="Enter author name..."
                  />
                </div>
              </div>
            )}

            {newSection.type === "image" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="text"
                    value={newSection.url || ""}
                    onChange={(e) => setNewSection({ ...newSection, url: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="Enter image URL..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Caption (optional)</label>
                  <input
                    type="text"
                    value={newSection.caption || ""}
                    onChange={(e) => setNewSection({ ...newSection, caption: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="Enter image caption..."
                  />
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 transition-colors flex items-center"
                >
                  <ImagePlus size={18} className="mr-2" />
                  Upload Image
                </button>
              </div>
            )}

            <div className="mt-4">
              <button
                type="button"
                onClick={addContentSection}
                className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors"
              >
                Add Section
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button (Mobile) */}
        <div className="md:hidden">
          <button
            type="submit"
            className="w-full py-3 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center justify-center"
          >
            <Save size={18} className="mr-2" />
            Save Article
          </button>
        </div>
      </form>
    </div>
  )
}

