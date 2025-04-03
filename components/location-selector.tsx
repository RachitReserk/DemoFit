//done
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Phone } from "lucide-react"
import locationx from "@/public/location.jpg"
import washington from "@/public/456-washington.jpg"

export default function LocationSelector() {
  const [activeLocation, setActiveLocation] = useState("greenwich")

  const locations = {
    greenwich: {
      name: "Greenwich Village",
      address: "123 Washington Square, New York, NY 10012",
      hours: "Mon-Fri: 6am-9pm | Sat-Sun: 8am-6pm",
      phone: "(212) 555-1234",
      image: locationx,
    },
    tribeca: {
      name: "TriBeCa",
      address: "456 Hudson Street, New York, NY 10013",
      hours: "Mon-Fri: 6am-9pm | Sat-Sun: 8am-6pm",
      phone: "(212) 555-5678",
      image: washington,
    },
  }

  const location = locations[activeLocation as keyof typeof locations]

  return (
    <section className="bg-black py-20">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto">Our Locations</h2>
        <p className="text-center max-w-3xl mx-auto mb-10 text-zinc-300">
          Experience Aesthetic Lab at our two premium Manhattan locations.
        </p>

        {/* Location Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-zinc-800 rounded-md overflow-hidden">
            <button
              className={`px-6 py-3 ${activeLocation === "greenwich" ? "gold-bg" : "bg-transparent"}`}
              onClick={() => setActiveLocation("greenwich")}
            >
              Greenwich Village
            </button>
            <button
              className={`px-6 py-3 ${activeLocation === "tribeca" ? "gold-bg" : "bg-transparent"}`}
              onClick={() => setActiveLocation("tribeca")}
            >
              TriBeCa
            </button>
          </div>
        </div>

        {/* Location Details */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-80 md:h-full">
            <Image
              src={location.image || "/placeholder.svg"}
              alt={`Aesthetic Lab ${location.name} location`}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-semibold">{location.name}</h3>

            <div className="flex items-start gap-4">
              <MapPin className="gold-text mt-1 flex-shrink-0" />
              <p>{location.address}</p>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="gold-text mt-1 flex-shrink-0" />
              <p>{location.hours}</p>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="gold-text mt-1 flex-shrink-0" />
              <p>{location.phone}</p>
            </div>

            <div className="pt-4">
              <Link href="/contact" className="btn-primary">
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

