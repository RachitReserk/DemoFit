"use client"

import type React from "react"

import { useState } from "react"
import { Edit, FileText, Plus, Trash, X } from "lucide-react"

// Mock categories data
const mockCategories = [
  {
    id: "1",
    name: "Strength Training",
    slug: "strength-training",
    description: "Articles about strength training techniques and programs",
    articleCount: 8,
  },
  {
    id: "2",
    name: "Nutrition",
    slug: "nutrition",
    description: "Nutrition advice, meal plans, and dietary information",
    articleCount: 6,
  },
  {
    id: "3",
    name: "Recovery",
    slug: "recovery",
    description: "Recovery techniques, rest, and injury prevention",
    articleCount: 5,
  },
  {
    id: "4",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Fitness lifestyle, motivation, and wellness tips",
    articleCount: 3,
  },
  {
    id: "5",
    name: "Equipment",
    slug: "equipment",
    description: "Guides about gym equipment and home workout tools",
    articleCount: 2,
  },
]

export default function CategoriesManagementClient() {
  const [categories, setCategories] = useState(mockCategories)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }

  // Handle input change for new category
  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCategory((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug when name changes
    if (name === "name") {
      setNewCategory((prev) => ({ ...prev, slug: generateSlug(value) }))
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle input change for editing category
  const handleEditCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSelectedCategory((prev: any) => ({ ...prev, [name]: value }))

    // Auto-generate slug when name changes
    if (name === "name") {
      setSelectedCategory((prev: any) => ({ ...prev, slug: generateSlug(value) }))
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Add new category
  const addCategory = () => {
    // Validate form
    const newErrors: Record<string, string> = {}

    if (!newCategory.name.trim()) {
      newErrors.name = "Category name is required"
    }

    if (!newCategory.slug.trim()) {
      newErrors.slug = "Slug is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Add new category
    const newCategoryObj = {
      id: (categories.length + 1).toString(),
      name: newCategory.name,
      slug: newCategory.slug,
      description: newCategory.description,
      articleCount: 0,
    }

    setCategories([...categories, newCategoryObj])
    setIsAddModalOpen(false)
    setNewCategory({
      name: "",
      slug: "",
      description: "",
    })
    setErrors({})
  }

  // Edit category
  const editCategory = () => {
    if (!selectedCategory) return

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!selectedCategory.name.trim()) {
      newErrors.name = "Category name is required"
    }

    if (!selectedCategory.slug.trim()) {
      newErrors.slug = "Slug is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Update category
    const updatedCategories = categories.map((category) =>
      category.id === selectedCategory.id ? selectedCategory : category,
    )

    setCategories(updatedCategories)
    setIsEditModalOpen(false)
    setSelectedCategory(null)
    setErrors({})
  }

  // Delete category
  const deleteCategory = () => {
    if (!selectedCategory) return

    // Remove category
    const updatedCategories = categories.filter((category) => category.id !== selectedCategory.id)
    setCategories(updatedCategories)
    setIsDeleteModalOpen(false)
    setSelectedCategory(null)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-zinc-400 mt-1">Manage Knowledge Hub categories</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-zinc-900 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-zinc-500 text-sm">/{category.slug}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory(category)
                    setIsEditModalOpen(true)
                  }}
                  className="p-1 hover:text-[hsl(var(--gold))] transition-colors"
                  aria-label={`Edit ${category.name}`}
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(category)
                    setIsDeleteModalOpen(true)
                  }}
                  className="p-1 hover:text-red-500 transition-colors"
                  aria-label={`Delete ${category.name}`}
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>

            <p className="text-zinc-400 mb-4 line-clamp-2">{category.description}</p>

            <div className="flex items-center text-zinc-500">
              <FileText size={16} className="mr-2" />
              <span>{category.articleCount} articles</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Add New Category</h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setErrors({})
                }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleNewCategoryChange}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.name ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={newCategory.slug}
                    onChange={handleNewCategoryChange}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.slug ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                  <p className="mt-1 text-xs text-zinc-500">
                    Used in URLs, e.g., /knowledge-hub/{newCategory.slug || "example-slug"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newCategory.description}
                    onChange={handleNewCategoryChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false)
                    setErrors({})
                  }}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addCategory}
                  className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Edit Category</h3>
              <button
                onClick={() => {
                  setIsEditModalOpen(false)
                  setErrors({})
                }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={selectedCategory.name}
                    onChange={handleEditCategoryChange}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.name ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={selectedCategory.slug}
                    onChange={handleEditCategoryChange}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.slug ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                  <p className="mt-1 text-xs text-zinc-500">
                    Used in URLs, e.g., /knowledge-hub/{selectedCategory.slug || "example-slug"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={selectedCategory.description}
                    onChange={handleEditCategoryChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Article Count</label>
                  <p className="px-3 py-2 bg-black border border-zinc-700 rounded-md">
                    {selectedCategory.articleCount} articles
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false)
                    setErrors({})
                  }}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editCategory}
                  className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {isDeleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Delete Category</h3>
              <p className="text-zinc-300 mb-6">
                Are you sure you want to delete the category{" "}
                <span className="font-semibold">{selectedCategory.name}</span>?
                {selectedCategory.articleCount > 0 && (
                  <span className="block mt-2 text-red-400">
                    Warning: This category contains {selectedCategory.articleCount} articles that will be left without a
                    category.
                  </span>
                )}
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteCategory}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

