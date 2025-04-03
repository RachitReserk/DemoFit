"use client"

import type React from "react"

import { useState } from "react"
import { Check, Globe, Instagram, Mail, Phone, Save, Twitter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPageClient() {
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Aesthetic Lab",
    siteDescription:
      "Manhattan's premier luxury fitness experience, where science meets strength for transformative results.",
    contactEmail: "info@aestheticlab.nyc",
    contactPhone: "(212) 555-1234",
    address: {
      street: "123 Washington Square",
      city: "New York",
      state: "NY",
      zip: "10012",
      country: "USA",
    },
  })

  // Social Media Settings
  const [socialSettings, setSocialSettings] = useState({
    instagram: "https://instagram.com/aestheticlab.nyc",
    twitter: "https://twitter.com/aestheticlab",
    facebook: "https://facebook.com/aestheticlab",
    youtube: "",
    linkedin: "",
  })

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@aestheticlab.nyc",
    smtpPassword: "••••••••••••",
    fromEmail: "no-reply@aestheticlab.nyc",
    fromName: "Aesthetic Lab",
  })

  // Booking Settings
  const [bookingSettings, setBookingSettings] = useState({
    allowBooking: true,
    bookingLeadTime: 24, // hours
    bookingWindow: 30, // days
    sessionDuration: 60, // minutes
    cancellationPolicy:
      "We require 24 hours' notice for cancellations or rescheduling to avoid being charged for the session.",
  })

  // State for success message
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Handle general settings change
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested address fields
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]
      setGeneralSettings((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }))
    } else {
      setGeneralSettings((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle social settings change
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialSettings((prev) => ({ ...prev, [name]: value }))
  }

  // Handle email settings change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  // Handle booking settings change
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setBookingSettings((prev) => ({ ...prev, [name]: checked }))
    } else if (type === "number") {
      setBookingSettings((prev) => ({ ...prev, [name]: Number.parseInt(value) }))
    } else {
      setBookingSettings((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle form submission
  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, this would be an API call to save the settings
    // For now, we'll just show a success message
    setSaveSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-zinc-400 mt-1">Configure application settings</p>
        </div>

        <button
          onClick={saveSettings}
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save Settings
        </button>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-900/30 border border-green-800 text-green-200 px-4 py-3 rounded-md mb-6 flex items-center">
          <Check size={20} className="mr-2" />
          Settings saved successfully!
        </div>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-8">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Site Information</h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Site Description</label>
                <textarea
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <div className="flex items-center">
                  <Mail size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="email"
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <div className="flex items-center">
                  <Phone size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    name="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Address</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={generalSettings.address.street}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={generalSettings.address.city}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={generalSettings.address.state}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="address.zip"
                    value={generalSettings.address.zip}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    name="address.country"
                    value={generalSettings.address.country}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-8">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Social Media Accounts</h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <div className="flex items-center">
                  <Instagram size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    name="instagram"
                    value={socialSettings.instagram}
                    onChange={handleSocialChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="https://instagram.com/yourusername"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Twitter</label>
                <div className="flex items-center">
                  <Twitter size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    name="twitter"
                    value={socialSettings.twitter}
                    onChange={handleSocialChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Facebook</label>
                <div className="flex items-center">
                  <Globe size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    name="facebook"
                    value={socialSettings.facebook}
                    onChange={handleSocialChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">YouTube</label>
                <div className="flex items-center">
                  <Globe size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    name="youtube"
                    value={socialSettings.youtube}
                    onChange={handleSocialChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="https://youtube.com/c/yourchannel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <div className="flex items-center">
                  <Globe size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    name="linkedin"
                    value={socialSettings.linkedin}
                    onChange={handleSocialChange}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-8">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">SMTP Configuration</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">SMTP Server</label>
                <input
                  type="text"
                  name="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SMTP Port</label>
                <input
                  type="text"
                  name="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SMTP Username</label>
                <input
                  type="text"
                  name="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SMTP Password</label>
                <input
                  type="password"
                  name="smtpPassword"
                  value={emailSettings.smtpPassword}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Email Sender</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">From Email</label>
                <input
                  type="email"
                  name="fromEmail"
                  value={emailSettings.fromEmail}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">From Name</label>
                <input
                  type="text"
                  name="fromName"
                  value={emailSettings.fromName}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Test Email</h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Recipient Email</label>
                <input
                  type="email"
                  placeholder="Enter email address to send test email"
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>

              <div>
                <button
                  type="button"
                  className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors"
                >
                  Send Test Email
                </button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Booking Settings */}
        <TabsContent value="booking" className="space-y-8">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Booking Configuration</h2>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowBooking"
                  name="allowBooking"
                  checked={bookingSettings.allowBooking}
                  onChange={handleBookingChange}
                  className="w-4 h-4 bg-black border border-zinc-700 rounded focus:ring-[hsl(var(--gold))] focus:ring-offset-zinc-900"
                />
                <label htmlFor="allowBooking" className="ml-2 text-sm font-medium">
                  Enable online booking
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Booking Lead Time (hours)</label>
                <input
                  type="number"
                  name="bookingLeadTime"
                  value={bookingSettings.bookingLeadTime}
                  onChange={handleBookingChange}
                  min={1}
                  max={72}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Minimum time in advance that a booking can be made (e.g., 24 hours)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Booking Window (days)</label>
                <input
                  type="number"
                  name="bookingWindow"
                  value={bookingSettings.bookingWindow}
                  onChange={handleBookingChange}
                  min={1}
                  max={90}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
                <p className="mt-1 text-xs text-zinc-500">How far in advance bookings can be made (e.g., 30 days)</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Default Session Duration (minutes)</label>
                <select
                  name="sessionDuration"
                  value={bookingSettings.sessionDuration}
                  onChange={handleBookingChange}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cancellation Policy</label>
                <textarea
                  name="cancellationPolicy"
                  value={bookingSettings.cancellationPolicy}
                  onChange={handleBookingChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Mobile Save Button */}
      <div className="md:hidden mt-8">
        <button
          onClick={saveSettings}
          className="w-full py-3 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center justify-center"
        >
          <Save size={18} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  )
}

