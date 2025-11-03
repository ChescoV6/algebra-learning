"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Timer, Trophy, Zap, Target } from "lucide-react"
import Link from "next/link"
import { generateProblem, type ProblemType } from "@/lib/problem-generator"
import { useProgress } from "@/lib/progress-context"

export default function SpeedChallengePage() {
  const { addXP } = useProgress()
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu")
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState(generateProblem("one-step-add-sub", "easy"))
  const [options, setOptions] = useState<string[]>([])
  const [accuracy, setAccuracy] = useState(100)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const problemTypes: ProblemType[] = ["one-step-add-sub", "one-step-mult-div", "two-step"]

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("finished")
      const baseXP = score * 3
      const accuracyBonus = Math.floor((accuracy / 100) * score * 2)
      const streakBonus = bestStreak * 5
      addXP(baseXP + accuracyBonus + streakBonus)
    }
  }, [timeLeft, gameState, score, accuracy, bestStreak, addXP])

  const generateOptions = (correctAnswer: string) => {
    const correct = Number.parseInt(correctAnswer)
    const wrongOptions = [
      (correct + Math.floor(Math.random() * 5) + 1).toString(),
      (correct - Math.floor(Math.random() * 5) - 1).toString(),
      (correct + Math.floor(Math.random() * 10) + 5).toString(),
    ]
    return [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5)
  }

  const handleStart = () => {
    setGameState("playing")
    setTimeLeft(60)
    setScore(0)
    setAccuracy(100)
    setTotalAttempts(0)
    setCorrectAnswers(0)
    setStreak(0)
    setBestStreak(0)
    setSelectedOption(null)
    setIsCorrect(null)
    const problem = generateProblem(problemTypes[0], "easy")
    setCurrentProblem(problem)
    setOptions(generateOptions(problem.answer))
  }

  const handleAnswer = (answer: string) => {
    setSelectedOption(answer)
    setTotalAttempts(totalAttempts + 1)

    if (answer === currentProblem.answer) {
      setIsCorrect(true)
      setScore(score + 1)
      setCorrectAnswers(correctAnswers + 1)
      setStreak(streak + 1)
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1)
      }
    } else {
      setIsCorrect(false)
      setStreak(0)
    }

    const newAccuracy = Math.round(
      ((correctAnswers + (answer === currentProblem.answer ? 1 : 0)) / (totalAttempts + 1)) * 100,
    )
    setAccuracy(newAccuracy)

    setTimeout(() => {
      setSelectedOption(null)
      setIsCorrect(null)

      // Generate next problem with increasing difficulty
      const difficulty = score < 10 ? "easy" : score < 20 ? "medium" : "hard"
      const typeIndex = Math.floor(score / 5) % problemTypes.length
      const problem = generateProblem(problemTypes[typeIndex], difficulty)
      setCurrentProblem(problem)
      setOptions(generateOptions(problem.answer))
    }, 400)
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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/50">
                <Timer className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
              Speed Challenge
            </h1>
            <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
              Answer as many questions as possible in 60 seconds! Build streaks and maintain high accuracy for bonus XP.
            </p>
            <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-border bg-card p-3">
                <Zap className="mx-auto mb-2 h-6 w-6 text-yellow-500" />
                <div className="font-semibold text-foreground">Speed Bonus</div>
                <div className="text-muted-foreground">Fast answers = more points</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <Target className="mx-auto mb-2 h-6 w-6 text-green-500" />
                <div className="font-semibold text-foreground">Accuracy Matters</div>
                <div className="text-muted-foreground">Stay accurate for bonus XP</div>
              </div>
            </div>
            <Button size="lg" onClick={handleStart} className="bg-gradient-to-r from-red-500 to-orange-500">
              Start Challenge
            </Button>
          </Card>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="mb-4 grid grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Score</div>
                  <div className="text-3xl font-bold text-foreground">{score}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                  <div
                    className={`text-3xl font-bold ${accuracy >= 80 ? "text-green-500" : accuracy >= 60 ? "text-yellow-500" : "text-red-500"}`}
                  >
                    {accuracy}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Streak</div>
                  <div className="flex items-center gap-1 text-3xl font-bold text-orange-500">
                    <Zap className={`h-6 w-6 ${streak > 0 ? "animate-pulse" : ""}`} />
                    {streak}
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
              <Progress value={(timeLeft / 60) * 100} className={`h-2 ${timeLeft <= 10 ? "animate-pulse" : ""}`} />
            </Card>

            <Card className="p-8">
              <h2 className="mb-8 text-center text-4xl font-bold text-foreground">{currentProblem.question}</h2>
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant="outline"
                    onClick={() => handleAnswer(option)}
                    disabled={selectedOption !== null}
                    className={`h-20 text-2xl transition-all duration-300 ${
                      selectedOption === option
                        ? isCorrect
                          ? "scale-105 border-green-500 bg-green-500/20 text-green-500 shadow-lg shadow-green-500/50"
                          : "scale-95 border-red-500 bg-red-500/20 text-red-500 shadow-lg shadow-red-500/50"
                        : selectedOption !== null
                          ? "opacity-50"
                          : "hover:scale-105 hover:border-primary hover:shadow-lg"
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {gameState === "finished" && (
          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/50">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
              Challenge Complete!
            </h1>
            <div className="mb-6 space-y-2">
              <p className="text-xl text-foreground">
                Final Score: <span className="font-bold text-red-500">{score}</span>
              </p>
              <p className="text-lg text-muted-foreground">
                Accuracy:{" "}
                <span
                  className={`font-semibold ${accuracy >= 80 ? "text-green-500" : accuracy >= 60 ? "text-yellow-500" : "text-red-500"}`}
                >
                  {accuracy}%
                </span>
              </p>
              <p className="text-lg text-muted-foreground">
                Best Streak: <span className="font-semibold text-orange-500">{bestStreak}</span>
              </p>
            </div>
            <p className="mb-8 text-muted-foreground">
              You earned {score * 3 + Math.floor((accuracy / 100) * score * 2) + bestStreak * 5} XP!
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleStart} className="bg-gradient-to-r from-red-500 to-orange-500">
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
