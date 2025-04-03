"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Mail, Twitter, Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [showHeader, setShowHeader] = useState(true)

  useEffect(() => {
    setShowHeader(!(pathname.startsWith("/admin") || pathname === "/login"))
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!showHeader) {
    return null
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 py-2" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider">
            <span className="block text-center">AESTHETIC</span>
            <span className="block text-center">LAB</span>
          </h1>
        </Link>

        {/* Mobile menu button */}
        <button className="lg:hidden z-10" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/about" className="hover:text-gold transition-colors">
            About
          </Link>
          <Link href="/trainers" className="hover:text-gold transition-colors">
            Our Trainers
          </Link>
          <Link href="/services" className="hover:text-gold transition-colors">
            Services
          </Link>
          <Link href="/locations" className="hover:text-gold transition-colors">
            Locations
          </Link>
          <Link href="/knowledge-hub" className="hover:text-gold transition-colors">
            Knowledge Hub
          </Link>
          <Link href="/contact" className="hover:text-gold transition-colors">
            Contact
          </Link>
        </nav>

        {/* Book Button */}
        <div className="hidden lg:block">
          <Link href="/booking" className="btn-primary">
            Book Now
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black flex flex-col justify-center items-center lg:hidden">
            <nav className="flex flex-col items-center gap-6 text-xl">
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/trainers" onClick={() => setIsMenuOpen(false)}>
                Our Trainers
              </Link>
              <Link href="/services" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link href="/locations" onClick={() => setIsMenuOpen(false)}>
                Locations
              </Link>
              <Link href="/knowledge-hub" onClick={() => setIsMenuOpen(false)}>
                Knowledge Hub
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/booking" onClick={() => setIsMenuOpen(false)} className="btn-primary mt-4">
                Book Now
              </Link>

              <div className="flex items-center gap-6 mt-8">
                <Link
                  href="https://instagram.com/aestheticlab.nyc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram size={28} />
                </Link>
                <Link href="mailto:info@aestheticlab.nyc" aria-label="Email">
                  <Mail size={28} />
                </Link>
                <Link
                  href="https://twitter.com/aestheticlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter size={28} />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
