"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LocationDetail from "./location-detail"
import { locations } from "@/data/locations"

export default function LocationTabs() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 md:px-8">
        <Tabs defaultValue="greenwich" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="greenwich">Greenwich Village</TabsTrigger>
            <TabsTrigger value="tribeca">TriBeCa</TabsTrigger>
          </TabsList>

          <TabsContent value="greenwich" className="focus-visible:outline-none focus-visible:ring-0">
            <LocationDetail location={locations.greenwich} />
          </TabsContent>

          <TabsContent value="tribeca" className="focus-visible:outline-none focus-visible:ring-0">
            <LocationDetail location={locations.tribeca} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

