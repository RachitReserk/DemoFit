import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import { locations } from "@/data/locations"

export default function ContactInfo() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="gold-text mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <Link
                    href="mailto:info@aestheticlab.nyc"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    info@aestheticlab.nyc
                  </Link>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="gold-text mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <Link href="tel:+12125551234" className="text-zinc-300 hover:text-white transition-colors">
                    (212) 555-1234
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start gap-4">
                <Instagram className="gold-text mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Follow Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href="https://instagram.com/aestheticlab.nyc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white transition-colors"
                    >
                      Instagram
                    </Link>
                    <Link
                      href="https://twitter.com/aestheticlab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white transition-colors"
                    >
                      Twitter
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-zinc-800">
              <h2 className="text-3xl font-bold mb-8">Our Locations</h2>

              <div className="space-y-12">
                {Object.entries(locations).map(([key, location]) => (
                  <div key={key}>
                    <h3 className="text-xl font-semibold mb-4">{location.name}</h3>

                    <div className="space-y-4">
                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <MapPin className="gold-text mt-1 flex-shrink-0" size={18} />
                        <p className="text-zinc-300">{location.address}</p>
                      </div>

                      {/* Hours */}
                      <div className="flex items-start gap-4">
                        <Clock className="gold-text mt-1 flex-shrink-0" size={18} />
                        <div className="text-zinc-300">
                          <p>Monday - Friday: {location.hours.weekday}</p>
                          <p>Saturday - Sunday: {location.hours.weekend}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-4">
                        <Phone className="gold-text mt-1 flex-shrink-0" size={18} />
                        <Link
                          href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
                          className="text-zinc-300 hover:text-white transition-colors"
                        >
                          {location.phone}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Find Us</h2>

            <div className="bg-zinc-800 rounded-lg overflow-hidden h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6046.883695537689!2d-73.99800908459418!3d40.73083797932946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599787834ad9%3A0x4b402b92c7e63c!2sWashington%20Square%20Park!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Aesthetic Lab locations"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

