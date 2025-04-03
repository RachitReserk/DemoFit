import { Skeleton } from "@/components/ui/skeleton"

export default function AuthorsLoading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-8 w-64 bg-zinc-800" />
          <Skeleton className="h-4 w-48 mt-2 bg-zinc-800" />
        </div>
        <Skeleton className="h-10 w-32 bg-zinc-800 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-40 bg-zinc-800 rounded-lg" />
          ))}
      </div>
    </div>
  )
}

