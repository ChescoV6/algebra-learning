"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Lightbulb, CheckCircle2 } from "lucide-react"

interface Step {
  equation: string
  explanation: string
  highlight?: string
}

interface InteractiveEquationSolverProps {
  problem: string
  steps: Step[]
  answer: string
}

export function InteractiveEquationSolver({ problem, steps, answer }: InteractiveEquationSolverProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowAnswer(true)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setShowAnswer(false)
  }

  return (
    <Card className="overflow-hidden border-primary/20">
      <div className="border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Interactive Solution</h3>
          <Badge variant="secondary">
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        {/* Problem Display */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
          <div className="mb-2 text-sm font-medium text-muted-foreground">Original Problem</div>
          <div className="text-2xl font-bold text-foreground">{problem}</div>
        </div>

        {/* Current Step */}
        <div className="mb-6 space-y-4">
          {steps.slice(0, currentStep + 1).map((step, index) => (
            <div
              key={index}
              className={`animate-fade-in rounded-xl border-2 p-5 transition-all ${
                index === currentStep
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border bg-background/50 opacity-70"
              }`}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                {index < currentStep && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </div>
              <div className="mb-3 rounded-lg bg-background/80 p-4 text-center">
                <div className="text-xl font-bold text-foreground">{step.equation}</div>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <p className="leading-relaxed text-foreground">{step.explanation}</p>
              </div>
              {step.highlight && (
                <div className="mt-3 rounded-lg bg-accent/10 p-3 text-sm text-accent">{step.highlight}</div>
              )}
            </div>
          ))}
        </div>

        {/* Answer Display */}
        {showAnswer && (
          <div className="animate-fade-in mb-6 rounded-xl border-2 border-green-500 bg-green-500/10 p-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">Final Answer</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{answer}</div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3">
          {!showAnswer ? (
            <Button onClick={handleNextStep} className="flex-1 gap-2">
              {currentStep < steps.length - 1 ? "Next Step" : "Show Answer"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
              Start Over
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
