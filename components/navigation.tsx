"use client"

import { Button } from "@/components/ui/button"
import { Home, BookOpen, Gamepad2, Settings, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useProgress } from "@/lib/progress-context"

export function Navigation() {
  const pathname = usePathname()
  const { progress } = useProgress()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/topics", icon: BookOpen, label: "Topics" },
    { href: "/quick-practice", icon: TrendingUp, label: "Practice" },
    { href: "/games", icon: Gamepad2, label: "Games" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-primary shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl animate-gradient">
            <Sparkles className="h-6 w-6 text-white animate-pulse-slow" />
          </div>
          <span className="hidden bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-xl font-bold text-transparent sm:inline animate-gradient">
            Lunex
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`gap-2 transition-all duration-200 ${isActive ? "shadow-lg" : "hover:scale-105"}`}
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            )
          })}
          <div className="ml-3 hidden items-center gap-2 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 px-4 py-2 shadow-inner backdrop-blur-sm transition-all hover:scale-105 sm:flex animate-gradient">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-foreground">{progress.xp}</span>
            <span className="text-xs text-muted-foreground">XP</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
