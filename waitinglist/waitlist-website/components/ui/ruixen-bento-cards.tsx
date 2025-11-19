"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

const cardContents = [
  {
    title: "Record Your Process",
    description:
      "Start recording and walk through your workflow. The tool captures each step with screenshots automatically.",
    tags: ["Capture", "Automation"]
  },
  {
    title: "Generate Guides",
    description:
      "Convert your recording into clear, structured documentation. Each action becomes a step with descriptions.",
    tags: ["AI", "Generation"]
  },
  {
    title: "Edit and Organize",
    description:
      "Adjust text, reorder steps, and add context with a simple editor. Perfect the documentation to match your needs.",
    tags: ["Editor", "Customization"]
  },
  {
    title: "Share with Team",
    description:
      "Export guides or share via public link. Ideal for process documentation and training materials.",
    tags: ["Collaboration", "Sharing"]
  },
  {
    title: "Consistent Output",
    description:
      "Create standardized documentation every time. Clean formatting and structure that makes processes easy to follow.",
    tags: ["Standardization", "Quality"]
  },
]


const CornerPlusIcon = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute w-4 h-4 pointer-events-none z-20", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-full h-full text-muted-foreground/40"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
  );
};

const PlusCard: React.FC<{
  className?: string
  title: string
  description: string
  tags: string[]
}> = ({
  className = "",
  title,
  description,
  tags,
}) => {
    return (
      <div
        className={cn(
          "relative border border-border rounded-xl p-6 bg-white hover:border-primary/50 transition-colors group shadow-sm hover:shadow-md",
          "flex flex-col justify-between",
          className
        )}
      >
        {/* Corner Icons */}
        <CornerPlusIcon className="-top-2 -left-2" />
        <CornerPlusIcon className="-top-2 -right-2" />
        <CornerPlusIcon className="-bottom-2 -left-2" />
        <CornerPlusIcon className="-bottom-2 -right-2" />

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

export default function RuixenBentoCards() {
  return (
    <section className="relative z-10">
      <div className="mx-auto container py-12 px-4 sm:px-6 lg:px-8">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 auto-rows-auto gap-4 relative z-0">
          {/* Large featured card - takes top row */}
          <PlusCard {...cardContents[0]} className="plus-card lg:col-span-3 lg:row-span-2 xl:col-span-3" />

          {/* Secondary card */}
          <PlusCard {...cardContents[1]} className="plus-card lg:col-span-3 lg:row-span-2 xl:col-span-3" />

          {/* Third row cards */}
          <PlusCard {...cardContents[2]} className="plus-card lg:col-span-2 lg:row-span-1" />
          <PlusCard {...cardContents[3]} className="plus-card lg:col-span-2 lg:row-span-1" />
          <PlusCard {...cardContents[4]} className="plus-card lg:col-span-2 lg:row-span-1" />
        </div>

        {/* Section Footer Heading */}
        <div className="max-w-2xl md:max-w-3xl xl:max-w-4xl ml-auto text-right px-4 sm:px-6 mt-12 relative z-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-foreground">
            Better documentation, faster.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Transform how your team creates and shares process documentation. Join the waitlist for early access.
          </p>
        </div>
      </div>
    </section>
  )
}
