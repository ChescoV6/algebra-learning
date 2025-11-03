"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, CheckCircle2, Play, Star, Trophy } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { curriculum } from "@/lib/curriculum"
import { useProgress } from "@/lib/progress-context"
import { Watermark } from "@/components/watermark"

export default function TopicDetailPage() {
  const params = useParams()
  const topicId = params.topicId as string
  const { progress } = useProgress()

  const topic = curriculum.find((t) => t.id === topicId)

  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Topic not found</h1>
          <Button asChild className="mt-4">
            <Link href="/topics">Back to Topics</Link>
          </Button>
        </div>
      </div>
    )
  }

  const topicProgress = progress.topics[topicId] || {}
  const completedLessons = topic.lessons.filter((lesson) => topicProgress[lesson.id]?.completed).length
  const progressPercentage = (completedLessons / topic.lessons.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/topics">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topics
          </Link>
        </Button>

        {/* Topic Header */}
        <div className="mb-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-4xl">
              {topic.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-balance text-3xl font-bold text-foreground">{topic.title}</h1>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{topic.description}</p>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="overflow-hidden p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Your Progress</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {completedLessons}/{topic.lessons.length} lessons
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            {progressPercentage === 100 && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                <Star className="h-4 w-4" />
                <span className="font-medium">Topic Mastered! Great job!</span>
              </div>
            )}
          </Card>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Lessons</h2>
          {topic.lessons.map((lesson, index) => {
            const lessonProgress = topicProgress[lesson.id]
            const isCompleted = lessonProgress?.completed || false
            const score = lessonProgress?.score || 0

            return (
              <Card
                key={lesson.id}
                className="group overflow-hidden p-6 transition-all hover:shadow-xl hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted-foreground/20">
                        <span className="text-sm font-semibold text-muted-foreground">{index + 1}</span>
                      </div>
                    )}
                  </div>

                  {/* Lesson Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{lesson.description}</p>
                      </div>
                      {isCompleted && (
                        <Badge variant={score >= 90 ? "default" : "secondary"} className="ml-4 flex-shrink-0">
                          {score}%
                        </Badge>
                      )}
                    </div>

                    {/* Lesson Meta */}
                    <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        <span>{lesson.practice.problems.length} problems</span>
                      </div>
                      {lessonProgress?.attempts && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{lessonProgress.attempts} attempts</span>
                        </div>
                      )}
                    </div>

                    <Button asChild className="gap-2">
                      <Link href={`/topics/${topicId}/${lesson.id}`}>
                        <Play className="h-4 w-4" />
                        {isCompleted ? "Review Lesson" : "Start Lesson"}
                      </Link>
                    </Button>
                  </div>
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
