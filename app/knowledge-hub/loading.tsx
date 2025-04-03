export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[40vh] md:h-[50vh] flex items-center bg-zinc-900">
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <div className="h-12 w-64 bg-zinc-800 animate-pulse rounded-md mb-6"></div>
            <div className="w-20 h-1 bg-[hsl(var(--gold))] mb-8"></div>
            <div className="h-8 w-full max-w-2xl bg-zinc-800 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="py-8 bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-zinc-800 animate-pulse rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="h-10 w-64 bg-zinc-800 animate-pulse rounded-md mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="h-[400px] bg-zinc-800 animate-pulse rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 w-32 bg-zinc-800 animate-pulse rounded-md"></div>
              <div className="h-10 w-full bg-zinc-800 animate-pulse rounded-md"></div>
              <div className="h-24 w-full bg-zinc-800 animate-pulse rounded-md"></div>
              <div className="h-10 w-40 bg-zinc-800 animate-pulse rounded-md"></div>
            </div>
          </div>

          <div className="h-10 w-64 bg-zinc-800 animate-pulse rounded-md mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-[240px] bg-zinc-800 animate-pulse rounded-lg"></div>
                <div className="h-6 w-32 bg-zinc-800 animate-pulse rounded-md"></div>
                <div className="h-8 w-full bg-zinc-800 animate-pulse rounded-md"></div>
                <div className="h-16 w-full bg-zinc-800 animate-pulse rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

