"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb } from "lucide-react"

interface ConceptVisualizerProps {
  title: string
  concept: string
  visual: React.ReactNode
  explanation: string
}

export function ConceptVisualizer({ title, concept, visual, explanation }: ConceptVisualizerProps) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 text-center">
          <Badge variant="secondary" className="mb-3">
            {concept}
          </Badge>
        </div>

        {/* Visual Representation */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-6">{visual}</div>

        {/* Explanation */}
        <div className="rounded-lg border border-border bg-background/50 p-4">
          <p className="leading-relaxed text-foreground">{explanation}</p>
        </div>
      </div>
    </Card>
  )
}
