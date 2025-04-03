"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { trainers } from "@/data/trainers"

export default function TrainersGrid() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.slug} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TrainerCard({ trainer }: { trainer: any }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/trainers/${trainer.slug}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-4">
        <Image
          src={trainer.image || "/placeholder.svg"}
          alt={trainer.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-black/70 flex flex-col justify-end p-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-white mb-4">{trainer.shortBio}</p>
          <span className="text-sm gold-text uppercase tracking-wider">View Profile</span>
        </div>
      </div>
      <h2 className="text-xl font-bold">{trainer.name}</h2>
      <p className="gold-text">{trainer.title}</p>
    </Link>
  )
}

