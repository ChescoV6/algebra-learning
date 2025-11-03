"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, Trophy, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { curriculum } from "@/lib/curriculum"
import { useProgress } from "@/lib/progress-context"
import { Watermark } from "@/components/watermark"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const topicId = params.topicId as string
  const lessonId = params.lessonId as string
  const { progress, updateLessonProgress, addXP, addBadge } = useProgress()

  const [currentStep, setCurrentStep] = useState<"learn" | "practice">("learn")
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showHint, setShowHint] = useState(0)
  const [feedback, setFeedback] = useState<{ type: "correct" | "incorrect" | null; message: string }>({
    type: null,
    message: "",
  })
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const topic = curriculum.find((t) => t.id === topicId)
  const lesson = topic?.lessons.find((l) => l.id === lessonId)

  if (!topic || !lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Lesson not found</h1>
          <Button asChild className="mt-4">
            <Link href="/topics">Back to Topics</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleStartPractice = () => {
    setCurrentStep("practice")
    setCurrentProblem(0)
    setUserAnswer("")
    setShowHint(0)
    setFeedback({ type: null, message: "" })
    setScore(0)
    setAttempts(0)
  }

  const handleSubmitAnswer = () => {
    const problem = lesson.practice.problems[currentProblem]
    const isCorrect = userAnswer.trim().toLowerCase() === problem.answer.toLowerCase()

    setAttempts(attempts + 1)

    if (isCorrect) {
      setFeedback({
        type: "correct",
        message: "Correct! Great job! 🎉",
      })
      setScore(score + 1)

      // Add XP based on hints used
      const xpEarned = showHint === 0 ? 15 : showHint === 1 ? 10 : 5
      addXP(xpEarned)
    } else {
      setFeedback({
        type: "incorrect",
        message: `Not quite. The correct answer is ${problem.answer}. Try the next one!`,
      })
    }
  }

  const handleNextProblem = () => {
    if (currentProblem < lesson.practice.problems.length - 1) {
      setCurrentProblem(currentProblem + 1)
      setUserAnswer("")
      setShowHint(0)
      setFeedback({ type: null, message: "" })
    } else {
      // Lesson complete
      const finalScore = Math.round((score / lesson.practice.problems.length) * 100)
      updateLessonProgress(topicId, lessonId, finalScore)

      // Award badges
      if (finalScore === 100) {
        addBadge(`${topicId}-${lessonId}-perfect`)
      }
      if (finalScore >= 70) {
        addBadge(`${topicId}-${lessonId}-complete`)
      }

      setCurrentStep("learn")
      router.push(`/topics/${topicId}`)
    }
  }

  const handleShowHint = () => {
    if (showHint < 3) {
      setShowHint(showHint + 1)
    }
  }

  const problem = lesson.practice.problems[currentProblem]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/topics/${topicId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {topic.title}
          </Link>
        </Button>

        {currentStep === "learn" && (
          <div className="space-y-6">
            {/* Lesson Header */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8">
              <div className="relative">
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <Badge variant="secondary">{lesson.duration} minutes</Badge>
                </div>
                <h1 className="text-balance text-3xl font-bold text-foreground">{lesson.title}</h1>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{lesson.description}</p>
              </div>
            </div>

            {/* Explanation Card */}
            <Card className="overflow-hidden">
              <div className="border-b border-border bg-muted/30 px-6 py-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Explanation
                </h2>
              </div>
              <div className="p-6">
                <p className="text-lg leading-relaxed text-foreground">{lesson.content.explanation}</p>
              </div>
            </Card>

            {/* Examples Card */}
            <Card className="overflow-hidden">
              <div className="border-b border-border bg-muted/30 px-6 py-4">
                <h2 className="text-xl font-semibold text-foreground">Worked Examples</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {lesson.content.examples.map((example, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <span className="text-lg font-semibold text-foreground">Problem: {example.problem}</span>
                      </div>
                      <div className="mb-4 rounded-lg bg-background/50 p-4">
                        <span className="text-sm font-semibold text-muted-foreground">Solution: </span>
                        <span className="text-lg font-bold text-primary">{example.solution}</span>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-foreground">Step-by-Step:</div>
                        {example.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex gap-3 rounded-lg bg-background/50 p-3">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                              {stepIndex + 1}
                            </div>
                            <span className="leading-relaxed text-foreground">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Key Points Card */}
            <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="border-b border-border bg-primary/10 px-6 py-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                  <Trophy className="h-5 w-5 text-primary" />
                  Key Points to Remember
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {lesson.content.keyPoints.map((point, index) => (
                    <li key={index} className="flex gap-3 rounded-lg bg-background/50 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="leading-relaxed text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Start Practice Button */}
            <div className="flex justify-center pt-4">
              <Button size="lg" onClick={handleStartPractice} className="gap-2">
                <Sparkles className="h-5 w-5" />
                Start Practice Problems
              </Button>
            </div>
          </div>
        )}

        {currentStep === "practice" && (
          <div className="space-y-6">
            {/* Practice Header */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
              <h1 className="mb-4 text-balance text-3xl font-bold text-foreground">Practice: {lesson.title}</h1>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Problem {currentProblem + 1} of {lesson.practice.problems.length}
                </span>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Score: {score}/{lesson.practice.problems.length}
                  </span>
                </div>
              </div>
              <Progress value={((currentProblem + 1) / lesson.practice.problems.length) * 100} className="h-3" />
            </div>

            {/* Problem Card */}
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="mb-6 text-2xl font-semibold text-foreground">{problem.question}</h2>
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

              {/* Feedback */}
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

              {/* Hints */}
              {!feedback.type && showHint > 0 && (
                <Card className="mb-6 border-accent bg-gradient-to-br from-accent/10 to-accent/5 p-5">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
                    <div className="space-y-3">
                      {showHint >= 1 && problem.hint1 && (
                        <p className="leading-relaxed text-foreground">
                          <span className="font-semibold text-accent">Hint 1:</span> {problem.hint1}
                        </p>
                      )}
                      {showHint >= 2 && problem.hint2 && (
                        <p className="leading-relaxed text-foreground">
                          <span className="font-semibold text-accent">Hint 2:</span> {problem.hint2}
                        </p>
                      )}
                      {showHint >= 3 && problem.hint3 && (
                        <p className="leading-relaxed text-foreground">
                          <span className="font-semibold text-accent">Hint 3:</span> {problem.hint3}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!feedback.type && (
                  <>
                    <Button onClick={handleSubmitAnswer} disabled={!userAnswer.trim()} size="lg">
                      Submit Answer
                    </Button>
                    {showHint < 3 && (
                      <Button variant="outline" onClick={handleShowHint} size="lg" className="gap-2 bg-transparent">
                        <Lightbulb className="h-4 w-4" />
                        Show Hint {showHint + 1}
                      </Button>
                    )}
                  </>
                )}
                {feedback.type && (
                  <Button onClick={handleNextProblem} size="lg">
                    {currentProblem < lesson.practice.problems.length - 1 ? "Next Problem" : "Finish Lesson"}
                  </Button>
                )}
              </div>
            </Card>

            {/* Completion Card */}
            {currentProblem === lesson.practice.problems.length - 1 && feedback.type && (
              <Card className="border-primary bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                    <Trophy className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Lesson Complete!</h3>
                    <p className="mt-1 text-muted-foreground">
                      You scored {Math.round((score / lesson.practice.problems.length) * 100)}% on this lesson.
                      {Math.round((score / lesson.practice.problems.length) * 100) >= 70 && " Keep up the great work!"}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
      <Watermark />
    </div>
  )
}
