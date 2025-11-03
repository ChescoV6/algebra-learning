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
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="hidden bg-gradient-to-r from-primary to-accent bg-clip-text font-bold text-transparent sm:inline">
            Lunex
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Button key={item.href} asChild variant={isActive ? "default" : "ghost"} size="sm" className="gap-2">
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            )
          })}
          <div className="ml-2 hidden items-center gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-1.5 sm:flex">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{progress.xp} XP</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
