"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle2, Lock, Sparkles, Trophy } from "lucide-react"
import Link from "next/link"
import { curriculum } from "@/lib/curriculum"
import { useProgress } from "@/lib/progress-context"
import { Watermark } from "@/components/watermark"

export default function TopicsPage() {
  const { progress } = useProgress()

  const getTopicProgress = (topicId: string) => {
    const topicData = progress.topics[topicId]
    if (!topicData) return 0

    const topic = curriculum.find((t) => t.id === topicId)
    if (!topic) return 0

    const completedLessons = topic.lessons.filter((lesson) => topicData[lesson.id]?.completed).length
    return (completedLessons / topic.lessons.length) * 100
  }

  const isTopicUnlocked = (index: number) => {
    if (index === 0) return true
    const previousTopic = curriculum[index - 1]
    const previousProgress = getTopicProgress(previousTopic.id)
    return previousProgress >= 70 // Need 70% completion to unlock next topic
  }

  const totalCompleted = curriculum.reduce((sum, topic) => {
    const completed = topic.lessons.filter((lesson) => progress.topics[topic.id]?.[lesson.id]?.completed).length
    return sum + completed
  }, 0)

  const totalLessons = curriculum.reduce((sum, topic) => sum + topic.lessons.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-balance text-4xl font-bold text-foreground">Your Learning Path</h1>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                Master algebra step by step. Complete 70% of a topic to unlock the next one.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{progress.xp}</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <Card className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Overall Progress</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {totalCompleted}/{totalLessons} lessons completed
              </span>
            </div>
            <Progress value={(totalCompleted / totalLessons) * 100} className="h-3" />
          </Card>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((topic, index) => {
            const topicProgress = getTopicProgress(topic.id)
            const isUnlocked = isTopicUnlocked(index)
            const completedLessons = topic.lessons.filter(
              (lesson) => progress.topics[topic.id]?.[lesson.id]?.completed,
            ).length

            return (
              <Card
                key={topic.id}
                className={`group relative overflow-hidden p-6 transition-all ${
                  isUnlocked ? "hover:shadow-xl hover:border-primary/50" : "opacity-60"
                }`}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-3xl transition-transform group-hover:scale-110">
                      {topic.icon}
                    </div>
                    {!isUnlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                    {isUnlocked && topicProgress === 100 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>

                  <h2 className="mb-2 text-xl font-semibold text-foreground">{topic.title}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">
                        {completedLessons}/{topic.lessons.length} lessons
                      </span>
                    </div>
                    <Progress value={topicProgress} className="h-2" />
                  </div>

                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{topic.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{topic.lessons.reduce((sum, l) => sum + l.duration, 0)} min</span>
                    </div>
                  </div>

                  <Button asChild className="w-full" disabled={!isUnlocked}>
                    <Link href={`/topics/${topic.id}`}>{isUnlocked ? "Start Learning" : "Locked"}</Link>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
      <Watermark />
    </div>
  )
}
