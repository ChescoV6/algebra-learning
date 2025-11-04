"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle2, Lock, Sparkles, Trophy, Star, TrendingUp } from "lucide-react"
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
    return previousProgress >= 70
  }

  const totalCompleted = curriculum.reduce((sum, topic) => {
    const completed = topic.lessons.filter((lesson) => progress.topics[topic.id]?.[lesson.id]?.completed).length
    return sum + completed
  }, 0)

  const totalLessons = curriculum.reduce((sum, topic) => sum + topic.lessons.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="animate-fade-in-up">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Your Learning Journey</span>
              </div>
              <h1 className="text-balance text-5xl font-bold text-foreground">Learning Path</h1>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
                Master algebra step by step. Complete 70% of a topic to unlock the next one.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Trophy className="h-9 w-9 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{progress.xp}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
            </div>
          </div>

          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 shadow-lg">
            <div className="p-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-foreground">Overall Progress</span>
                    <p className="text-sm text-muted-foreground">Keep up the great work!</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-foreground">
                    {totalCompleted}/{totalLessons}
                  </span>
                  <p className="text-sm text-muted-foreground">lessons completed</p>
                </div>
              </div>
              <Progress value={(totalCompleted / totalLessons) * 100} className="h-4 shadow-inner" />
              <p className="mt-3 text-center text-sm font-semibold text-primary">
                {Math.round((totalCompleted / totalLessons) * 100)}% Complete
              </p>
            </div>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((topic, index) => {
            const topicProgress = getTopicProgress(topic.id)
            const isUnlocked = isTopicUnlocked(index)
            const completedLessons = topic.lessons.filter(
              (lesson) => progress.topics[topic.id]?.[lesson.id]?.completed,
            ).length

            return (
              <Card
                key={topic.id}
                className={`group relative overflow-hidden p-8 transition-all duration-300 ${
                  isUnlocked
                    ? "hover:scale-105 hover:shadow-2xl hover:border-primary/50 animate-fade-in-up"
                    : "opacity-60"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-4xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl">
                      {topic.icon}
                    </div>
                    {!isUnlocked && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    {isUnlocked && topicProgress === 100 && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 shadow-lg animate-bounce-in">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </div>
                    )}
                  </div>

                  <h2 className="mb-3 text-2xl font-bold text-foreground">{topic.title}</h2>
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground">{topic.description}</p>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-muted-foreground">Progress</span>
                      <span className="font-bold text-foreground">
                        {completedLessons}/{topic.lessons.length} lessons
                      </span>
                    </div>
                    <Progress value={topicProgress} className="h-3 shadow-inner" />
                    {topicProgress > 0 && (
                      <p className="text-center text-xs font-semibold text-primary">
                        {Math.round(topicProgress)}% Complete
                      </p>
                    )}
                  </div>

                  <div className="mb-6 flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      <span className="font-medium">{topic.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-medium">{topic.lessons.reduce((sum, l) => sum + l.duration, 0)} min</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full shadow-lg transition-all hover:shadow-xl"
                    disabled={!isUnlocked}
                    size="lg"
                  >
                    <Link href={`/topics/${topic.id}`}>
                      {isUnlocked ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          {topicProgress > 0 ? "Continue Learning" : "Start Learning"}
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Locked
                        </>
                      )}
                    </Link>
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
