"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Check, Clock, ImagePlus, Plus, Save, Trash, X } from "lucide-react"
import { locations } from "@/data/locations"
import { trainers } from "@/data/trainers"

export default function LocationEditor({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { slug } = params

  // Get location data
  const locationData = locations[slug as keyof typeof locations]

  // State for form data
  const [formData, setFormData] = useState({
    name: locationData?.name || "",
    slug: slug || "",
    address: locationData?.address || "",
    phone: locationData?.phone || "",
    mapUrl: locationData?.mapUrl || "",
    hours: {
      weekday: locationData?.hours.weekday || "",
      weekend: locationData?.hours.weekend || "",
    },
    amenities: locationData?.amenities || [],
    gallery: locationData?.gallery || [],
    trainers: locationData?.trainers || [],
  })

  // State for new amenity
  const [newAmenity, setNewAmenity] = useState("")

  // State for errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // State for success message
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Add amenity
  const addAmenity = () => {
    if (!newAmenity.trim()) return

    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, newAmenity.trim()],
    }))

    setNewAmenity("")
  }

  // Remove amenity
  const removeAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }))
  }

  // Toggle trainer
  const toggleTrainer = (trainer: any) => {
    const isSelected = formData.trainers.some((t: any) => t?.slug === trainer.slug)

    if (isSelected) {
      // Remove trainer
      setFormData((prev) => ({
        ...prev,
        trainers: prev.trainers.filter((t: any) => t?.slug !== trainer.slug),
      }))
    } else {
      // Add trainer
      setFormData((prev) => ({
        ...prev,
        trainers: [...prev.trainers, trainer],
      }))
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Location name is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.hours.weekday.trim()) {
      newErrors["hours.weekday"] = "Weekday hours are required"
    }

    if (!formData.hours.weekend.trim()) {
      newErrors["hours.weekend"] = "Weekend hours are required"
    }

    if (formData.gallery.length === 0) {
      newErrors.gallery = "At least one gallery image is required"
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

  // Handle image upload (mock)
  const handleImageUpload = () => {
    // In a real application, this would open a file picker and upload the image
    // For now, we'll just add a placeholder image
    const newImage = {
      url: "/placeholder.svg?height=800&width=1200",
      alt: `${formData.name} image ${formData.gallery.length + 1}`,
    }

    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newImage],
    }))
  }

  // Remove image
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => router.push("/admin/content/locations")}
            className="mr-4 p-2 rounded-full hover:bg-zinc-800 transition-colors"
            aria-label="Back to locations"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">{slug === "new" ? "Add New Location" : `Edit ${locationData?.name}`}</h1>
            <p className="text-zinc-400 mt-1">
              {slug === "new" ? "Create a new location" : "Update location information"}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-900/30 border border-green-800 text-green-200 px-4 py-3 rounded-md mb-6 flex items-center">
          <Check size={20} className="mr-2" />
          Location saved successfully!
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Location Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-black border ${
                  errors.name ? "border-red-500" : "border-zinc-700"
                } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                disabled={slug !== "new"} // Only allow editing slug for new locations
              />
              {slug !== "new" && <p className="mt-1 text-xs text-zinc-500">Slug cannot be changed after creation</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-black border ${
                  errors.address ? "border-red-500" : "border-zinc-700"
                } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-black border ${
                  errors.phone ? "border-red-500" : "border-zinc-700"
                } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            {/* Map URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Google Maps Embed URL</label>
              <input
                type="text"
                name="mapUrl"
                value={formData.mapUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
              />
              <p className="mt-1 text-xs text-zinc-500">Enter the embed URL from Google Maps (iframe src attribute)</p>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Hours of Operation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekday Hours */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Weekday Hours <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <Clock size={18} className="text-zinc-500 mr-2" />
                <input
                  type="text"
                  name="hours.weekday"
                  value={formData.hours.weekday}
                  onChange={handleChange}
                  placeholder="e.g., 6am - 9pm"
                  className={`w-full px-3 py-2 bg-black border ${
                    errors["hours.weekday"] ? "border-red-500" : "border-zinc-700"
                  } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                />
              </div>
              {errors["hours.weekday"] && <p className="mt-1 text-sm text-red-500">{errors["hours.weekday"]}</p>}
            </div>

            {/* Weekend Hours */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Weekend Hours <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <Clock size={18} className="text-zinc-500 mr-2" />
                <input
                  type="text"
                  name="hours.weekend"
                  value={formData.hours.weekend}
                  onChange={handleChange}
                  placeholder="e.g., 8am - 6pm"
                  className={`w-full px-3 py-2 bg-black border ${
                    errors["hours.weekend"] ? "border-red-500" : "border-zinc-700"
                  } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                />
              </div>
              {errors["hours.weekend"] && <p className="mt-1 text-sm text-red-500">{errors["hours.weekend"]}</p>}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Amenities</h2>

          {/* Add Amenity */}
          <div className="flex mb-6">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              placeholder="Add a new amenity..."
              className="flex-grow px-3 py-2 bg-black border border-zinc-700 rounded-l-md focus:outline-none focus:border-[hsl(var(--gold))]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addAmenity()
                }
              }}
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-r-md hover:bg-[hsl(var(--gold-light))] transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Amenities List */}
          <div className="space-y-2">
            {formData.amenities.length === 0 ? (
              <p className="text-zinc-500 text-sm">No amenities added yet</p>
            ) : (
              formData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded-md">
                  <span>{amenity}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Gallery</h2>

          {errors.gallery && <p className="mb-4 text-sm text-red-500">{errors.gallery}</p>}

          {/* Add Image Button */}
          <button
            type="button"
            onClick={handleImageUpload}
            className="mb-6 px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors flex items-center"
          >
            <ImagePlus size={18} className="mr-2" />
            Add Image
          </button>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {formData.gallery.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative h-40 rounded-md overflow-hidden">
                  <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-black/70 rounded-full text-white hover:bg-red-600 transition-colors"
                >
                  <Trash size={16} />
                </button>
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => {
                    const newGallery = [...formData.gallery]
                    newGallery[index].alt = e.target.value
                    setFormData((prev) => ({ ...prev, gallery: newGallery }))
                  }}
                  placeholder="Image alt text"
                  className="w-full mt-2 px-3 py-1 text-sm bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trainers */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Trainers</h2>

          <p className="text-zinc-400 mb-4">Select the trainers available at this location:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {trainers.map((trainer) => {
              const isSelected = formData.trainers.some((t: any) => t?.slug === trainer.slug)

              return (
                <div
                  key={trainer.slug}
                  className={`p-4 border rounded-md cursor-pointer transition-all ${
                    isSelected ? "border-[hsl(var(--gold))] bg-zinc-800" : "border-zinc-700 hover:border-zinc-500"
                  }`}
                  onClick={() => toggleTrainer(trainer)}
                >
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                      <Image
                        src={trainer.image || "/placeholder.svg"}
                        alt={trainer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{trainer.name}</h3>
                      <p className="text-sm text-zinc-400">{trainer.title}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Submit Button (Mobile) */}
        <div className="md:hidden">
          <button
            type="submit"
            className="w-full py-3 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center justify-center"
          >
            <Save size={18} className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

