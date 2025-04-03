"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function LocationGallery({
  images,
  locationName,
}: {
  images: any[]
  locationName: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const openViewer = (index: number) => {
    setViewerIndex(index)
    setViewerOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeViewer = () => {
    setViewerOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setViewerIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setViewerIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">{locationName} Studio</h2>

      {/* Main Gallery Image */}
      <div className="relative h-[50vh] md:h-[60vh] mb-4 overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          fill
          className="object-cover cursor-pointer"
          onClick={() => openViewer(currentIndex)}
        />

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            prevSlide()
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            nextSlide()
          }}
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-square overflow-hidden rounded-md cursor-pointer ${
              index === currentIndex ? "ring-2 ring-[hsl(var(--gold))]" : ""
            }`}
            onClick={() => {
              setCurrentIndex(index)
              openViewer(index)
            }}
          >
            <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Fullscreen Image Viewer */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 bg-black/50 p-2 rounded-full"
            onClick={closeViewer}
            aria-label="Close viewer"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={images[viewerIndex].url || "/placeholder.svg"}
              alt={images[viewerIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 text-center w-full">
            <p className="text-sm text-zinc-300">
              {images[viewerIndex].alt} ({viewerIndex + 1} of {images.length})
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

