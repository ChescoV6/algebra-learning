"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain, Trophy, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import { generateProblem } from "@/lib/problem-generator"
import { useProgress } from "@/lib/progress-context"

interface MemoryCard {
  id: number
  content: string
  type: "question" | "answer"
  pairId: number
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryMatchPage() {
  const { addXP } = useProgress()
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu")
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [perfectMatches, setPerfectMatches] = useState(0)
  const [comboStreak, setComboStreak] = useState(0)

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameState])

  const initializeGame = (selectedDifficulty: "easy" | "medium" | "hard") => {
    const cardCount = selectedDifficulty === "easy" ? 4 : selectedDifficulty === "medium" ? 6 : 8
    const problemDifficulty =
      selectedDifficulty === "easy" ? "easy" : selectedDifficulty === "medium" ? "medium" : "hard"

    const problems = Array.from({ length: cardCount }, (_, i) => ({
      id: i,
      problem: generateProblem("one-step-add-sub", problemDifficulty),
    }))

    const gameCards: MemoryCard[] = []
    problems.forEach((p, i) => {
      gameCards.push({
        id: i * 2,
        content: p.problem.question,
        type: "question",
        pairId: i,
        isFlipped: false,
        isMatched: false,
      })
      gameCards.push({
        id: i * 2 + 1,
        content: p.problem.answer,
        type: "answer",
        pairId: i,
        isFlipped: false,
        isMatched: false,
      })
    })

    const shuffled = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setTimeElapsed(0)
    setPerfectMatches(0)
    setComboStreak(0)
    setDifficulty(selectedDifficulty)
    setGameState("playing")
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return
    if (flippedCards.includes(cardId)) return
    if (cards.find((c) => c.id === cardId)?.isMatched) return

    const newFlipped = [...flippedCards, cardId]
    setFlippedCards(newFlipped)

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const card1 = cards.find((c) => c.id === newFlipped[0])
      const card2 = cards.find((c) => c.id === newFlipped[1])

      if (card1 && card2 && card1.pairId === card2.pairId) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === card1.id || card.id === card2.id ? { ...card, isMatched: true } : card)),
          )
          setFlippedCards([])
          setMatches(matches + 1)
          setComboStreak(comboStreak + 1)

          if (moves === matches) {
            setPerfectMatches(perfectMatches + 1)
          }

          const totalPairs = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8
          if (matches + 1 === totalPairs) {
            setGameState("finished")
            const baseXP = 50
            const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2
            const moveBonus = Math.max(100 - moves * 2, 0)
            const timeBonus = Math.max(100 - timeElapsed, 0)
            const perfectBonus = perfectMatches * 20
            const totalXP = Math.floor((baseXP + moveBonus + timeBonus + perfectBonus) * difficultyMultiplier)
            addXP(totalXP)
          }
        }, 500)
      } else {
        setComboStreak(0)
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === card1?.id || card.id === card2?.id ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const cardCount = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8

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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent">
              Memory Match
            </h1>
            <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
              Flip cards to find matching equations and answers! Take your time and remember where cards are. Choose
              your difficulty!
            </p>

            <div className="mb-6 space-y-3">
              <Button
                size="lg"
                onClick={() => initializeGame("easy")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <Star className="mr-2 h-5 w-5" />
                Easy (4 Pairs)
              </Button>
              <Button
                size="lg"
                onClick={() => initializeGame("medium")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Medium (6 Pairs)
              </Button>
              <Button
                size="lg"
                onClick={() => initializeGame("hard")}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500"
              >
                <Trophy className="mr-2 h-5 w-5" />
                Hard (8 Pairs)
              </Button>
            </div>
          </Card>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Moves</div>
                  <div className="text-2xl font-bold text-foreground">{moves}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Matches</div>
                  <div className="text-2xl font-bold text-purple-500">
                    {matches}/{cardCount}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div className="text-2xl font-bold text-foreground">
                    {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Combo</div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-pink-500">
                    <Sparkles className={`h-5 w-5 ${comboStreak > 0 ? "animate-pulse" : ""}`} />
                    {comboStreak}
                  </div>
                </div>
              </div>
            </Card>

            <div
              className={`grid gap-4 ${difficulty === "easy" ? "grid-cols-2 sm:grid-cols-3" : difficulty === "medium" ? "grid-cols-3" : "grid-cols-3 sm:grid-cols-4"}`}
            >
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.isMatched || card.isFlipped}
                  className={`group relative aspect-square rounded-lg border-2 p-4 text-center font-semibold transition-all duration-300 ${
                    card.isMatched
                      ? "scale-95 border-green-500 bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-500 shadow-lg shadow-green-500/50"
                      : card.isFlipped
                        ? "scale-105 border-purple-500 bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-foreground shadow-lg shadow-purple-500/30"
                        : "border-border bg-card text-transparent hover:scale-105 hover:border-purple-500 hover:shadow-lg"
                  }`}
                >
                  <div
                    className={`flex h-full items-center justify-center text-sm transition-all duration-300 ${card.isFlipped || card.isMatched ? "rotate-0" : "rotate-y-180"}`}
                  >
                    {card.isFlipped || card.isMatched ? card.content : "?"}
                  </div>
                  {card.isMatched && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 animate-pulse text-green-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === "finished" && (
          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent">
              Congratulations!
            </h1>
            <div className="mb-6 space-y-2">
              <p className="text-xl text-foreground">
                Completed in <span className="font-bold text-purple-500">{moves}</span> moves
              </p>
              <p className="text-lg text-muted-foreground">
                Time:{" "}
                <span className="font-semibold text-foreground">
                  {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
                </span>
              </p>
              <p className="text-lg text-muted-foreground">
                Perfect Matches: <span className="font-semibold text-green-500">{perfectMatches}</span>
              </p>
              <p className="text-lg text-muted-foreground">
                Difficulty: <span className="font-semibold text-pink-500 capitalize">{difficulty}</span>
              </p>
            </div>
            <p className="mb-8 text-muted-foreground">
              You earned{" "}
              {Math.floor(
                (50 + Math.max(100 - moves * 2, 0) + Math.max(100 - timeElapsed, 0) + perfectMatches * 20) *
                  (difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2),
              )}{" "}
              XP!
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => initializeGame(difficulty)}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
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
