"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Plus, Search, Trash } from "lucide-react"
import { locations } from "@/data/locations"

export default function LocationsContentPage() {
  const [locationsList, setLocationsList] = useState(Object.entries(locations))
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(locationsList)

  // Apply search filter
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const filtered = locationsList.filter(
        ([key, location]) =>
          location.name.toLowerCase().includes(term) || location.address.toLowerCase().includes(term),
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(locationsList)
    }
  }, [locationsList, searchTerm])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Locations</h1>
          <p className="text-zinc-400 mt-1">Manage location content and information</p>
        </div>

        <Link
          href="/admin/content/locations/new"
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Location
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-zinc-900 p-4 rounded-lg mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map(([key, location]) => (
          <div key={key} className="bg-zinc-900 rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image
                src={location.gallery[0].url || "/placeholder.svg"}
                alt={location.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <h2 className="text-xl font-bold">{location.name}</h2>
              </div>
            </div>

            <div className="p-4">
              <p className="text-zinc-300 text-sm mb-4">{location.address}</p>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-zinc-500">{location.amenities.length} amenities</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/content/locations/${key}`}
                    className="p-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
                    aria-label={`Edit ${location.name}`}
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    className="p-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
                    aria-label={`Delete ${location.name}`}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

