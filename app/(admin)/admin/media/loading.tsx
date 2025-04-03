import { Skeleton } from "@/components/ui/skeleton"

export default function MediaLibraryLoading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-8 w-64 bg-zinc-800" />
          <Skeleton className="h-4 w-48 mt-2 bg-zinc-800" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-48 bg-zinc-800 rounded-md" />
          <Skeleton className="h-10 w-32 bg-zinc-800 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-16 w-full mb-6 bg-zinc-800 rounded-lg" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="aspect-square bg-zinc-800 rounded-lg" />
          ))}
      </div>
    </div>
  )
}

