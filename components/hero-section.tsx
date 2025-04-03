//done
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import hero from "@/public/heroBackground.avif"

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src={hero}
          alt="Luxury fitness equipment at Aesthetic Lab"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-20 text-center max-w-4xl px-4 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">ELEVATE YOUR POTENTIAL</h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Manhattan's premier luxury fitness experience, where science meets strength for transformative results.
        </p>
        <Link
  href="/assessment"
  className="btn-primary text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-3 whitespace-nowrap"
>
  Schedule Complimentary Assessment
</Link>

      </div>
    </section>
  )
}

