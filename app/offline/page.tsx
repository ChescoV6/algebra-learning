"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OfflinePage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="max-w-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <WifiOff className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-foreground">You're Offline</h1>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          It looks like you've lost your internet connection. Some features may not be available until you're back
          online.
        </p>
        <Button onClick={() => router.refresh()}>Try Again</Button>
      </Card>
    </div>
  )
}
