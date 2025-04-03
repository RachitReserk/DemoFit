import { trainers } from "./trainers"

export const locations = {
  greenwich: {
    slug: "greenwich",
    name: "Greenwich Village",
    address: "123 Washington Square, New York, NY 10012",
    phone: "(212) 555-1234",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.4408477179847!2d-73.99800908459418!3d40.73083797932946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599787834ad9%3A0x4b402b92c7e63c!2sWashington%20Square%20Park!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus",
    hours: {
      weekday: "6am - 9pm",
      weekend: "8am - 6pm",
    },
    amenities: [
      "State-of-the-art strength equipment",
      "Olympic weightlifting platforms",
      "Recovery center with cold plunge",
      "Infrared sauna",
      "Private training rooms",
      "Luxury locker rooms",
      "Complimentary towel service",
      "Premium grooming products",
    ],
    trainers: [
      trainers.find((t) => t.slug === "alex-morgan"),
      trainers.find((t) => t.slug === "sarah-chen"),
      trainers.find((t) => t.slug === "marcus-williams"),
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1623874106686-5be2b325c8f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Greenwich Village studio main training floor",
      },
      {
        url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Greenwich Village strength training area",
      },
      {
        url: "https://fitnessmith.com/wp-content/uploads/2025/01/FS-blog_1.2.25_The-Benefits-of-Recovery-Rooms-in-Fitness-Facilities_graphics_image-7.jpg",
        alt: "Greenwich Village recovery center",
      },
      {
        url: "https://images.unsplash.com/photo-1659331150328-e6c822ae77b2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Greenwich Village private training room",
      },
      {
        url: "https://images.unsplash.com/photo-1689007657910-544b2dea3bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Greenwich Village luxury locker room",
      },
      {
        url: "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Greenwich Village reception area",
      },
    ],
  },
  tribeca: {
    slug: "tribeca",
    name: "TriBeCa",
    address: "456 Hudson Street, New York, NY 10013",
    phone: "(212) 555-5678",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9126415841765!2d-74.00929768459458!3d40.72064797933196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259f4b3c1c5cd%3A0xc41c9a6856968c9c!2sHudson%20St%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus",
    hours: {
      weekday: "6am - 9pm",
      weekend: "8am - 6pm",
    },
    amenities: [
      "Expansive open training floor",
      "Performance testing lab",
      "3D body scanning technology",
      "Recovery center with cold plunge and sauna",
      "Dedicated mobility area",
      "Nutrition consultation room",
      "Luxury locker rooms",
      "Premium grooming products",
    ],
    trainers: [
      trainers.find((t) => t.slug === "olivia-bennett"),
      trainers.find((t) => t.slug === "marcus-williams"),
      trainers.find((t) => t.slug === "sarah-chen"),
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1637666123723-1bea229bd054?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "TriBeCa studio main training floor",
      },
      {
        url: "https://images.unsplash.com/photo-1651315283944-852219dff97b?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "TriBeCa performance testing lab",
      },
      {
        url: "https://fitnessproject.us/wp-content/uploads/2023/01/9H7A0872.jpg",
        alt: "TriBeCa 3D body scanning room",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1661687148883-790046842a8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "TriBeCa recovery center",
      },
      {
        url: "https://images.unsplash.com/photo-1483861911361-57d334ad765b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "TriBeCa luxury locker room",
      },
      {
        url: "https://images.unsplash.com/photo-1696091314116-bdcd55ec37e2?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "TriBeCa reception area",
      },
    ],
  },
}

