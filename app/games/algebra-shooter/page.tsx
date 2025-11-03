"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Target, Trophy, Heart, Zap, Star } from "lucide-react"
import Link from "next/link"
import { generateProblem } from "@/lib/problem-generator"
import { useProgress } from "@/lib/progress-context"

interface FallingProblem {
  id: number
  question: string
  answer: string
  options: string[]
  y: number
  speed: number
}

export default function AlgebraShooterPage() {
  const { addXP } = useProgress()
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu")
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [problems, setProblems] = useState<FallingProblem[]>([])
  const [nextId, setNextId] = useState(0)
  const [wave, setWave] = useState(1)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [powerUp, setPowerUp] = useState<"none" | "slow-time" | "shield">("none")
  const [powerUpTimer, setPowerUpTimer] = useState(0)
  const [shieldActive, setShieldActive] = useState(false)

  useEffect(() => {
    if (gameState !== "playing") return

    const speed = powerUp === "slow-time" ? 1 : 2 + Math.floor(wave / 3)
    const gameLoop = setInterval(() => {
      setProblems((prev) => {
        const updated = prev.map((p) => ({ ...p, y: p.y + p.speed }))
        const filtered = updated.filter((p) => {
          if (p.y > 100) {
            if (shieldActive) {
              setShieldActive(false)
              setPowerUp("none")
              return false
            }
            setLives((l) => l - 1)
            setCombo(0)
            return false
          }
          return true
        })

        const maxProblems = Math.min(3 + Math.floor(wave / 2), 5)
        const spawnChance = 0.02 + wave * 0.005

        if (Math.random() < spawnChance && filtered.length < maxProblems) {
          const difficulty = wave < 3 ? "easy" : wave < 6 ? "medium" : "hard"
          const problem = generateProblem("one-step-add-sub", difficulty)
          const correct = problem.answer
          const wrong1 = (Number.parseInt(correct) + Math.floor(Math.random() * 5) + 1).toString()
          const wrong2 = (Number.parseInt(correct) - Math.floor(Math.random() * 5) - 1).toString()
          const options = [correct, wrong1, wrong2].sort(() => Math.random() - 0.5)

          filtered.push({
            id: nextId,
            question: problem.question,
            answer: correct,
            options,
            y: 0,
            speed,
          })
          setNextId(nextId + 1)
        }

        return filtered
      })
    }, 50)

    return () => clearInterval(gameLoop)
  }, [gameState, nextId, wave, powerUp, shieldActive])

  useEffect(() => {
    if (powerUpTimer > 0 && gameState === "playing") {
      const timer = setTimeout(() => {
        setPowerUpTimer(powerUpTimer - 1)
        if (powerUpTimer === 1 && powerUp !== "shield") {
          setPowerUp("none")
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [powerUpTimer, gameState, powerUp])

  useEffect(() => {
    if (lives <= 0 && gameState === "playing") {
      setGameState("finished")
      const baseXP = score * 2
      const waveBonus = wave * 10
      const comboBonus = maxCombo * 5
      addXP(baseXP + waveBonus + comboBonus)
    }
  }, [lives, gameState, score, wave, maxCombo, addXP])

  const handleStart = () => {
    setGameState("playing")
    setScore(0)
    setLives(3)
    setProblems([])
    setNextId(0)
    setWave(1)
    setCombo(0)
    setMaxCombo(0)
    setPowerUp("none")
    setPowerUpTimer(0)
    setShieldActive(false)
  }

  const handleShoot = (problemId: number, answer: string) => {
    const problem = problems.find((p) => p.id === problemId)
    if (!problem) return

    if (answer === problem.answer) {
      const points = 10 + combo * 2
      setScore(score + points)
      setCombo(combo + 1)
      if (combo + 1 > maxCombo) {
        setMaxCombo(combo + 1)
      }
      setProblems((prev) => prev.filter((p) => p.id !== problemId))

      if (score > 0 && (score + points) % 50 === 0) {
        setWave(wave + 1)
      }

      if ((combo + 1) % 5 === 0) {
        const powerUps: Array<"slow-time" | "shield"> = ["slow-time", "shield"]
        const randomPowerUp = powerUps[Math.floor(Math.random() * powerUps.length)]
        setPowerUp(randomPowerUp)
        setPowerUpTimer(10)
        if (randomPowerUp === "shield") {
          setShieldActive(true)
        }
      }
    } else {
      setCombo(0)
      if (shieldActive) {
        setShieldActive(false)
        setPowerUp("none")
      } else {
        setLives(lives - 1)
      }
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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                <Target className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
              Algebra Shooter
            </h1>
            <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
              Shoot the correct answers to destroy falling problems! Build combos, survive waves, and unlock power-ups.
              Don't let problems reach the bottom!
            </p>
            <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-border bg-card p-3">
                <Zap className="mx-auto mb-2 h-6 w-6 text-yellow-500" />
                <div className="font-semibold text-foreground">Combo System</div>
                <div className="text-muted-foreground">Chain hits for bonus points</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <Star className="mx-auto mb-2 h-6 w-6 text-purple-500" />
                <div className="font-semibold text-foreground">Power-Ups</div>
                <div className="text-muted-foreground">Slow time & shield protection</div>
              </div>
            </div>
            <Button size="lg" onClick={handleStart} className="bg-gradient-to-r from-blue-500 to-cyan-500">
              Start Shooting
            </Button>
          </Card>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <Card className={`relative overflow-hidden p-6 ${powerUp !== "none" ? "border-yellow-500" : ""}`}>
              {powerUp !== "none" && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
              )}
              <div className="relative grid grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Score</div>
                  <div className="text-2xl font-bold text-foreground">{score}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Wave</div>
                  <div className="text-2xl font-bold text-blue-500">{wave}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Combo</div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-purple-500">
                    <Zap className={`h-5 w-5 ${combo > 0 ? "animate-pulse" : ""}`} />
                    {combo}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Lives</div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Heart
                        key={i}
                        className={`h-6 w-6 ${i < lives ? "fill-red-500 text-red-500" : "text-muted-foreground"} ${shieldActive && i === lives - 1 ? "animate-pulse fill-blue-500 text-blue-500" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {powerUp !== "none" && (
                <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-2 text-sm font-semibold text-yellow-500">
                  {powerUp === "slow-time" ? "⏰ SLOW TIME" : "🛡️ SHIELD ACTIVE"} - {powerUpTimer}s
                </div>
              )}
            </Card>

            <Card className="relative h-[500px] overflow-hidden bg-gradient-to-b from-background via-blue-500/5 to-cyan-500/10 p-4">
              <div className="absolute left-4 top-4 rounded-lg bg-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-500">
                Wave {wave}
              </div>

              {problems.map((problem) => (
                <div
                  key={problem.id}
                  className="absolute left-1/2 w-full max-w-md -translate-x-1/2 transition-all duration-100"
                  style={{ top: `${problem.y}%` }}
                >
                  <Card className="border-2 border-blue-500 bg-card p-4 shadow-lg shadow-blue-500/30">
                    <div className="mb-3 text-center font-semibold text-foreground">{problem.question}</div>
                    <div className="grid grid-cols-3 gap-2">
                      {problem.options.map((option, i) => (
                        <Button
                          key={i}
                          size="sm"
                          variant="outline"
                          onClick={() => handleShoot(problem.id, option)}
                          className="text-foreground hover:border-blue-500 hover:bg-blue-500/20 hover:scale-105 transition-all"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
              {problems.length === 0 && (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Get ready for wave {wave}...
                </div>
              )}
            </Card>
          </div>
        )}

        {gameState === "finished" && (
          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
              Game Over!
            </h1>
            <div className="mb-6 space-y-2">
              <p className="text-xl text-foreground">
                Final Score: <span className="font-bold text-blue-500">{score}</span>
              </p>
              <p className="text-lg text-muted-foreground">
                Waves Survived: <span className="font-semibold text-cyan-500">{wave}</span>
              </p>
              <p className="text-lg text-muted-foreground">
                Max Combo: <span className="font-semibold text-purple-500">{maxCombo}</span>
              </p>
            </div>
            <p className="mb-8 text-muted-foreground">You earned {score * 2 + wave * 10 + maxCombo * 5} XP!</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleStart} className="bg-gradient-to-r from-blue-500 to-cyan-500">
                Play Again
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
