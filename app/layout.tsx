import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ProgressProvider } from "@/lib/progress-context"
import { SettingsProvider } from "@/lib/settings-context"
import { SkipToContent } from "@/components/skip-to-content"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lunex - Master Algebra Faster",
  description:
    "Master every concept in algebra with Lunex. Interactive lessons, unlimited practice, and gamified learning. No login required.",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lunex",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  keywords: ["algebra", "math", "learning", "education", "practice", "equations", "student", "lunex"],
  authors: [{ name: "Francesco Mora" }],
  creator: "Francesco Mora",
  openGraph: {
    type: "website",
    title: "Lunex - Master Algebra Faster",
    description: "Master every concept in algebra with interactive lessons and gamified learning.",
    siteName: "Lunex",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <SettingsProvider>
          <ProgressProvider>
            <SkipToContent />
            <Navigation />
            <main id="main-content">{children}</main>
          </ProgressProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}
