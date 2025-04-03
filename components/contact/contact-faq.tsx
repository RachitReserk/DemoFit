"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What should I expect during my complimentary assessment?",
      answer:
        "Your complimentary assessment is a comprehensive 60-minute session designed to evaluate your current fitness level, movement patterns, and goals. You'll meet with one of our expert coaches who will conduct a movement assessment, discuss your fitness history and objectives, and provide recommendations for a personalized training approach. This is also an opportunity for you to experience our facility and ask any questions you may have about our services.",
    },
    {
      question: "Do I need to bring anything for my first training session?",
      answer:
        "For your first training session, we recommend wearing comfortable athletic attire and appropriate training shoes. We provide towels, water, and all necessary equipment. If you have any specific gear preferences or requirements, feel free to bring them along. We also suggest bringing a post-workout snack if you're planning to train during a time that aligns with your regular meal schedule.",
    },
    {
      question: "How often should I train to see results?",
      answer:
        "The optimal training frequency depends on your specific goals, current fitness level, and recovery capacity. For most clients, we recommend 2-4 strength training sessions per week, complemented by appropriate recovery protocols. During your assessment, your coach will provide specific recommendations based on your individual circumstances and objectives. Consistency is key to achieving sustainable results.",
    },
    {
      question: "Do you offer nutrition coaching?",
      answer:
        "Yes, we offer comprehensive nutrition coaching services. Our approach to nutrition is evidence-based and personalized to your specific needs, preferences, and goals. We provide both one-on-one nutrition consultations and ongoing coaching to help you implement sustainable nutritional practices that complement your training program and accelerate your results.",
    },
    {
      question: "What's your cancellation policy?",
      answer:
        "We require 24 hours' notice for cancellations or rescheduling to avoid being charged for the session. We understand that emergencies happen, and we evaluate these situations on a case-by-case basis. You can cancel or reschedule sessions through our booking system or by contacting your trainer directly.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-zinc-800 rounded-md overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <ChevronDown
                    className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-zinc-300">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

