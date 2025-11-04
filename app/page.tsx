"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Zap, Trophy, Brain, Sparkles, Target, Lightbulb, Star, Rocket } from "lucide-react"
import Link from "next/link"
import { Watermark } from "@/components/watermark"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)] animate-pulse-slow" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-3 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-primary animate-gradient">
                <Sparkles className="h-7 w-7 text-white animate-pulse-slow" />
              </div>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-4xl font-bold text-transparent animate-gradient">
                Lunex
              </span>
            </div>

            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Master Every Concept
              <span className="mt-2 block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                In Algebra
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
              From basic equations to advanced functions. Interactive lessons, instant practice, and gamified learning.
              <span className="block mt-2 font-semibold text-foreground">No login required—just pure learning.</span>
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group w-full gap-2 sm:w-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <Link href="/topics">
                  <BookOpen className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Start Learning
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group w-full gap-2 sm:w-auto bg-background/50 backdrop-blur-sm hover:bg-background hover:border-accent transition-all"
              >
                <Link href="/quick-practice">
                  <Zap className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
                  Quick Practice
                </Link>
              </Button>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-8">
              <div className="group rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/50 hover:shadow-lg">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  50+
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Lessons</div>
              </div>
              <div className="group rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-accent/50 hover:shadow-lg">
                <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  1000+
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Problems</div>
              </div>
              <div className="group rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/50 hover:shadow-lg">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  5
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Mini-Games</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Why Students Love Lunex</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground">Built for Modern Learners</h2>
          <p className="mt-4 text-xl text-muted-foreground">Everything you need to excel in algebra</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Instant Access"
            description="No signup, no waiting. Just open and start learning immediately."
            gradient="from-yellow-500/10 via-orange-500/10 to-yellow-500/10"
            iconBg="from-yellow-500 to-orange-500"
          />
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="Bite-Sized Lessons"
            description="2-5 minute lessons designed for maximum retention and minimal time."
            gradient="from-purple-500/10 via-pink-500/10 to-purple-500/10"
            iconBg="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<Lightbulb className="h-8 w-8" />}
            title="Progressive Hints"
            description="Stuck? Get step-by-step hints that guide without giving away answers."
            gradient="from-blue-500/10 via-cyan-500/10 to-blue-500/10"
            iconBg="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<Target className="h-8 w-8" />}
            title="Adaptive Practice"
            description="Problems adjust to your skill level. Build confidence as you improve."
            gradient="from-green-500/10 via-emerald-500/10 to-green-500/10"
            iconBg="from-green-500 to-emerald-500"
          />
          <FeatureCard
            icon={<Trophy className="h-8 w-8" />}
            title="Gamified Progress"
            description="Earn XP, unlock badges, and track mastery across all topics."
            gradient="from-amber-500/10 via-yellow-500/10 to-amber-500/10"
            iconBg="from-amber-500 to-yellow-500"
          />
          <FeatureCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Complete Curriculum"
            description="From basic equations to advanced algebra. Everything in one place."
            gradient="from-indigo-500/10 via-purple-500/10 to-indigo-500/10"
            iconBg="from-indigo-500 to-purple-500"
          />
        </div>
      </section>

      <section className="border-y border-border bg-gradient-to-br from-muted/50 via-background to-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2">
              <Rocket className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Your Journey</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground">Your Complete Learning Path</h2>
            <p className="mt-4 text-xl text-muted-foreground">Master algebra step by step</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PathCard
              number="1"
              title="Foundations"
              topics="Variables, expressions, order of operations"
              color="from-blue-500 to-cyan-500"
            />
            <PathCard
              number="2"
              title="Equations"
              topics="Linear, multi-step, systems of equations"
              color="from-purple-500 to-pink-500"
            />
            <PathCard
              number="3"
              title="Functions"
              topics="Linear, quadratic, exponential functions"
              color="from-green-500 to-emerald-500"
            />
            <PathCard
              number="4"
              title="Advanced"
              topics="Polynomials, radicals, rational expressions"
              color="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4 animate-pulse-slow" />
            Join thousands of students mastering algebra
          </div>
          <h2 className="mt-8 text-balance text-4xl font-bold text-foreground sm:text-5xl">Ready to master algebra?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
            Start your journey today. No credit card, no commitment—just learning.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-10 gap-2 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all"
          >
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
  iconBg,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  iconBg: string
}) {
  return (
    <Card className="group relative overflow-hidden p-8 transition-all hover:scale-105 hover:shadow-2xl hover:border-primary/30">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative">
        <div
          className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${iconBg} p-4 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          {icon}
        </div>
        <h3 className="mb-3 text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}

function PathCard({ number, title, topics, color }: { number: string; title: string; topics: string; color: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:scale-105 hover:shadow-2xl hover:border-primary/30">
      <div className="absolute right-4 top-4 text-7xl font-bold text-primary/5 transition-all duration-300 group-hover:scale-125 group-hover:text-primary/10">
        {number}
      </div>
      <div className="relative">
        <div
          className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
        >
          {number}
        </div>
        <h3 className="mb-3 text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-base leading-relaxed text-muted-foreground">{topics}</p>
      </div>
    </div>
  )
}
