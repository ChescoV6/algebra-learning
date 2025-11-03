"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Zap, Target, Brain, Trophy, Timer } from "lucide-react"
import Link from "next/link"

const games = [
  {
    id: "equation-race",
    title: "Equation Race",
    description: "Solve equations as fast as you can! Beat the clock and set new records.",
    icon: Zap,
    difficulty: "Easy",
    color: "text-yellow-500",
  },
  {
    id: "algebra-shooter",
    title: "Algebra Shooter",
    description: "Shoot the correct answers to destroy incoming problems!",
    icon: Target,
    difficulty: "Medium",
    color: "text-blue-500",
  },
  {
    id: "memory-match",
    title: "Memory Match",
    description: "Match equations with their solutions in this memory challenge.",
    icon: Brain,
    difficulty: "Easy",
    color: "text-purple-500",
  },
  {
    id: "balance-scale",
    title: "Balance the Scale",
    description: "Keep the equation balanced by performing the same operations on both sides.",
    icon: Trophy,
    difficulty: "Medium",
    color: "text-green-500",
  },
  {
    id: "speed-challenge",
    title: "Speed Challenge",
    description: "Answer as many questions as possible in 60 seconds!",
    icon: Timer,
    difficulty: "Hard",
    color: "text-red-500",
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-bold text-foreground">Math Games</h1>
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
            Learn algebra through fun, interactive games. Challenge yourself and improve your skills!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => {
            const Icon = game.icon
            return (
              <Card key={game.id} className="p-6 transition-all hover:shadow-lg">
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ${game.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{game.difficulty}</Badge>
                </div>

                <h2 className="mb-2 text-xl font-semibold text-foreground">{game.title}</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{game.description}</p>

                <Button asChild className="w-full">
                  <Link href={`/games/${game.id}`}>
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Play Game
                  </Link>
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
