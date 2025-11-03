"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Settings {
  theme: "light" | "dark" | "system"
  fontSize: "normal" | "large" | "xlarge"
  dyslexiaFont: boolean
  highContrast: boolean
  reducedMotion: boolean
  soundEnabled: boolean
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const defaultSettings: Settings = {
  theme: "system",
  fontSize: "normal",
  dyslexiaFont: false,
  highContrast: false,
  reducedMotion: false,
  soundEnabled: true,
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lunex-settings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load settings:", e)
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("lunex-settings", JSON.stringify(settings))

    // Apply theme
    const root = document.documentElement
    if (settings.theme === "dark") {
      root.classList.add("dark")
    } else if (settings.theme === "light") {
      root.classList.remove("dark")
    } else {
      // System preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (isDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }

    // Apply font size
    root.classList.remove("text-base", "text-lg", "text-xl")
    if (settings.fontSize === "large") {
      root.classList.add("text-lg")
    } else if (settings.fontSize === "xlarge") {
      root.classList.add("text-xl")
    }

    // Apply dyslexia font
    if (settings.dyslexiaFont) {
      document.body.classList.add("dyslexia-font")
    } else {
      document.body.classList.remove("dyslexia-font")
    }

    // Apply high contrast
    if (settings.highContrast) {
      document.body.classList.add("high-contrast")
    } else {
      document.body.classList.remove("high-contrast")
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty("--animation-duration", "0.01ms")
    } else {
      root.style.removeProperty("--animation-duration")
    }
  }, [settings])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider")
  }
  return context
}
