"use client"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RecoveryTherapies() {
  const therapies = [
    {
      id: "cold-plunge",
      name: "Cold Plunge",
      description:
        "Our cold plunge therapy involves immersion in water maintained at 38-45°F, triggering a cascade of physiological responses that reduce inflammation, accelerate recovery, and enhance circulation. Regular cold exposure has been shown to improve immune function, increase metabolic rate, and promote mental resilience.",
      image:
        "https://plus.unsplash.com/premium_photo-1714259458087-75901658ad93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fENvbGQlMjBQbHVuZ2V8ZW58MHx8MHx8fDA%3D",
      benefits: [
        "Reduced muscle soreness and inflammation",
        "Accelerated recovery between training sessions",
        "Improved circulation and cardiovascular health",
        "Enhanced immune function and stress resilience",
      ],
    },
    {
      id: "sauna",
      name: "Infrared Sauna",
      description:
        "Our infrared sauna uses advanced technology to deliver radiant heat that penetrates deep into tissues, raising core temperature and inducing a therapeutic sweat. Unlike traditional saunas, infrared technology operates at lower ambient temperatures while providing more profound physiological effects, making it comfortable even for those who typically don't tolerate heat well.",
      image:
        "https://images.unsplash.com/photo-1657803778483-2b289d0f22c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U2F1bmElMjBneW18ZW58MHx8MHx8fDA%3D",
      benefits: [
        "Enhanced detoxification through deep sweating",
        "Reduced muscle tension and joint stiffness",
        "Improved skin health and appearance",
        "Stress reduction and improved sleep quality",
      ],
    },
    {
      id: "massage",
      name: "Recovery Massage",
      description:
        "Our specialized recovery massage protocols are designed specifically for active individuals, focusing on techniques that enhance circulation, reduce muscle tension, and accelerate the body's natural healing processes. Our therapists are trained in sports massage, deep tissue techniques, and myofascial release, allowing them to address your specific needs.",
      image:
        "https://plus.unsplash.com/premium_photo-1661901743106-cfc613fdf5bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UmVjb3ZlcnklMjBNYXNzYWdlfGVufDB8fDB8fHww",
      benefits: [
        "Targeted relief for specific problem areas",
        "Reduced muscle adhesions and scar tissue",
        "Improved range of motion and flexibility",
        "Enhanced recovery and reduced injury risk",
      ],
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-title text-center mx-auto mb-16">Recovery Therapies</h2>

        <Tabs defaultValue="cold-plunge" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-12">
            <TabsTrigger value="cold-plunge">Cold Plunge</TabsTrigger>
            <TabsTrigger value="sauna">Sauna</TabsTrigger>
            <TabsTrigger value="massage">Massage</TabsTrigger>
          </TabsList>

          {therapies.map((therapy) => (
            <TabsContent
              key={therapy.id}
              value={therapy.id}
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              {/* Therapy name visible on mobile only */}
              <h3 className="text-2xl font-bold mb-6 md:hidden">{therapy.name}</h3>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  {/* Therapy name visible on md screens and up */}
                  <h3 className="text-2xl font-bold mb-6 hidden md:block">{therapy.name}</h3>

                  <div className="mt-8 md:mt-0">
                    <p className="mb-6 text-zinc-300">{therapy.description}</p>

                    <h4 className="text-lg font-semibold mb-4">Benefits:</h4>
                    <ul className="space-y-2 mb-8">
                      {therapy.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[hsl(var(--gold))] text-xl leading-none">•</span>
                          <span className="text-zinc-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/recovery" className="btn-primary inline-block">
                      Book a Session
                    </Link>
                  </div>
                </div>

                <div className="relative h-[500px] rounded-lg overflow-hidden order-1 md:order-2">
                  <Image
                    src={therapy.image || "/placeholder.svg"}
                    alt={`${therapy.name} at Aesthetic Lab`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

