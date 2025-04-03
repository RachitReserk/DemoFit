import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl mb-8">Page Not Found</h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}

