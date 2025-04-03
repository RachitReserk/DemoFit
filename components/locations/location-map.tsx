export default function LocationMap({
  address,
  mapUrl,
  locationName,
}: {
  address: string
  mapUrl: string
  locationName: string
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Find Us</h3>
      <div className="bg-zinc-800 rounded-lg overflow-hidden">
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of Aesthetic Lab ${locationName} location`}
          className="w-full"
        ></iframe>
      </div>
      <p className="mt-4 text-zinc-300">{address}</p>
    </div>
  )
}

