"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb, CheckCircle2, Zap, TrendingUp, RotateCcw, BookOpen } from "lucide-react"
import { generateProblem, problemTypes, type ProblemType, type GeneratedProblem } from "@/lib/problem-generator"
import { useProgress } from "@/lib/progress-context"
import { InteractiveEquationSolver } from "@/components/interactive-equation-solver"
import { Watermark } from "@/components/watermark"

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
  const [showInteractiveSolver, setShowInteractiveSolver] = useState(false)

  const handleStartPractice = () => {
    const problem = generateProblem(selectedType, difficulty)
    setCurrentProblem(problem)
    setUserAnswer("")
    setShowHint(0)
    setFeedback({ type: null, message: "" })
    setShowSteps(false)
    setShowInteractiveSolver(false)
  }

  const handleSubmitAnswer = () => {
    if (!currentProblem) return

    const isCorrect =
      userAnswer.trim().toLowerCase().replace(/\s/g, "") === currentProblem.answer.toLowerCase().replace(/\s/g, "")

    if (isCorrect) {
      setFeedback({
        type: "correct",
        message: "Excellent work! You got it right! 🎉",
      })
      setStats((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
        streak: prev.streak + 1,
      }))

      const baseXP = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15
      const hintPenalty = showHint * 2
      const xpEarned = Math.max(baseXP - hintPenalty, 1)
      addXP(xpEarned)
    } else {
      setFeedback({
        type: "incorrect",
        message: `Not quite right. The correct answer is ${currentProblem.answer}. Let's learn from this!`,
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
    setShowInteractiveSolver(false)
  }

  const createInteractiveSolverData = () => {
    if (!currentProblem) return null

    const steps = currentProblem.steps.map((step, i) => ({
      equation: i === 0 ? currentProblem.question : step,
      explanation: step,
      highlight: i === currentProblem.steps.length - 1 ? "This is your final answer!" : undefined,
    }))

    return {
      problem: currentProblem.question,
      steps,
      answer: currentProblem.answer,
    }
  }

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fade-in-up">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Fast Practice Mode</span>
          </div>
          <h1 className="text-balance text-5xl font-bold text-foreground">Quick Practice</h1>
          <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
            Generate unlimited practice problems. Choose your topic and difficulty level to master algebra!
          </p>
        </div>

        {stats.total > 0 && (
          <Card className="mb-8 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 shadow-lg animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground">Accuracy</div>
                    <div className="mt-1 text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {accuracy}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground">Correct</div>
                    <div className="mt-1 text-3xl font-bold text-green-500">
                      {stats.correct}/{stats.total}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground">Streak</div>
                    <div className="mt-1 flex items-center justify-center gap-2 text-3xl font-bold text-accent">
                      {stats.streak > 0 && <Zap className="h-6 w-6 animate-pulse-subtle" />}
                      {stats.streak}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
              {stats.streak >= 5 && (
                <div className="mt-4 rounded-lg bg-accent/10 p-3 text-center text-sm font-semibold text-accent animate-bounce-in">
                  🔥 Amazing! You're on a {stats.streak} problem streak!
                </div>
              )}
              {accuracy === 100 && stats.total >= 5 && (
                <div className="mt-4 rounded-lg bg-green-500/10 p-3 text-center text-sm font-semibold text-green-600 dark:text-green-400 animate-bounce-in">
                  ⭐ Perfect score! You're mastering this!
                </div>
              )}
            </div>
          </Card>
        )}

        {!currentProblem ? (
          <Card className="overflow-hidden shadow-xl animate-scale-in">
            <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 px-8 py-6">
              <h2 className="text-2xl font-bold text-foreground">Setup Your Practice</h2>
              <p className="mt-1 text-muted-foreground">Choose what you want to practice and start learning!</p>
            </div>
            <div className="p-8">
              <div className="space-y-8">
                <div>
                  <label className="mb-3 block text-sm font-bold text-foreground">Problem Type</label>
                  <Select value={selectedType} onValueChange={(value) => setSelectedType(value as ProblemType)}>
                    <SelectTrigger className="h-auto py-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {problemTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id} className="py-3">
                          <div>
                            <div className="font-semibold">{type.name}</div>
                            <div className="text-xs text-muted-foreground">Example: {type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-foreground">Difficulty Level</label>
                  <div className="grid grid-cols-3 gap-4">
                    {(["easy", "medium", "hard"] as const).map((level) => (
                      <Button
                        key={level}
                        variant={difficulty === level ? "default" : "outline"}
                        onClick={() => setDifficulty(level)}
                        className="h-auto py-4 capitalize text-base font-semibold transition-all hover:scale-105"
                        size="lg"
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {difficulty === "easy" && "Perfect for beginners - smaller numbers and simpler problems"}
                    {difficulty === "medium" && "Good challenge - larger numbers and more steps"}
                    {difficulty === "hard" && "Advanced practice - complex problems for mastery"}
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2 py-6 text-lg shadow-lg hover:shadow-xl animate-pulse-subtle"
                  onClick={handleStartPractice}
                >
                  <Zap className="h-6 w-6" />
                  Start Practice
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="overflow-hidden shadow-xl animate-scale-in">
            <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 px-8 py-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="capitalize px-4 py-1 text-sm font-semibold">
                  {difficulty}
                </Badge>
                <Badge variant="outline" className="px-4 py-1 text-sm font-semibold">
                  {problemTypes.find((t) => t.id === selectedType)?.name}
                </Badge>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <h2 className="mb-6 text-3xl font-bold text-foreground">{currentProblem.question}</h2>
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
                  className="text-xl py-6"
                />
              </div>

              {feedback.type && (
                <Alert
                  className={`mb-6 border-2 ${feedback.type === "correct" ? "border-green-500 bg-green-500/10" : "border-orange-500 bg-orange-500/10"} animate-bounce-in`}
                >
                  <div className="flex items-center gap-3">
                    {feedback.type === "correct" ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <Lightbulb className="h-6 w-6 text-orange-500" />
                    )}
                    <AlertDescription className="text-lg font-semibold text-foreground">
                      {feedback.message}
                    </AlertDescription>
                  </div>
                </Alert>
              )}

              {!feedback.type && showHint > 0 && (
                <Card className="mb-6 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 p-6 animate-slide-up">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-1 h-7 w-7 flex-shrink-0 text-accent animate-pulse-subtle" />
                    <div className="space-y-3">
                      {showHint >= 1 && (
                        <p className="text-base leading-relaxed text-foreground">
                          <span className="font-bold text-accent">Hint 1:</span> {currentProblem.hint1}
                        </p>
                      )}
                      {showHint >= 2 && (
                        <p className="text-base leading-relaxed text-foreground">
                          <span className="font-bold text-accent">Hint 2:</span> {currentProblem.hint2}
                        </p>
                      )}
                      {showHint >= 3 && (
                        <p className="text-base leading-relaxed text-foreground">
                          <span className="font-bold text-accent">Hint 3:</span> {currentProblem.hint3}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {!feedback.type && !showInteractiveSolver && (
                <Button
                  variant="outline"
                  onClick={() => setShowInteractiveSolver(true)}
                  className="mb-4 w-full gap-2 bg-transparent"
                >
                  <BookOpen className="h-4 w-4" />
                  Show Interactive Step-by-Step Solution
                </Button>
              )}

              {!feedback.type && showInteractiveSolver && createInteractiveSolverData() && (
                <div className="mb-6">
                  <InteractiveEquationSolver {...createInteractiveSolverData()!} />
                </div>
              )}

              {showSteps && (
                <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 animate-fade-in">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Solution Steps - Learn from this!
                  </h3>
                  <div className="space-y-3">
                    {currentProblem.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-lg bg-background/50 p-4 text-base text-foreground animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg bg-accent/10 p-3 text-sm text-accent">
                    💡 Review these steps carefully to understand the solution process!
                  </div>
                </Card>
              )}

              <div className="flex gap-4">
                {!feedback.type && (
                  <>
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!userAnswer.trim()}
                      size="lg"
                      className="flex-1 shadow-lg"
                    >
                      Submit Answer
                    </Button>
                    {showHint < 3 && (
                      <Button variant="outline" onClick={handleShowHint} size="lg" className="gap-2 bg-transparent">
                        <Lightbulb className="h-5 w-5" />
                        Hint {showHint + 1}
                      </Button>
                    )}
                  </>
                )}
                {feedback.type && (
                  <Button onClick={handleNextProblem} size="lg" className="w-full gap-2 shadow-lg">
                    <TrendingUp className="h-5 w-5" />
                    Next Problem
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
      <Watermark />
    </div>
  )
}
