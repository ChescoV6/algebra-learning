"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LessonProgress {
  completed: boolean
  score: number
  attempts: number
  lastAttempt: string
}

interface TopicProgress {
  [lessonId: string]: LessonProgress
}

interface ProgressData {
  topics: {
    [topicId: string]: TopicProgress
  }
  xp: number
  badges: string[]
  streak: number
  lastActive: string
}

interface ProgressContextType {
  progress: ProgressData
  updateLessonProgress: (topicId: string, lessonId: string, score: number) => void
  addXP: (amount: number) => void
  addBadge: (badgeId: string) => void
  exportProgress: () => string
  importProgress: (data: string) => boolean
  resetProgress: () => void
}

const defaultProgress: ProgressData = {
  topics: {},
  xp: 0,
  badges: [],
  streak: 0,
  lastActive: new Date().toISOString(),
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress)

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lunex-progress")
    if (saved) {
      try {
        setProgress(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load progress:", e)
      }
    }
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("lunex-progress", JSON.stringify(progress))
  }, [progress])

  const updateLessonProgress = (topicId: string, lessonId: string, score: number) => {
    setProgress((prev) => {
      const topicProgress = prev.topics[topicId] || {}
      const lessonProgress = topicProgress[lessonId] || { completed: false, score: 0, attempts: 0, lastAttempt: "" }

      return {
        ...prev,
        topics: {
          ...prev.topics,
          [topicId]: {
            ...topicProgress,
            [lessonId]: {
              completed: score >= 70,
              score: Math.max(score, lessonProgress.score),
              attempts: lessonProgress.attempts + 1,
              lastAttempt: new Date().toISOString(),
            },
          },
        },
        lastActive: new Date().toISOString(),
      }
    })
  }

  const addXP = (amount: number) => {
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }))
  }

  const addBadge = (badgeId: string) => {
    setProgress((prev) => {
      if (prev.badges.includes(badgeId)) return prev
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
      }
    })
  }

  const exportProgress = () => {
    return JSON.stringify(progress)
  }

  const importProgress = (data: string) => {
    try {
      const imported = JSON.parse(data)
      setProgress(imported)
      return true
    } catch (e) {
      console.error("Failed to import progress:", e)
      return false
    }
  }

  const resetProgress = () => {
    setProgress(defaultProgress)
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateLessonProgress,
        addXP,
        addBadge,
        exportProgress,
        importProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider")
  }
  return context
}
