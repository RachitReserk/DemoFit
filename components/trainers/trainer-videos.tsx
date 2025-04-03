import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

export default function TrainerVideos({ trainer }: { trainer: any }) {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-title text-center mx-auto mb-16">Featured Videos</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {trainer.videos.map((video: any, index: number) => (
            <Link key={index} href={video.url} className="group relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full gold-bg flex items-center justify-center mb-4">
                  <Play size={24} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold">{video.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

