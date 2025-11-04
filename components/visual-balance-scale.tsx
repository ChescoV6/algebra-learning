"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VisualBalanceScaleProps {
  leftSide: string
  rightSide: string
  title?: string
  balanced?: boolean
}

export function VisualBalanceScale({ leftSide, rightSide, title, balanced = true }: VisualBalanceScaleProps) {
  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      {title && (
        <div className="mb-4 text-center">
          <Badge variant="secondary">{title}</Badge>
        </div>
      )}

      <div className="relative">
        {/* Scale Plates */}
        <div className="flex items-end justify-center gap-8">
          {/* Left Plate */}
          <div className="flex flex-col items-center">
            <div
              className={`flex h-32 w-32 items-center justify-center rounded-2xl border-4 bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg transition-all ${
                balanced ? "border-primary" : "border-red-500"
              }`}
            >
              <div className="text-center text-2xl font-bold text-foreground">{leftSide}</div>
            </div>
            <div className="mt-2 h-16 w-2 bg-gradient-to-b from-primary to-primary/50"></div>
          </div>

          {/* Right Plate */}
          <div className="flex flex-col items-center">
            <div
              className={`flex h-32 w-32 items-center justify-center rounded-2xl border-4 bg-gradient-to-br from-accent/20 to-accent/10 shadow-lg transition-all ${
                balanced ? "border-accent" : "border-red-500"
              }`}
            >
              <div className="text-center text-2xl font-bold text-foreground">{rightSide}</div>
            </div>
            <div className="mt-2 h-16 w-2 bg-gradient-to-b from-accent to-accent/50"></div>
          </div>
        </div>

        {/* Base */}
        <div className="mx-auto mt-0 h-4 w-64 rounded-full bg-gradient-to-r from-primary via-muted to-accent"></div>
        <div className="mx-auto h-8 w-4 bg-gradient-to-b from-muted to-muted/50"></div>
        <div className="mx-auto h-3 w-32 rounded-full bg-muted"></div>

        {/* Balance Indicator */}
        <div className="mt-4 text-center">
          {balanced ? (
            <div className="text-sm font-medium text-green-600 dark:text-green-400">
              ⚖️ Balanced - Both sides are equal!
            </div>
          ) : (
            <div className="text-sm font-medium text-red-600 dark:text-red-400">⚠️ Not balanced - Keep solving!</div>
          )}
        </div>
      </div>
    </Card>
  )
}
