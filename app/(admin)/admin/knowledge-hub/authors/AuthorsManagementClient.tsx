"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Edit, FileText, Plus, Trash, Upload, X } from "lucide-react"

// Mock authors data
const mockAuthors = [
  {
    id: "1",
    name: "Alex Morgan",
    slug: "alex-morgan",
    bio: "Certified personal trainer with 10+ years of experience in strength training and nutrition.",
    image: "/placeholder.svg?height=400&width=400",
    role: "Head Trainer",
    articleCount: 8,
  },
  {
    id: "2",
    name: "Sarah Chen",
    slug: "sarah-chen",
    bio: "Nutritionist specializing in performance nutrition for athletes and active individuals.",
    image: "/placeholder.svg?height=400&width=400",
    role: "Nutrition Specialist",
    articleCount: 6,
  },
  {
    id: "3",
    name: "Marcus Williams",
    slug: "marcus-williams",
    bio: "Recovery expert with a background in sports medicine and physical therapy.",
    image: "/placeholder.svg?height=400&width=400",
    role: "Recovery Specialist",
    articleCount: 5,
  },
  {
    id: "4",
    name: "Olivia Bennett",
    slug: "olivia-bennett",
    bio: "Fitness lifestyle coach focusing on sustainable fitness practices and wellness.",
    image: "/placeholder.svg?height=400&width=400",
    role: "Lifestyle Coach",
    articleCount: 3,
  },
]

export default function AuthorsManagementClient() {
  const [authors, setAuthors] = useState(mockAuthors)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null)
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    slug: "",
    bio: "",
    image: "/placeholder.svg?height=400&width=400",
    role: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }

  // Handle input change for new author
  const handleNewAuthorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAuthor((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug when name changes
    if (name === "name") {
      setNewAuthor((prev) => ({ ...prev, slug: generateSlug(value) }))
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

  // Handle input change for editing author
  const handleEditAuthorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSelectedAuthor((prev: any) => ({ ...prev, [name]: value }))

    // Auto-generate slug when name changes
    if (name === "name") {
      setSelectedAuthor((prev: any) => ({ ...prev, slug: generateSlug(value) }))
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

  // Add new author
  const addAuthor = () => {
    // Validate form
    const newErrors: Record<string, string> = {}

    if (!newAuthor.name.trim()) {
      newErrors.name = "Author name is required"
    }

    if (!newAuthor.slug.trim()) {
      newErrors.slug = "Slug is required"
    }

    if (!newAuthor.role.trim()) {
      newErrors.role = "Role is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Add new author
    const newAuthorObj = {
      id: (authors.length + 1).toString(),
      name: newAuthor.name,
      slug: newAuthor.slug,
      bio: newAuthor.bio,
      image: newAuthor.image,
      role: newAuthor.role,
      articleCount: 0,
    }

    setAuthors([...authors, newAuthorObj])
    setIsAddModalOpen(false)
    setNewAuthor({
      name: "",
      slug: "",
      bio: "",
      image: "/placeholder.svg?height=400&width=400",
      role: "",
    })
    setErrors({})
  }

  // Edit author
  const editAuthor = () => {
    if (!selectedAuthor) return

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!selectedAuthor.name.trim()) {
      newErrors.name = "Author name is required"
    }

    if (!selectedAuthor.slug.trim()) {
      newErrors.slug = "Slug is required"
    }

    if (!selectedAuthor.role.trim()) {
      newErrors.role = "Role is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Update author
    const updatedAuthors = authors.map((author) => (author.id === selectedAuthor.id ? selectedAuthor : author))

    setAuthors(updatedAuthors)
    setIsEditModalOpen(false)
    setSelectedAuthor(null)
    setErrors({})
  }

  // Delete author
  const deleteAuthor = () => {
    if (!selectedAuthor) return

    // Remove author
    const updatedAuthors = authors.filter((author) => author.id !== selectedAuthor.id)
    setAuthors(updatedAuthors)
    setIsDeleteModalOpen(false)
    setSelectedAuthor(null)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Authors</h1>
          <p className="text-zinc-400 mt-1">Manage Knowledge Hub authors</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Author
        </button>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div key={author.id} className="bg-zinc-900 rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image src={author.image || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <div>
                  <h2 className="text-xl font-bold">{author.name}</h2>
                  <p className="text-zinc-300">{author.role}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{author.bio}</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-zinc-500">
                  <FileText size={16} className="mr-2" />
                  <span>{author.articleCount} articles</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedAuthor(author)
                      setIsEditModalOpen(true)
                    }}
                    className="p-1 hover:text-[hsl(var(--gold))] transition-colors"
                    aria-label={`Edit ${author.name}`}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAuthor(author)
                      setIsDeleteModalOpen(true)
                    }}
                    className="p-1 hover:text-red-500 transition-colors"
                    aria-label={`Delete ${author.name}`}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Author Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Add New Author</h3>
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
                <div className="mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={newAuthor.image || "/placeholder.svg"}
                      alt="Author profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md hover:bg-zinc-700 transition-colors text-sm flex items-center">
                      <Upload size={14} className="mr-1" />
                      Upload Photo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newAuthor.name}
                    onChange={handleNewAuthorChange}
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
                    value={newAuthor.slug}
                    onChange={handleNewAuthorChange}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.slug ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                  <p className="mt-1 text-xs text-zinc-500">
                    Used in URLs, e.g., /authors/{newAuthor.slug || "example-slug"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={newAuthor.role}
                    onChange={handleNewAuthorChange}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.role ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                    placeholder="e.g., Fitness Trainer, Nutritionist"
                  />
                  {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={newAuthor.bio}
                    onChange={handleNewAuthorChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="Brief biography of the author..."
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
                  onClick={addAuthor}
                  className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors"
                >
                  Add Author
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Author Modal */}
      {isEditModalOpen && selectedAuthor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Edit Author</h3>
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
                <div className="mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={selectedAuthor.image || "/placeholder.svg"}
                      alt="Author profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md hover:bg-zinc-700 transition-colors text-sm flex items-center">
                      <Upload size={14} className="mr-1" />
                      Change Photo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={selectedAuthor.name}
                    onChange={handleEditAuthorChange}
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
                    value={selectedAuthor.slug}
                    onChange={handleEditAuthorChange}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.slug ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                  <p className="mt-1 text-xs text-zinc-500">
                    Used in URLs, e.g., /authors/{selectedAuthor.slug || "example-slug"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={selectedAuthor.role}
                    onChange={handleEditAuthorChange}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.role ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={selectedAuthor.bio}
                    onChange={handleEditAuthorChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Article Count</label>
                  <p className="px-3 py-2 bg-black border border-zinc-700 rounded-md">
                    {selectedAuthor.articleCount} articles
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
                  onClick={editAuthor}
                  className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Author Modal */}
      {isDeleteModalOpen && selectedAuthor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Delete Author</h3>
              <p className="text-zinc-300 mb-6">
                Are you sure you want to delete the author <span className="font-semibold">{selectedAuthor.name}</span>?
                {selectedAuthor.articleCount > 0 && (
                  <span className="block mt-2 text-red-400">
                    Warning: This author has {selectedAuthor.articleCount} articles that will be left without an author.
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
                  onClick={deleteAuthor}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Author
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

