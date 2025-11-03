"use client"

import { Sparkles } from "lucide-react"

export function Watermark() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Main watermark */}
        <div className="relative flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-xl">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-sm font-semibold text-transparent">
            Made by Francesco Mora
          </span>
        </div>
      </div>
    </div>
  )
}
