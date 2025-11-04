"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Zap, Trophy, Flame, Star, Clock } from "lucide-react"
import Link from "next/link"
import { generateProblem } from "@/lib/problem-generator"
import { useProgress } from "@/lib/progress-context"

interface Particle {
  id: number
  x: number
  y: number
  text: string
  color: string
}

export default function EquationRacePage() {
  const { addXP } = useProgress()
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu")
  const [timeLeft, setTimeLeft] = useState(90)
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState(generateProblem("one-step-add-sub", "easy"))
  const [userAnswer, setUserAnswer] = useState("")
  const [streak, setStreak] = useState(0)
  const [combo, setCombo] = useState(1)
  const [particles, setParticles] = useState<Particle[]>([])
  const [nextParticleId, setNextParticleId] = useState(0)
  const [powerUp, setPowerUp] = useState<"none" | "double-time" | "mega-points">("none")
  const [powerUpTimer, setPowerUpTimer] = useState(0)
  const [shake, setShake] = useState(false)
  const [perfectStreak, setPerfectStreak] = useState(0)

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("finished")
      addXP(score * 2)
    }
  }, [timeLeft, gameState, score, addXP])

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(1))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [particles])

  useEffect(() => {
    if (powerUpTimer > 0 && gameState === "playing") {
      const timer = setTimeout(() => {
        setPowerUpTimer(powerUpTimer - 1)
        if (powerUpTimer === 1) {
          setPowerUp("none")
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [powerUpTimer, gameState])

  const spawnParticle = (text: string, color: string) => {
    const newParticle: Particle = {
      id: nextParticleId,
      x: Math.random() * 80 + 10,
      y: 50,
      text,
      color,
    }
    setParticles((prev) => [...prev, newParticle])
    setNextParticleId(nextParticleId + 1)
  }

  const handleStart = () => {
    setGameState("playing")
    setTimeLeft(90)
    setScore(0)
    setStreak(0)
    setCombo(1)
    setParticles([])
    setPowerUp("none")
    setPowerUpTimer(0)
    setPerfectStreak(0)
    setCurrentProblem(generateProblem("one-step-add-sub", "easy"))
    setUserAnswer("")
  }

  const handleSubmit = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === currentProblem.answer.toLowerCase()

    if (isCorrect) {
      const basePoints = 1
      const comboBonus = Math.floor(streak / 3)
      const powerUpMultiplier = powerUp === "mega-points" ? 2 : 1
      const points = (basePoints + comboBonus) * combo * powerUpMultiplier

      setScore(score + points)
      setStreak(streak + 1)
      setPerfectStreak(perfectStreak + 1)

      if ((streak + 1) % 5 === 0) {
        setCombo(combo + 1)
        spawnParticle(`COMBO x${combo + 1}!`, "text-purple-500")
      }

      if ((streak + 1) % 10 === 0) {
        const powerUps: Array<"double-time" | "mega-points"> = ["double-time", "mega-points"]
        const randomPowerUp = powerUps[Math.floor(Math.random() * powerUps.length)]
        setPowerUp(randomPowerUp)
        setPowerUpTimer(10)
        spawnParticle(randomPowerUp === "double-time" ? "⚡ DOUBLE TIME!" : "💎 MEGA POINTS!", "text-yellow-500")
      }

      const timeBonus = powerUp === "double-time" ? 6 : 3
      setTimeLeft(timeLeft + timeBonus)

      spawnParticle(`+${points}`, "text-green-500")

      const difficulty = streak < 10 ? "easy" : streak < 25 ? "medium" : "hard"
      setCurrentProblem(generateProblem("one-step-add-sub", difficulty))
      setUserAnswer("")
    } else {
      setStreak(0)
      if (combo > 1) {
        setCombo(Math.max(1, combo - 1))
      }
      setPerfectStreak(0)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      spawnParticle("Try again!", "text-orange-500")
      setUserAnswer("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/games">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Link>
        </Button>

        {gameState === "menu" && (
          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50">
                <Zap className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
              Equation Race
            </h1>
            <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
              Solve simple equations at your own pace! Each correct answer gives you bonus time. Don't worry about
              mistakes - just keep trying!
            </p>
            <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-border bg-card p-3">
                <Flame className="mx-auto mb-2 h-6 w-6 text-orange-500" />
                <div className="font-semibold text-foreground">Build Streaks</div>
                <div className="text-muted-foreground">Keep going for bonuses</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <Star className="mx-auto mb-2 h-6 w-6 text-yellow-500" />
                <div className="font-semibold text-foreground">Earn Power-Ups</div>
                <div className="text-muted-foreground">Get special boosts</div>
              </div>
            </div>
            <Button size="lg" onClick={handleStart} className="bg-gradient-to-r from-yellow-500 to-orange-500">
              Start Race
            </Button>
          </Card>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <Card className="relative overflow-hidden p-6">
              {powerUp !== "none" && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
              )}
              <div className="relative mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Score</div>
                  <div className="text-3xl font-bold text-foreground">{score}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Streak</div>
                  <div className="flex items-center gap-1 text-3xl font-bold text-orange-500">
                    <Flame className={`h-6 w-6 ${streak > 0 ? "animate-pulse" : ""}`} />
                    {streak}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Combo</div>
                  <div className="flex items-center gap-1 text-3xl font-bold text-purple-500">
                    <Zap className="h-6 w-6" />x{combo}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div
                    className={`text-3xl font-bold ${timeLeft <= 10 ? "animate-pulse text-red-500" : "text-foreground"}`}
                  >
                    {timeLeft}s
                  </div>
                </div>
              </div>
              <Progress value={(timeLeft / 90) * 100} className={`h-2 ${timeLeft <= 10 ? "animate-pulse" : ""}`} />
              {powerUp !== "none" && (
                <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-2 text-sm font-semibold text-yellow-500">
                  <Clock className="h-4 w-4" />
                  {powerUp === "double-time" ? "⚡ DOUBLE TIME" : "💎 MEGA POINTS"} - {powerUpTimer}s
                </div>
              )}
            </Card>

            <Card className={`relative overflow-hidden p-8 ${shake ? "animate-shake" : ""}`}>
              <div className="pointer-events-none absolute inset-0">
                {particles.map((particle) => (
                  <div
                    key={particle.id}
                    className={`absolute animate-float text-2xl font-bold ${particle.color}`}
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                    }}
                  >
                    {particle.text}
                  </div>
                ))}
              </div>

              <h2 className="mb-6 text-center text-4xl font-bold text-foreground">{currentProblem.question}</h2>
              <Input
                type="text"
                placeholder="Your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit()
                  }
                }}
                className="mb-4 text-center text-2xl"
                autoFocus
              />
              <Button
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500"
                size="lg"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Card>
          </div>
        )}

        {gameState === "finished" && (
          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
              Race Complete!
            </h1>
            <div className="mb-6 space-y-2">
              <p className="text-xl text-foreground">
                Final Score: <span className="font-bold text-yellow-500">{score}</span>
              </p>
              <p className="text-lg text-muted-foreground">
                Best Streak: <span className="font-semibold text-orange-500">{perfectStreak}</span>
              </p>
              <p className="text-lg text-muted-foreground">
                Max Combo: <span className="font-semibold text-purple-500">x{combo}</span>
              </p>
            </div>
            <p className="mb-8 text-muted-foreground">You earned {score * 2} XP!</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleStart} className="bg-gradient-to-r from-yellow-500 to-orange-500">
                Race Again
              </Button>
              <Button asChild variant="outline">
                <Link href="/games">Back to Games</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
