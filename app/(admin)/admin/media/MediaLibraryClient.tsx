"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronDown, Download, Filter, ImageIcon, Link2, Search, Trash, Upload, X } from "lucide-react"

// Mock media data
const mockMedia = [
  {
    id: "1",
    name: "trainer-1.jpg",
    type: "image",
    url: "/placeholder.svg?height=800&width=800",
    size: "245 KB",
    dimensions: "800 x 800",
    uploadedAt: "2023-05-10T14:30:00Z",
    tags: ["trainers", "staff"],
  },
  {
    id: "2",
    name: "equipment-1.jpg",
    type: "image",
    url: "/placeholder.svg?height=800&width=1200",
    size: "320 KB",
    dimensions: "1200 x 800",
    uploadedAt: "2023-05-09T11:15:00Z",
    tags: ["equipment", "gym"],
  },
  {
    id: "3",
    name: "location-greenwich.jpg",
    type: "image",
    url: "/placeholder.svg?height=800&width=1200",
    size: "410 KB",
    dimensions: "1200 x 800",
    uploadedAt: "2023-05-08T09:45:00Z",
    tags: ["locations", "facilities"],
  },
  {
    id: "4",
    name: "workout-1.jpg",
    type: "image",
    url: "/placeholder.svg?height=800&width=1200",
    size: "380 KB",
    dimensions: "1200 x 800",
    uploadedAt: "2023-05-07T16:20:00Z",
    tags: ["workouts", "training"],
  },
  {
    id: "5",
    name: "nutrition-plan.pdf",
    type: "document",
    url: "#",
    size: "1.2 MB",
    dimensions: "",
    uploadedAt: "2023-05-06T13:10:00Z",
    tags: ["nutrition", "documents"],
  },
  {
    id: "6",
    name: "promo-video.mp4",
    type: "video",
    url: "#",
    size: "24.5 MB",
    dimensions: "1920 x 1080",
    uploadedAt: "2023-05-05T10:30:00Z",
    tags: ["videos", "marketing"],
  },
  {
    id: "7",
    name: "logo-dark.png",
    type: "image",
    url: "/placeholder.svg?height=500&width=500",
    size: "45 KB",
    dimensions: "500 x 500",
    uploadedAt: "2023-05-04T09:15:00Z",
    tags: ["branding", "logos"],
  },
  {
    id: "8",
    name: "logo-light.png",
    type: "image",
    url: "/placeholder.svg?height=500&width=500",
    size: "48 KB",
    dimensions: "500 x 500",
    uploadedAt: "2023-05-04T09:10:00Z",
    tags: ["branding", "logos"],
  },
  {
    id: "9",
    name: "trainer-2.jpg",
    type: "image",
    url: "/placeholder.svg?height=800&width=800",
    size: "260 KB",
    dimensions: "800 x 800",
    uploadedAt: "2023-05-03T15:45:00Z",
    tags: ["trainers", "staff"],
  },
  {
    id: "10",
    name: "equipment-2.jpg",
    type: "image",
    url: "/placeholder.svg?height=800&width=1200",
    size: "340 KB",
    dimensions: "1200 x 800",
    uploadedAt: "2023-05-02T14:20:00Z",
    tags: ["equipment", "gym"],
  },
  {
    id: "11",
    name: "location-tribeca.jpg",
    type: "image",
    url: "/placeholder.svg?height=800&width=1200",
    size: "430 KB",
    dimensions: "1200 x 800",
    uploadedAt: "2023-05-01T11:30:00Z",
    tags: ["locations", "facilities"],
  },
  {
    id: "12",
    name: "workout-2.jpg",
    type: "image",
    url: "/placeholder.svg?height=800&width=1200",
    size: "395 KB",
    dimensions: "1200 x 800",
    uploadedAt: "2023-04-30T10:15:00Z",
    tags: ["workouts", "training"],
  },
]

// Available tags for filtering
const availableTags = [
  "trainers",
  "staff",
  "equipment",
  "gym",
  "locations",
  "facilities",
  "workouts",
  "training",
  "nutrition",
  "documents",
  "videos",
  "marketing",
  "branding",
  "logos",
]

export default function MediaLibraryClient() {
  const [media, setMedia] = useState(mockMedia)
  const [filteredMedia, setFilteredMedia] = useState(mockMedia)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: "",
    tags: [] as string[],
  })
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Apply filters and search
  useEffect(() => {
    let result = media

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (item) => item.name.toLowerCase().includes(term) || item.tags.some((tag) => tag.toLowerCase().includes(term)),
      )
    }

    // Apply type filter
    if (filters.type) {
      result = result.filter((item) => item.type === filters.type)
    }

    // Apply tag filters
    if (filters.tags.length > 0) {
      result = result.filter((item) => filters.tags.some((tag) => item.tags.includes(tag)))
    }

    setFilteredMedia(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [media, searchTerm, filters])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real application, this would upload the files to a server
    // For now, we'll just add them to our local state
    const newMedia = Array.from(files).map((file, index) => {
      const id = (media.length + index + 1).toString()
      const isImage = file.type.startsWith("image/")
      const isVideo = file.type.startsWith("video/")
      const isDocument = !isImage && !isVideo

      return {
        id,
        name: file.name,
        type: isImage ? "image" : isVideo ? "video" : "document",
        url: isImage ? URL.createObjectURL(file) : "#",
        size: `${Math.round(file.size / 1024)} KB`,
        dimensions: isImage || isVideo ? "Dimensions not available" : "",
        uploadedAt: new Date().toISOString(),
        tags: [],
      }
    })

    setMedia([...newMedia, ...media])
    setIsUploadModalOpen(false)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle media selection
  const handleMediaSelect = (item: any) => {
    setSelectedMedia(item)
    setIsDetailsModalOpen(true)
  }

  // Handle media deletion
  const handleDeleteMedia = () => {
    if (!selectedMedia) return

    const updatedMedia = media.filter((item) => item.id !== selectedMedia.id)
    setMedia(updatedMedia)
    setIsDeleteModalOpen(false)
    setIsDetailsModalOpen(false)
    setSelectedMedia(null)
  }

  // Toggle tag in filters
  const toggleTagFilter = (tag: string) => {
    setFilters((prev) => {
      const tags = prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag]

      return { ...prev, tags }
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: "",
      tags: [],
    })
    setSearchTerm("")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-zinc-400 mt-1">Manage your media assets</p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Upload size={18} className="mr-2" />
          Upload Media
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-zinc-900 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or tag"
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

            <div className="flex border border-zinc-700 rounded-md overflow-hidden">
              <button
                className={`px-3 py-2 ${viewMode === "grid" ? "bg-zinc-800" : "bg-black"}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                className={`px-3 py-2 ${viewMode === "list" ? "bg-zinc-800" : "bg-black"}`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <div className="flex flex-col gap-1">
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <div id="filterPanel" className="hidden mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Media Type</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters({ ...filters, type: "" })}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === "" ? "bg-[hsl(var(--gold))] text-black" : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: "image" })}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === "image" ? "bg-[hsl(var(--gold))] text-black" : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: "video" })}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === "video" ? "bg-[hsl(var(--gold))] text-black" : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: "document" })}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === "document" ? "bg-[hsl(var(--gold))] text-black" : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                Documents
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTagFilter(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.tags.includes(tag) ? "bg-[hsl(var(--gold))] text-black" : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid/List View */}
      {filteredMedia.length === 0 ? (
        <div className="bg-zinc-900 rounded-lg p-8 text-center">
          <ImageIcon size={48} className="mx-auto text-zinc-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No media found</h3>
          <p className="text-zinc-400 mb-6">No media items match your search criteria.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-lg overflow-hidden cursor-pointer hover:bg-zinc-800 transition-colors"
              onClick={() => handleMediaSelect(item)}
            >
              {item.type === "image" ? (
                <div className="relative aspect-square">
                  <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
              ) : item.type === "video" ? (
                <div className="relative aspect-square bg-zinc-800 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                    <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-square bg-zinc-800 flex items-center justify-center">
                  <FileIcon type={item.name.split(".").pop() || ""} />
                </div>
              )}
              <div className="p-3">
                <h3 className="font-medium truncate">{item.name}</h3>
                <p className="text-xs text-zinc-400">{item.size}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <thead className="bg-black">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Size</th>
                <th className="px-4 py-3 text-left">Dimensions</th>
                <th className="px-4 py-3 text-left">Uploaded</th>
                <th className="px-4 py-3 text-left">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800 cursor-pointer" onClick={() => handleMediaSelect(item)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {item.type === "image" ? (
                        <div className="w-10 h-10 rounded overflow-hidden mr-3">
                          <Image
                            src={item.url || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center mr-3">
                          <FileIcon type={item.name.split(".").pop() || ""} size="sm" />
                        </div>
                      )}
                      <span className="truncate max-w-[200px]">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{item.type}</td>
                  <td className="px-4 py-3">{item.size}</td>
                  <td className="px-4 py-3">{item.dimensions || "-"}</td>
                  <td className="px-4 py-3 text-zinc-400">{formatDate(item.uploadedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-zinc-800 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {filteredMedia.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-zinc-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMedia.length)} of{" "}
            {filteredMedia.length} items
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

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Upload Media</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center mb-6">
                <Upload size={36} className="mx-auto text-zinc-500 mb-4" />
                <h4 className="text-lg font-medium mb-2">Drag and drop files here</h4>
                <p className="text-zinc-400 mb-4">or click to browse your files</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors inline-block cursor-pointer"
                >
                  Select Files
                </label>
              </div>

              <div className="text-sm text-zinc-400">
                <p>Supported file types: JPG, PNG, GIF, SVG, MP4, PDF, DOCX</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Details Modal */}
      {isDetailsModalOpen && selectedMedia && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold truncate">{selectedMedia.name}</h3>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  {selectedMedia.type === "image" ? (
                    <div className="relative aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                      <Image
                        src={selectedMedia.url || "/placeholder.svg"}
                        alt={selectedMedia.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : selectedMedia.type === "video" ? (
                    <div className="relative aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center">
                        <div className="w-0 h-0 border-y-10 border-y-transparent border-l-16 border-l-white ml-2"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                      <FileIcon type={selectedMedia.name.split(".").pop() || ""} size="lg" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">File Information</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">File Name</label>
                      <div className="flex">
                        <input
                          type="text"
                          value={selectedMedia.name}
                          readOnly
                          className="flex-grow px-3 py-2 bg-black border border-zinc-700 rounded-l-md focus:outline-none"
                        />
                        <button className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-r-md hover:bg-zinc-700 transition-colors">
                          Rename
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <p className="px-3 py-2 bg-black border border-zinc-700 rounded-md capitalize">
                          {selectedMedia.type}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Size</label>
                        <p className="px-3 py-2 bg-black border border-zinc-700 rounded-md">{selectedMedia.size}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Dimensions</label>
                      <p className="px-3 py-2 bg-black border border-zinc-700 rounded-md">
                        {selectedMedia.dimensions || "N/A"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Uploaded</label>
                      <p className="px-3 py-2 bg-black border border-zinc-700 rounded-md">
                        {formatDate(selectedMedia.uploadedAt)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Tags</label>
                      <div className="flex flex-wrap gap-2 p-3 bg-black border border-zinc-700 rounded-md min-h-[42px]">
                        {selectedMedia.tags.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-zinc-800 rounded-full text-xs flex items-center">
                            {tag}
                            <button className="ml-1 text-zinc-400 hover:text-white">
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        <button className="px-2 py-1 bg-zinc-800 rounded-full text-xs hover:bg-zinc-700 transition-colors">
                          + Add Tag
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">File URL</label>
                      <div className="flex">
                        <input
                          type="text"
                          value={selectedMedia.url}
                          readOnly
                          className="flex-grow px-3 py-2 bg-black border border-zinc-700 rounded-l-md focus:outline-none"
                        />
                        <button className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-r-md hover:bg-zinc-700 transition-colors">
                          <Link2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="px-4 py-2 bg-red-900/50 text-red-200 rounded-md hover:bg-red-900 transition-colors"
                    >
                      <Trash size={18} className="mr-2 inline-block" />
                      Delete
                    </button>
                    <button className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors">
                      <Download size={18} className="mr-2 inline-block" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedMedia && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Delete Media</h3>
              <p className="text-zinc-300 mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedMedia.name}</span>? This action
                cannot be undone.
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMedia}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// File Icon Component
function FileIcon({ type, size = "md" }: { type: string; size?: "sm" | "md" | "lg" }) {
  const getIconColor = () => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "text-red-400"
      case "doc":
      case "docx":
        return "text-blue-400"
      case "xls":
      case "xlsx":
        return "text-green-400"
      case "ppt":
      case "pptx":
        return "text-amber-400"
      default:
        return "text-zinc-400"
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-6 h-6 text-xs"
      case "lg":
        return "w-24 h-24 text-xl"
      default:
        return "w-12 h-12 text-sm"
    }
  }

  return (
    <div
      className={`${getSizeClass()} ${getIconColor()} flex items-center justify-center border-2 border-current rounded`}
    >
      <span className="uppercase font-bold">{type}</span>
    </div>
  )
}

