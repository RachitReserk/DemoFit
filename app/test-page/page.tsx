export const metadata = {
  title: "Test Page | Aesthetic Lab",
  description: "A test page to verify footer rendering",
}

export default function TestPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Test Page</h1>
        <p className="mb-4">
          This is a test page to verify that the footer is consistently displayed across all pages of the Aesthetic Lab
          website.
        </p>
        <p>The footer should appear below this content, maintaining the same design as on other pages.</p>
      </div>
    </main>
  )
}

