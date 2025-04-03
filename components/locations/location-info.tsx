import { Clock, Check } from "lucide-react"

export default function LocationInfo({ location }: { location: any }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Hours & Amenities</h3>

      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <Clock className="gold-text mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-2">Hours of Operation</h4>
            <p className="text-zinc-300">Monday - Friday: {location.hours.weekday}</p>
            <p className="text-zinc-300">Saturday - Sunday: {location.hours.weekend}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Amenities</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {location.amenities.map((amenity: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <Check size={18} className="gold-text mt-1 flex-shrink-0" />
              <span className="text-zinc-300">{amenity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

