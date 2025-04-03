//done
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import james from "@/public/ava1.avif"
import micheal from "@/public/ava2.avif"
import emma from "@/public//ava3.avif"

export default function TestimonialsSlider() {
  const testimonials = [
    {
      name: "James Wilson",
      role: "CEO, Tech Startup",
      quote:
        "Aesthetic Lab has completely transformed my approach to fitness. The personalized programming and attention to detail is unmatched in the industry.",
      image: james,
    },
    {
      name: "Emma Rodriguez",
      role: "Professional Athlete",
      quote:
        "The recovery protocols at Aesthetic Lab have been game-changing for my performance. I've seen dramatic improvements in my recovery time between training sessions.",
      image: emma,
    },
    {
      name: "Michael Chen",
      role: "Finance Executive",
      quote:
        "As someone with a demanding schedule, the efficiency and effectiveness of Aesthetic Lab's training methodology has been invaluable. Results without wasted time.",
      image: micheal,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)

  const nextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)

    setTimeout(() => {
      const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
      setDisplayIndex(newIndex)

      setTimeout(() => {
        setIsAnimating(false)
      }, 50)
    }, 500)
  }

  const prevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)

    setTimeout(() => {
      const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
      setDisplayIndex(newIndex)

      setTimeout(() => {
        setIsAnimating(false)
      }, 50)
    }, 500)
  }

  const goToSlide = (index:any) => {
    if (isAnimating || index === currentIndex) return

    setIsAnimating(true)

    setTimeout(() => {
      setCurrentIndex(index)
      setDisplayIndex(index)

      setTimeout(() => {
        setIsAnimating(false)
      }, 50)
    }, 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  return (
    <section className="bg-zinc-900 py-20">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto">Client Testimonials</h2>

        <div className="max-w-4xl mx-auto mt-16 relative">
          <div className="overflow-hidden">
            <div className={`transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              <div className="text-center px-4 md:px-12">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="gold-text" fill="hsl(var(--gold))" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl italic mb-8">"{testimonials[displayIndex].quote}"</p>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 gold-border">
                    <Image
                      src={testimonials[displayIndex].image || "/placeholder.svg"}
                      alt={testimonials[displayIndex].name}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{testimonials[displayIndex].name}</h3>
                  <p className="text-zinc-400">{testimonials[displayIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "gold-bg" : "bg-zinc-700"}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

