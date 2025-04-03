import alex from "@/public/alex.avif"
import sarah from "@/public/sarah.avif"
import mark from "@/public/mark.avif"
import olivia from "@/public/Olivia.avif"
import av1 from "@/public/ava1.avif"
import av2 from "@/public/ava2.avif"
import av3 from "@/public/ava3.avif"

export const trainers = [
  {
    slug: "alex-morgan",
    name: "Alex Morgan",
    title: "Head Strength Coach",
    image: alex,
    shortBio:
      "With over 15 years of experience training elite athletes and executives, Alex specializes in strength development and body composition transformation.",
    fullBio:
      "Alex Morgan brings over 15 years of experience in the fitness industry, having worked with professional athletes, celebrities, and executives. After earning a degree in Exercise Science from Columbia University, Alex spent five years as a strength coach for a professional sports team before founding Aesthetic Lab.\n\nAlex's approach combines scientific principles with practical application, focusing on progressive overload, biomechanical efficiency, and individualized programming. This methodology has helped hundreds of clients achieve remarkable physical transformations while minimizing injury risk.",
    specializations: [
      "Strength Development",
      "Body Composition Transformation",
      "Athletic Performance",
      "Injury Prevention",
      "Program Design",
    ],
    certifications: [
      "NSCA Certified Strength and Conditioning Specialist (CSCS)",
      "NASM Performance Enhancement Specialist (PES)",
      "Precision Nutrition Level 2 Coach",
      "USA Weightlifting Sports Performance Coach",
      "Functional Range Conditioning Mobility Specialist (FRCms)",
    ],
    testimonials: [
      {
        text: "Working with Alex completely transformed my approach to fitness. His scientific approach and personalized programming helped me achieve results I never thought possible.",
        author: "James Wilson, CEO",
        image: av1,
      },
      {
        text: "Alex's attention to detail and focus on proper technique has not only improved my performance but eliminated the chronic pain I struggled with for years.",
        author: "Sarah Johnson, Attorney",
        image: av2,
      },
    ],
    videos: [
      {
        title: "Strength Training Fundamentals",
        thumbnail: "https://plus.unsplash.com/premium_photo-1664298341091-9281d574b0f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R3ltJTIwVGh1bWJuYWlsc3xlbnwwfHwwfHx8MA%3D%3D",
        url: "#",
      },
      {
        title: "Client Transformation: 12 Weeks",
        thumbnail: "https://plus.unsplash.com/premium_photo-1679635697634-dd5609151838?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8R3ltJTIwVGh1bWJuYWlsc3xlbnwwfHwwfHx8MA%3D%3D",
        url: "#",
      },
    ],
    availability: "Monday, Wednesday, Friday: 6am-2pm | Tuesday, Thursday: 12pm-8pm",
  },
  {
    slug: "sarah-chen",
    name: "Sarah Chen",
    title: "Nutrition & Recovery Specialist",
    image: sarah,
    shortBio:
      "Sarah combines her background in nutritional biochemistry with practical coaching to help clients optimize their metabolism and recovery protocols.",
    fullBio:
      "Sarah Chen holds a Master's degree in Nutritional Sciences from NYU and has dedicated her career to understanding the complex relationship between nutrition, recovery, and physical performance. Before joining Aesthetic Lab, Sarah worked as a research assistant at a leading sports performance laboratory and as a nutritionist for Olympic athletes.\n\nSarah's evidence-based approach to nutrition focuses on metabolic optimization, nutrient timing, and sustainable dietary practices. She rejects one-size-fits-all diet plans, instead creating personalized nutrition strategies based on each client's metabolic profile, activity level, and lifestyle factors.",
    specializations: [
      "Nutritional Programming",
      "Metabolic Optimization",
      "Recovery Protocols",
      "Body Composition Management",
      "Supplement Evaluation",
    ],
    certifications: [
      "Precision Nutrition Level 2 Coach",
      "International Society of Sports Nutrition (ISSN) Certified Sports Nutritionist",
      "National Academy of Sports Medicine (NASM) Fitness Nutrition Specialist",
      "Functional Medicine Certified Health Coach (FMCHC)",
      "Institute for Functional Medicine (IFM) Certified Practitioner",
    ],
    testimonials: [
      {
        text: "Sarah's nutritional guidance has been transformative. Her approach is scientific yet practical, making it easy to implement sustainable changes that have dramatically improved my energy and body composition.",
        author: "Michael Chen, Finance Executive",
        image: av3,
      },
      {
        text: "As a competitive athlete, nutrition is critical to my performance. Sarah's personalized approach has optimized my fueling strategy and recovery, leading to significant improvements in my competition results.",
        author: "Emma Rodriguez, Professional Athlete",
        image: av2,
      },
    ],
    videos: [
      {
        title: "Nutrition Myths Debunked",
        thumbnail: "https://plus.unsplash.com/premium_photo-1674059548485-808fc674463a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEd5bSUyMFRodW1ibmFpbHN8ZW58MHx8MHx8fDA%3D",
        url: "#",
      },
      {
        title: "Recovery Nutrition Strategies",
        thumbnail: "https://plus.unsplash.com/premium_photo-1674440623887-7336d5d661c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fEd5bSUyMFRodW1ibmFpbHN8ZW58MHx8MHx8fDA%3D",
        url: "#",
      },
    ],
    availability: "Monday, Wednesday, Friday: 10am-6pm | Tuesday, Thursday: 8am-4pm",
  },
  {
    slug: "marcus-williams",
    name: "Marcus Williams",
    title: "Movement & Mobility Expert",
    image: mark,
    shortBio:
      "Former professional dancer turned fitness expert, Marcus focuses on functional movement patterns and mobility to enhance performance and prevent injuries.",
    fullBio:
      "Marcus Williams brings a unique perspective to fitness, having spent a decade as a professional contemporary dancer before transitioning to strength and conditioning. His background in dance, combined with extensive study in biomechanics and functional anatomy, gives him unparalleled insight into movement quality, mobility, and physical performance.\n\nAfter retiring from dance, Marcus earned certifications in multiple movement methodologies and completed a degree in Physical Therapy. His approach emphasizes movement quality over quantity, focusing on establishing optimal movement patterns before adding load or intensity.",
    specializations: [
      "Movement Assessment",
      "Mobility Enhancement",
      "Corrective Exercise",
      "Functional Training",
      "Injury Rehabilitation",
    ],
    certifications: [
      "Functional Range Conditioning Mobility Specialist (FRCms)",
      "NASM Corrective Exercise Specialist (CES)",
      "Dynamic Neuromuscular Stabilization (DNS) Practitioner",
      "Postural Restoration Institute (PRI) Certified",
      "Selective Functional Movement Assessment (SFMA) Certified",
    ],
    testimonials: [
      {
        text: "Marcus completely transformed my movement patterns. After years of chronic pain and limited mobility, his methodical approach has restored function I thought I'd lost forever.",
        author: "David Thompson, Retired Athlete",
        image: av1,
      },
      {
        text: "As someone who sits at a desk all day, Marcus's mobility work has been life-changing. Not only has my posture improved, but I've eliminated the back pain that plagued me for years.",
        author: "Jennifer Lee, Technology Executive",
        image: av3,
      },
    ],
    videos: [
      {
        title: "Mobility for Desk Workers",
        thumbnail: "https://plus.unsplash.com/premium_photo-1716312742849-840482b1cfbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fEd5bSUyMFRodW1ibmFpbHN8ZW58MHx8MHx8fDA%3D",
        url: "#",
      },
      {
        title: "Movement Assessment Fundamentals",
        thumbnail: "https://plus.unsplash.com/premium_photo-1663045495227-4fca1b51c284?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fEd5bSUyMFRodW1ibmFpbHN8ZW58MHx8MHx8fDA%3D",
        url: "#",
      },
    ],
    availability: "Monday, Tuesday, Thursday: 7am-3pm | Wednesday, Friday: 11am-7pm",
  },
  {
    slug: "olivia-bennett",
    name: "Olivia Bennett",
    title: "Performance Coach",
    image: olivia,
    shortBio:
      "With a background in competitive athletics and sports science, Olivia specializes in developing peak performance protocols for clients ranging from executives to professional athletes.",
    fullBio:
      "Olivia Bennett is a former Division I track athlete who transitioned into performance coaching after completing her Master's in Exercise Physiology. Her athletic background, combined with her academic expertise, gives her a comprehensive understanding of what it takes to optimize human performance.\n\nOlivia's coaching philosophy centers on developing all aspects of physical capacity—strength, power, endurance, and recovery—while maintaining a focus on long-term sustainability. She excels at helping clients break through performance plateaus and achieve new levels of physical capability.",
    specializations: [
      "Athletic Development",
      "Power Training",
      "Speed & Agility",
      "Conditioning Protocols",
      "Performance Testing",
    ],
    certifications: [
      "EXOS Performance Specialist",
      "USA Weightlifting Level 2 Coach",
      "NSCA Certified Strength and Conditioning Specialist (CSCS)",
      "Reflexive Performance Reset (RPR) Level 2",
      "TPI Fitness Level 2 Certified",
    ],
    testimonials: [
      {
        text: "Olivia's programming took my athletic performance to levels I didn't think were possible at my age. Her scientific approach and attention to detail make all the difference.",
        author: "Robert Chen, Amateur Athlete",
        image: av1,
      },
      {
        text: "As a busy executive who travels frequently, Olivia created a program that adapts to my unpredictable schedule while still delivering results. Her approach is both effective and practical.",
        author: "Amanda Johnson, CEO",
        image: av3,
      },
    ],
    videos: [
      {
        title: "Power Development Techniques",
        thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3ltJTIwVHJhaW5lcnxlbnwwfHwwfHx8MA%3D%3D",
        url: "#",
      },
      {
        title: "Athletic Performance Testing",
        thumbnail: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEd5bSUyMFRyYWluZXJ8ZW58MHx8MHx8fDA%3D",
        url: "#",
      },
    ],
    availability: "Monday, Wednesday, Friday: 8am-4pm | Tuesday, Thursday: 12pm-8pm",
  },
]

