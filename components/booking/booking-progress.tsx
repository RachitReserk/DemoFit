import { Check } from "lucide-react"

interface BookingProgressProps {
  currentStep: number
}

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  const steps = [
    { number: 1, name: "Location" },
    { number: 2, name: "Service" },
    { number: 3, name: "Trainer" },
    { number: 4, name: "Date & Time" },
    { number: 5, name: "Contact" },
    { number: 6, name: "Review" },
  ]

  return (
    <div className="hidden md:block">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                currentStep > step.number
                  ? "bg-[hsl(var(--gold))] text-black"
                  : currentStep === step.number
                    ? "border-2 border-[hsl(var(--gold))] text-white"
                    : "border-2 border-zinc-700 text-zinc-500"
              }`}
            >
              {currentStep > step.number ? <Check size={20} /> : <span>{step.number}</span>}
            </div>
            <span className={`text-sm ${currentStep >= step.number ? "text-white" : "text-zinc-500"}`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mt-2">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-zinc-700"></div>
        <div
          className="absolute top-0 left-0 h-0.5 bg-[hsl(var(--gold))] transition-all duration-300"
          style={{
            width: `${Math.min(100, ((currentStep - 1) / (steps.length - 1)) * 100)}%`,
          }}
        ></div>
      </div>
    </div>
  )
}

