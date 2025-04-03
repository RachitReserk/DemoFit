"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import av1 from "@/public/ava1.avif"
import av2 from "@/public/ava2.avif"
import av3 from "@/public/ava3.avif"

export default function TrainerTestimonials({ trainer }: { trainer: any }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === trainer.testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? trainer.testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-title text-center mx-auto mb-16">Client Testimonials</h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center px-4 md:px-12">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="gold-text" fill="hsl(var(--gold))" />
              ))}
            </div>

            <p className="text-xl md:text-2xl italic mb-8">"{trainer.testimonials[currentIndex].text}"</p>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 gold-border">
                <Image
                  src={trainer.testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={trainer.testimonials[currentIndex].author}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <p className="font-semibold text-lg">{trainer.testimonials[currentIndex].author}</p>
            </div>
          </div>

          {trainer.testimonials.length > 1 && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>

              <div className="flex justify-center mt-8 gap-2">
                {trainer.testimonials.map((_: any, index: number) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentIndex ? "gold-bg" : "bg-zinc-700"}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

