"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ROF from "@/public/ROFpowerRack.avif"
import barbell from "@/public/barbell.avif"
import keiser from "@/public/keiser.jpg"
import bike from "@/public/concept2-BikeErg-Durable.webp"
import sauna from "@/public/Sauna.jpg"
import cryo from "@/public/cryo.jpg"
import hypervolt from "@/public/hypervolt.jpg"
import normatec from "@/public/Normatec-scaled.jpg"

export default function RecoveryEquipment() {
  const [activeTab, setActiveTab] = useState("equipment")

  const equipment = [
    {
      title: "Rogue Fitness Power Racks",
      description: "Custom-built power racks for optimal strength training with integrated safety features.",
      image: ROF,
    },
    {
      title: "Eleiko Competition Barbells",
      description: "Premium Olympic weightlifting equipment used by world champions.",
      image: barbell,
    },
    {
      title: "Keiser Functional Trainers",
      description: "Pneumatic resistance technology for smooth, variable resistance training.",
      image: keiser,
    },
    {
      title: "Assault Air Bikes & Concept2 Rowers",
      description: "High-performance cardio equipment for efficient metabolic conditioning.",
      image: bike,
    },
  ]

  const recovery = [
    {
      title: "Infrared Sauna",
      description: "Deep tissue heat therapy for enhanced recovery and detoxification.",
      image: sauna,
    },
    {
      title: "Cryotherapy Chamber",
      description: "Whole-body cold therapy to reduce inflammation and accelerate recovery.",
      image: cryo,
    },
    {
      title: "Hypervolt Percussion Therapy",
      description: "Targeted massage therapy to release muscle tension and improve circulation.",
      image: hypervolt,
    },
    {
      title: "NormaTec Compression System",
      description: "Dynamic compression technology to enhance circulation and speed recovery.",
      image: normatec,
    },
  ]

  const items = activeTab === "equipment" ? equipment : recovery

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  return (
    <section className="bg-zinc-900 py-20">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto">Premium Experience</h2>
        <p className="text-center max-w-3xl mx-auto mb-10 text-zinc-300">
          Our facilities feature the finest equipment and recovery modalities available in the fitness industry.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-zinc-800 rounded-md overflow-hidden">
            <button
              className={`px-6 py-3 ${activeTab === "equipment" ? "gold-bg" : "bg-transparent"}`}
              onClick={() => setActiveTab("equipment")}
            >
              Equipment
            </button>
            <button
              className={`px-6 py-3 ${activeTab === "recovery" ? "gold-bg" : "bg-transparent"}`}
              onClick={() => setActiveTab("recovery")}
            >
              Recovery
            </button>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="relative">
              <Image
                src={items[currentIndex].image || "/placeholder.svg"}
                alt={items[currentIndex].title}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold mb-2">{items[currentIndex].title}</h3>
                <p className="text-zinc-300">{items[currentIndex].description}</p>
              </div>
            </div>
          </div>

          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-4 gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "gold-bg" : "bg-zinc-700"}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={index} className="group overflow-hidden rounded-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-4 left-0 right-0 px-6">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-6">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <div className="transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-zinc-300 mt-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

