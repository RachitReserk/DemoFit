"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Mail, Twitter, MapPin, Clock, Phone } from "lucide-react"

export default function Footer() {
  const pathname = usePathname()
  const [showFooter, setShowFooter] = useState(true)
  const [instagramPosts, setInstagramPosts] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1603698819488-03c6e857d280?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Rml0bmVzcyUyMEluc3RhZ3JhbSUyMEd5bXxlbnwwfHwwfHx8MA%3D%3D",
      link: "https://instagram.com/aestheticlab.nyc",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1614367674345-f414b2be3e5b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEZpdG5lc3MlMjBJbnN0YWdyYW0lMjBHeW18ZW58MHx8MHx8fDA%3D",
      link: "https://instagram.com/aestheticlab.nyc",
    },
    {
      id: 3,
      image: "https://plus.unsplash.com/premium_photo-1726618574564-e82a9b91e04c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fEZpdG5lc3MlMjBJbnN0YWdyYW0lMjBHeW18ZW58MHx8MHx8fDA%3D",
      link: "https://instagram.com/aestheticlab.nyc",
    },
    {
      id: 4,
      image: "https://plus.unsplash.com/premium_photo-1726618574759-93d2555d9604?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fEZpdG5lc3MlMjBJbnN0YWdyYW0lMjBHeW18ZW58MHx8MHx8fDA%3D",
      link: "https://instagram.com/aestheticlab.nyc",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1737601845367-3f868bcc70e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fEZpdG5lc3MlMjBJbnN0YWdyYW0lMjBHeW18ZW58MHx8MHx8fDA%3D",
      link: "https://instagram.com/aestheticlab.nyc",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1598267416809-5c73f1b24404?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fEZpdG5lc3MlMjBJbnN0YWdyYW0lMjBHeW18ZW58MHx8MHx8fDA%3D",
      link: "https://instagram.com/aestheticlab.nyc",
    },
  ])

  useEffect(() => {
    setShowFooter(!(pathname.startsWith("/admin") || pathname === "/login"))
  }, [pathname])

  // Don't render footer on admin or login pages
  if (!showFooter) {
    return null
  }

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="block">AESTHETIC</span>
              <span className="block">LAB</span>
            </h3>
            <p className="text-zinc-400 mb-6">
              Manhattan's premier luxury fitness experience, where science meets strength for transformative results.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://instagram.com/aestheticlab.nyc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="hover:gold-text transition-colors" />
              </Link>
              <Link href="mailto:info@aestheticlab.nyc" aria-label="Email">
                <Mail className="hover:gold-text transition-colors" />
              </Link>
              <Link
                href="https://twitter.com/aestheticlab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="hover:gold-text transition-colors" />
              </Link>
            </div>
          </div>

          {/* Greenwich Village */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Greenwich Village</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="gold-text mt-1 flex-shrink-0" size={18} />
                <p className="text-zinc-400">123 Washington Square, New York, NY 10012</p>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="gold-text mt-1 flex-shrink-0" size={18} />
                <div className="text-zinc-400">
                  <p>Monday - Friday: 6am - 9pm</p>
                  <p>Saturday - Sunday: 8am - 6pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="gold-text mt-1 flex-shrink-0" size={18} />
                <p className="text-zinc-400">(212) 555-1234</p>
              </div>
            </div>
          </div>

          {/* TriBeCa */}
          <div>
            <h3 className="text-xl font-semibold mb-6">TriBeCa</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="gold-text mt-1 flex-shrink-0" size={18} />
                <p className="text-zinc-400">456 Hudson Street, New York, NY 10013</p>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="gold-text mt-1 flex-shrink-0" size={18} />
                <div className="text-zinc-400">
                  <p>Monday - Friday: 6am - 9pm</p>
                  <p>Saturday - Sunday: 8am - 6pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="gold-text mt-1 flex-shrink-0" size={18} />
                <p className="text-zinc-400">(212) 555-5678</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-zinc-400 hover:gold-text transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-zinc-400 hover:gold-text transition-colors">
                  Our Trainers
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-zinc-400 hover:gold-text transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-zinc-400 hover:gold-text transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:gold-text transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:gold-text transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Instagram Feed */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Instagram size={20} className="gold-text" />
            Follow Us on Instagram
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {instagramPosts.map((post) => (
              <Link
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram size={24} className="gold-text" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Aesthetic Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

