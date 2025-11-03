"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb, CheckCircle2, XCircle, Zap, TrendingUp, RotateCcw } from "lucide-react"
import { generateProblem, problemTypes, type ProblemType, type GeneratedProblem } from "@/lib/problem-generator"
import { useProgress } from "@/lib/progress-context"

export default function QuickPracticePage() {
  const { addXP } = useProgress()
  const [selectedType, setSelectedType] = useState<ProblemType>("one-step-add-sub")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [currentProblem, setCurrentProblem] = useState<GeneratedProblem | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [showHint, setShowHint] = useState(0)
  const [feedback, setFeedback] = useState<{ type: "correct" | "incorrect" | null; message: string }>({
    type: null,
    message: "",
  })
  const [stats, setStats] = useState({ correct: 0, total: 0, streak: 0 })
  const [showSteps, setShowSteps] = useState(false)

  const handleStartPractice = () => {
    const problem = generateProblem(selectedType, difficulty)
    setCurrentProblem(problem)
    setUserAnswer("")
    setShowHint(0)
    setFeedback({ type: null, message: "" })
    setShowSteps(false)
  }

  const handleSubmitAnswer = () => {
    if (!currentProblem) return

    const isCorrect =
      userAnswer.trim().toLowerCase().replace(/\s/g, "") === currentProblem.answer.toLowerCase().replace(/\s/g, "")

    if (isCorrect) {
      setFeedback({
        type: "correct",
        message: "Correct! Excellent work!",
      })
      setStats((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
        streak: prev.streak + 1,
      }))

      // Add XP based on difficulty and hints used
      const baseXP = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15
      const hintPenalty = showHint * 2
      const xpEarned = Math.max(baseXP - hintPenalty, 1)
      addXP(xpEarned)
    } else {
      setFeedback({
        type: "incorrect",
        message: `Not quite. The correct answer is ${currentProblem.answer}.`,
      })
      setStats((prev) => ({
        correct: prev.correct,
        total: prev.total + 1,
        streak: 0,
      }))
      setShowSteps(true)
    }
  }

  const handleNextProblem = () => {
    handleStartPractice()
  }

  const handleShowHint = () => {
    if (showHint < 3) {
      setShowHint(showHint + 1)
    }
  }

  const handleReset = () => {
    setStats({ correct: 0, total: 0, streak: 0 })
    setCurrentProblem(null)
    setUserAnswer("")
    setShowHint(0)
    setFeedback({ type: null, message: "" })
    setShowSteps(false)
  }

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-bold text-foreground">Quick Practice</h1>
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
            Generate unlimited practice problems. Choose your topic and difficulty level.
          </p>
        </div>

        {stats.total > 0 && (
          <Card className="mb-6 p-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                  <div className="text-2xl font-bold text-foreground">{accuracy}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                  <div className="text-2xl font-bold text-green-500">
                    {stats.correct}/{stats.total}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Streak</div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-accent">
                    <Zap className="h-5 w-5" />
                    {stats.streak}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </Card>
        )}

        {!currentProblem ? (
          <Card className="p-8">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Setup Your Practice</h2>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Problem Type</label>
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as ProblemType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {problemTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-semibold">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["easy", "medium", "hard"] as const).map((level) => (
                    <Button
                      key={level}
                      variant={difficulty === level ? "default" : "outline"}
                      onClick={() => setDifficulty(level)}
                      className="capitalize"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handleStartPractice}>
                <Zap className="mr-2 h-5 w-5" />
                Start Practice
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <Badge variant="secondary" className="capitalize">
                {difficulty}
              </Badge>
              <Badge variant="outline">{problemTypes.find((t) => t.id === selectedType)?.name}</Badge>
            </div>

            <div className="mb-6">
              <h2 className="mb-4 text-2xl font-semibold text-foreground">{currentProblem.question}</h2>
              <Input
                type="text"
                placeholder="Enter your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !feedback.type) {
                    handleSubmitAnswer()
                  }
                }}
                disabled={feedback.type !== null}
                className="text-lg"
              />
            </div>

            {feedback.type && (
              <Alert className={`mb-6 ${feedback.type === "correct" ? "border-green-500" : "border-red-500"}`}>
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

            {!feedback.type && showHint > 0 && (
              <Card className="mb-6 border-accent bg-accent/5 p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <div className="space-y-2">
                    {showHint >= 1 && (
                      <p className="text-sm leading-relaxed text-foreground">
                        <span className="font-semibold">Hint 1:</span> {currentProblem.hint1}
                      </p>
                    )}
                    {showHint >= 2 && (
                      <p className="text-sm leading-relaxed text-foreground">
                        <span className="font-semibold">Hint 2:</span> {currentProblem.hint2}
                      </p>
                    )}
                    {showHint >= 3 && (
                      <p className="text-sm leading-relaxed text-foreground">
                        <span className="font-semibold">Hint 3:</span> {currentProblem.hint3}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {showSteps && (
              <Card className="mb-6 bg-muted/50 p-4">
                <h3 className="mb-3 font-semibold text-foreground">Solution Steps:</h3>
                <div className="space-y-2">
                  {currentProblem.steps.map((step, index) => (
                    <div key={index} className="flex gap-2 text-sm text-foreground">
                      <span className="font-semibold text-primary">{index + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex gap-3">
              {!feedback.type && (
                <>
                  <Button onClick={handleSubmitAnswer} disabled={!userAnswer.trim()}>
                    Submit Answer
                  </Button>
                  {showHint < 3 && (
                    <Button variant="outline" onClick={handleShowHint}>
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Show Hint {showHint + 1}
                    </Button>
                  )}
                </>
              )}
              {feedback.type && (
                <Button onClick={handleNextProblem}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Next Problem
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
