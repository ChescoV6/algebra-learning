"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Zap, Trophy, Brain, Sparkles, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Watermark } from "@/components/watermark"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-3 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-3xl font-bold text-transparent">
                Lunex
              </span>
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Master Every Concept
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                In Algebra
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              From basic equations to advanced functions. Interactive lessons, instant practice, and gamified learning.
              No login required—just pure learning.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full gap-2 sm:w-auto">
                <Link href="/topics">
                  <BookOpen className="h-5 w-5" />
                  Start Learning
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full gap-2 sm:w-auto bg-transparent">
                <Link href="/quick-practice">
                  <Zap className="h-5 w-5" />
                  Quick Practice
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8">
              <div className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="mt-1 text-sm text-muted-foreground">Lessons</div>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-accent">1000+</div>
                <div className="mt-1 text-sm text-muted-foreground">Problems</div>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary">5</div>
                <div className="mt-1 text-sm text-muted-foreground">Mini-Games</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">Built for Modern Learners</h2>
          <p className="mt-3 text-lg text-muted-foreground">Everything you need to excel in algebra</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Instant Access"
            description="No signup, no waiting. Just open and start learning immediately."
            gradient="from-yellow-500/10 to-orange-500/10"
          />
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="Bite-Sized Lessons"
            description="2-5 minute lessons designed for maximum retention and minimal time."
            gradient="from-purple-500/10 to-pink-500/10"
          />
          <FeatureCard
            icon={<Lightbulb className="h-8 w-8" />}
            title="Progressive Hints"
            description="Stuck? Get step-by-step hints that guide without giving away answers."
            gradient="from-blue-500/10 to-cyan-500/10"
          />
          <FeatureCard
            icon={<Target className="h-8 w-8" />}
            title="Adaptive Practice"
            description="Problems adjust to your skill level. Build confidence as you improve."
            gradient="from-green-500/10 to-emerald-500/10"
          />
          <FeatureCard
            icon={<Trophy className="h-8 w-8" />}
            title="Gamified Progress"
            description="Earn XP, unlock badges, and track mastery across all topics."
            gradient="from-amber-500/10 to-yellow-500/10"
          />
          <FeatureCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Complete Curriculum"
            description="From basic equations to advanced algebra. Everything in one place."
            gradient="from-indigo-500/10 to-purple-500/10"
          />
        </div>
      </section>

      {/* Learning Path Preview */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Your Complete Learning Path</h2>
            <p className="mt-3 text-lg text-muted-foreground">Master algebra step by step</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PathCard number="1" title="Foundations" topics="Variables, expressions, order of operations" />
            <PathCard number="2" title="Equations" topics="Linear, multi-step, systems of equations" />
            <PathCard number="3" title="Functions" topics="Linear, quadratic, exponential functions" />
            <PathCard number="4" title="Advanced" topics="Polynomials, radicals, rational expressions" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Join thousands of students
          </div>
          <h2 className="mt-6 text-balance text-3xl font-bold text-foreground sm:text-4xl">Ready to master algebra?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Start your journey today. No credit card, no commitment—just learning.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link href="/topics">
              <BookOpen className="h-5 w-5" />
              Get Started Free
            </Link>
          </Button>
        </div>
      </section>

      <Watermark />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <Card className="group relative overflow-hidden p-6 transition-all hover:shadow-lg">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-100`}
      />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}

function PathCard({ number, title, topics }: { number: string; title: string; topics: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg">
      <div className="absolute right-4 top-4 text-6xl font-bold text-primary/5 transition-all group-hover:scale-110 group-hover:text-primary/10">
        {number}
      </div>
      <div className="relative">
        <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
          {number}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{topics}</p>
      </div>
    </div>
  )
}
