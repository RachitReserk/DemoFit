import ContactHero from "@/components/contact/contact-hero"
import ContactInfo from "@/components/contact/contact-info"
import ContactForm from "@/components/contact/contact-form"
import ContactFAQ from "@/components/contact/contact-faq"
import ContactCTA from "@/components/contact/contact-cta"

export const metadata = {
  title: "Contact Us | Aesthetic Lab",
  description:
    "Get in touch with Aesthetic Lab. Contact our team for inquiries about memberships, training, or to schedule a complimentary assessment.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactFAQ />
      <ContactCTA />
    </main>
  )
}

