"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Trophy, CheckCircle2, XCircle, Scale, Star } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/lib/progress-context"

interface BalanceLevel {
  leftSide: string
  rightSide: string
  steps: Array<{ operation: string; value: number; description: string }>
  solution: number
  difficulty: "easy" | "medium" | "hard"
}

export default function BalanceScalePage() {
  const { addXP } = useProgress()
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu")
  const [level, setLevel] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [leftValue, setLeftValue] = useState("")
  const [rightValue, setRightValue] = useState("")
  const [feedback, setFeedback] = useState<{ type: "correct" | "incorrect" | null; message: string }>({
    type: null,
    message: "",
  })
  const [score, setScore] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [perfectSolves, setPerfectSolves] = useState(0)
  const [mistakes, setMistakes] = useState(0)

  const levels: BalanceLevel[] = [
    {
      leftSide: "x + 5",
      rightSide: "12",
      steps: [{ operation: "subtract", value: 5, description: "Subtract 5 from both sides" }],
      solution: 7,
      difficulty: "easy",
    },
    {
      leftSide: "x + 3",
      rightSide: "10",
      steps: [{ operation: "subtract", value: 3, description: "Subtract 3 from both sides" }],
      solution: 7,
      difficulty: "easy",
    },
    {
      leftSide: "3x",
      rightSide: "15",
      steps: [{ operation: "divide", value: 3, description: "Divide both sides by 3" }],
      solution: 5,
      difficulty: "easy",
    },
    {
      leftSide: "2x",
      rightSide: "10",
      steps: [{ operation: "divide", value: 2, description: "Divide both sides by 2" }],
      solution: 5,
      difficulty: "easy",
    },
    {
      leftSide: "2x + 4",
      rightSide: "14",
      steps: [
        { operation: "subtract", value: 4, description: "Subtract 4 from both sides" },
        { operation: "divide", value: 2, description: "Divide both sides by 2" },
      ],
      solution: 5,
      difficulty: "medium",
    },
    {
      leftSide: "3x + 3",
      rightSide: "12",
      steps: [
        { operation: "subtract", value: 3, description: "Subtract 3 from both sides" },
        { operation: "divide", value: 3, description: "Divide both sides by 3" },
      ],
      solution: 3,
      difficulty: "medium",
    },
    {
      leftSide: "5x - 3",
      rightSide: "17",
      steps: [
        { operation: "add", value: 3, description: "Add 3 to both sides" },
        { operation: "divide", value: 5, description: "Divide both sides by 5" },
      ],
      solution: 4,
      difficulty: "medium",
    },
    {
      leftSide: "4x + 8",
      rightSide: "32",
      steps: [
        { operation: "subtract", value: 8, description: "Subtract 8 from both sides" },
        { operation: "divide", value: 4, description: "Divide both sides by 4" },
      ],
      solution: 6,
      difficulty: "hard",
    },
  ]

  const handleStart = () => {
    setGameState("playing")
    setLevel(0)
    setCurrentStep(0)
    setScore(0)
    setHintsUsed(0)
    setShowHint(false)
    setPerfectSolves(0)
    setMistakes(0)
    const firstLevel = levels[0]
    setLeftValue(firstLevel.leftSide)
    setRightValue(firstLevel.rightSide)
    setFeedback({ type: null, message: "" })
  }

  const handleOperation = (operation: string, value: number) => {
    const currentLevel = levels[level]
    const expectedStep = currentLevel.steps[currentStep]

    if (operation === expectedStep.operation && value === expectedStep.value) {
      setFeedback({ type: "correct", message: "Perfect! The scale stays balanced!" })
      const points = showHint ? 8 : 12
      setScore(score + points)

      // Update the equation
      let newLeft = leftValue
      let newRight = rightValue

      if (operation === "subtract") {
        newLeft = newLeft.includes(`+ ${value}`)
          ? newLeft.replace(`+ ${value}`, "").trim()
          : newLeft.replace(`- ${value}`, "").trim()
        newRight = (Number.parseInt(newRight) - value).toString()
      } else if (operation === "add") {
        newLeft = newLeft.includes(`- ${value}`) ? newLeft.replace(`- ${value}`, "").trim() : newLeft
        newRight = (Number.parseInt(newRight) + value).toString()
      } else if (operation === "divide") {
        newLeft = newLeft.replace(/^\d+/, "").trim()
        newRight = (Number.parseInt(newRight) / value).toString()
      }

      setLeftValue(newLeft)
      setRightValue(newRight)
      setShowHint(false)

      if (currentStep + 1 >= currentLevel.steps.length) {
        if (mistakes === 0 && hintsUsed === 0) {
          setPerfectSolves(perfectSolves + 1)
        }

        setTimeout(() => {
          if (level + 1 >= levels.length) {
            setGameState("finished")
            const baseXP = score
            const perfectBonus = perfectSolves * 20
            const accuracyBonus = Math.floor((1 - mistakes / (level + 1)) * 50)
            addXP(baseXP + perfectBonus + accuracyBonus)
          } else {
            setLevel(level + 1)
            setCurrentStep(0)
            setMistakes(0)
            const nextLevel = levels[level + 1]
            setLeftValue(nextLevel.leftSide)
            setRightValue(nextLevel.rightSide)
            setFeedback({ type: null, message: "" })
          }
        }, 1500)
      } else {
        setCurrentStep(currentStep + 1)
        setTimeout(() => setFeedback({ type: null, message: "" }), 1500)
      }
    } else {
      setFeedback({ type: "incorrect", message: "That's not quite right. The scale would tip! Try again." })
      setMistakes(mistakes + 1)
      setTimeout(() => setFeedback({ type: null, message: "" }), 2000)
    }
  }

  const toggleHint = () => {
    if (!showHint) {
      setHintsUsed(hintsUsed + 1)
    }
    setShowHint(!showHint)
  }

  const currentLevel = levels[level]

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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/50">
                <Scale className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
              Balance the Scale
            </h1>
            <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
              Learn the golden rule of algebra! Whatever you do to one side, do to the other. Use hints anytime -
              they're here to help you learn!
            </p>
            <div className="mb-6 grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="mb-2 text-2xl font-bold text-green-500">
                  {levels.filter((l) => l.difficulty === "easy").length}
                </div>
                <div className="font-semibold text-foreground">Easy</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="mb-2 text-2xl font-bold text-yellow-500">
                  {levels.filter((l) => l.difficulty === "medium").length}
                </div>
                <div className="font-semibold text-foreground">Medium</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="mb-2 text-2xl font-bold text-red-500">
                  {levels.filter((l) => l.difficulty === "hard").length}
                </div>
                <div className="font-semibold text-foreground">Hard</div>
              </div>
            </div>
            <Button size="lg" onClick={handleStart} className="bg-gradient-to-r from-green-500 to-emerald-500">
              Start Game
            </Button>
          </Card>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Level</div>
                  <div className="text-2xl font-bold text-foreground">
                    {level + 1}/{levels.length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                  <div
                    className={`text-2xl font-bold capitalize ${currentLevel.difficulty === "easy" ? "text-green-500" : currentLevel.difficulty === "medium" ? "text-yellow-500" : "text-red-500"}`}
                  >
                    {currentLevel.difficulty}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Score</div>
                  <div className="text-2xl font-bold text-primary">{score}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Perfect</div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-yellow-500">
                    <Star className="h-5 w-5" />
                    {perfectSolves}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="mb-8 flex items-center justify-center gap-8">
                <div className="relative">
                  <div className="rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 text-3xl font-bold text-foreground shadow-lg">
                    {leftValue}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 h-8 w-1 -translate-x-1/2 bg-gradient-to-b from-green-500 to-transparent" />
                </div>
                <div className="text-4xl font-bold text-green-500">=</div>
                <div className="relative">
                  <div className="rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 text-3xl font-bold text-foreground shadow-lg">
                    {rightValue}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 h-8 w-1 -translate-x-1/2 bg-gradient-to-b from-green-500 to-transparent" />
                </div>
              </div>

              <div className="mb-6 flex items-center justify-center gap-2">
                {currentLevel.steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-12 rounded-full ${index < currentStep ? "bg-green-500" : index === currentStep ? "bg-green-500/50" : "bg-muted"}`}
                  />
                ))}
              </div>

              {feedback.type && (
                <Alert
                  className={`mb-6 ${feedback.type === "correct" ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}
                >
                  <div className="flex items-center gap-2">
                    {feedback.type === "correct" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <AlertDescription className="text-foreground">{feedback.message}</AlertDescription>
                  </div>
                </Alert>
              )}

              {showHint && (
                <Alert className="mb-6 border-blue-500 bg-blue-500/10">
                  <AlertDescription className="text-foreground">
                    💡 Hint: {currentLevel.steps[currentStep].description}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Choose an operation to perform on both sides:</p>
                  <Button variant="outline" size="sm" onClick={toggleHint}>
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("subtract", 5)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Subtract 5
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("subtract", 4)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Subtract 4
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("add", 3)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Add 3
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("subtract", 3)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Subtract 3
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("subtract", 8)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Subtract 8
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("divide", 5)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Divide by 5
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("divide", 3)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Divide by 3
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("divide", 2)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Divide by 2
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("divide", 4)}
                    className="h-16 text-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    Divide by 4
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {gameState === "finished" && (
          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/50">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
              All Levels Complete!
            </h1>
            <div className="mb-6 space-y-2">
              <p className="text-xl text-foreground">
                Final Score: <span className="font-bold text-green-500">{score}</span>
              </p>
              <p className="text-lg text-muted-foreground">
                Perfect Solves:{" "}
                <span className="font-semibold text-yellow-500">
                  {perfectSolves}/{levels.length}
                </span>
              </p>
              <p className="text-lg text-muted-foreground">
                Hints Used: <span className="font-semibold text-blue-500">{hintsUsed}</span>
              </p>
            </div>
            <p className="mb-8 text-muted-foreground">
              You earned {score + perfectSolves * 20 + Math.floor((1 - mistakes / levels.length) * 50)} XP!
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleStart} className="bg-gradient-to-r from-green-500 to-emerald-500">
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
