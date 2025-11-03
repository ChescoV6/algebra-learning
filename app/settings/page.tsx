"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Upload, Trash2, Trophy, Zap, BookOpen, CheckCircle2 } from "lucide-react"
import { useProgress } from "@/lib/progress-context"
import { useSettings } from "@/lib/settings-context"
import { curriculum } from "@/lib/curriculum"

export default function SettingsPage() {
  const { progress, exportProgress, importProgress, resetProgress } = useProgress()
  const { settings, updateSettings } = useSettings()
  const [importData, setImportData] = useState("")
  const [importStatus, setImportStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })

  const handleExport = () => {
    const data = exportProgress()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `algebramaster-progress-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const success = importProgress(importData)
    if (success) {
      setImportStatus({ type: "success", message: "Progress imported successfully!" })
      setImportData("")
    } else {
      setImportStatus({ type: "error", message: "Failed to import progress. Please check the data format." })
    }
    setTimeout(() => setImportStatus({ type: null, message: "" }), 3000)
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      resetProgress()
    }
  }

  // Calculate statistics
  const totalLessons = curriculum.reduce((sum, topic) => sum + topic.lessons.length, 0)
  const completedLessons = Object.values(progress.topics).reduce(
    (sum, topic) => sum + Object.values(topic).filter((lesson) => lesson.completed).length,
    0,
  )
  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-bold text-foreground">Settings & Progress</h1>
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
            Track your progress, customize your experience, and manage your data.
          </p>
        </div>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold text-foreground">Your Statistics</h2>

              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-primary/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    Total XP
                  </div>
                  <div className="text-3xl font-bold text-primary">{progress.xp}</div>
                </div>

                <div className="rounded-lg bg-accent/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    Lessons Completed
                  </div>
                  <div className="text-3xl font-bold text-accent">
                    {completedLessons}/{totalLessons}
                  </div>
                </div>

                <div className="rounded-lg bg-green-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                    Badges Earned
                  </div>
                  <div className="text-3xl font-bold text-green-500">{progress.badges.length}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Completion</span>
                  <span className="font-semibold text-foreground">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Topic Progress</h2>
              <div className="space-y-4">
                {curriculum.map((topic) => {
                  const topicData = progress.topics[topic.id] || {}
                  const completed = topic.lessons.filter((lesson) => topicData[lesson.id]?.completed).length
                  const percentage = (completed / topic.lessons.length) * 100

                  return (
                    <div key={topic.id} className="rounded-lg border border-border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{topic.icon}</span>
                          <span className="font-semibold text-foreground">{topic.title}</span>
                        </div>
                        <Badge variant={percentage === 100 ? "default" : "secondary"}>
                          {completed}/{topic.lessons.length}
                        </Badge>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </Card>

            {progress.badges.length > 0 && (
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-foreground">Badges Earned</h2>
                <div className="flex flex-wrap gap-2">
                  {progress.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold text-foreground">Appearance</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="theme" className="text-base font-semibold text-foreground">
                      Theme
                    </Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
                  </div>
                  <div className="flex gap-2">
                    {(["light", "dark", "system"] as const).map((theme) => (
                      <Button
                        key={theme}
                        variant={settings.theme === theme ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateSettings({ theme })}
                        className="capitalize"
                      >
                        {theme}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fontSize" className="text-base font-semibold text-foreground">
                      Font Size
                    </Label>
                    <p className="text-sm text-muted-foreground">Adjust text size for better readability</p>
                  </div>
                  <div className="flex gap-2">
                    {(["normal", "large", "xlarge"] as const).map((size) => (
                      <Button
                        key={size}
                        variant={settings.fontSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateSettings({ fontSize: size })}
                        className="capitalize"
                      >
                        {size === "xlarge" ? "XL" : size}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold text-foreground">Accessibility</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dyslexia" className="text-base font-semibold text-foreground">
                      Dyslexia-Friendly Font
                    </Label>
                    <p className="text-sm text-muted-foreground">Use OpenDyslexic font for easier reading</p>
                  </div>
                  <Switch
                    id="dyslexia"
                    checked={settings.dyslexiaFont}
                    onCheckedChange={(checked) => updateSettings({ dyslexiaFont: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="contrast" className="text-base font-semibold text-foreground">
                      High Contrast Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch
                    id="contrast"
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="motion" className="text-base font-semibold text-foreground">
                      Reduce Motion
                    </Label>
                    <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                  </div>
                  <Switch
                    id="motion"
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => updateSettings({ reducedMotion: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound" className="text-base font-semibold text-foreground">
                      Sound Effects
                    </Label>
                    <p className="text-sm text-muted-foreground">Enable audio feedback for interactions</p>
                  </div>
                  <Switch
                    id="sound"
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold text-foreground">Export Progress</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Download your progress data as a JSON file. You can use this to backup your progress or transfer it to
                another device.
              </p>
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Progress
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold text-foreground">Import Progress</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Paste your exported progress data below to restore your progress from a backup.
              </p>

              {importStatus.type && (
                <Alert className={`mb-4 ${importStatus.type === "success" ? "border-green-500" : "border-red-500"}`}>
                  <AlertDescription className="flex items-center gap-2">
                    {importStatus.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-red-500" />
                    )}
                    {importStatus.message}
                  </AlertDescription>
                </Alert>
              )}

              <Textarea
                placeholder="Paste your exported progress data here..."
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="mb-4 min-h-[150px] font-mono text-sm"
              />
              <Button onClick={handleImport} disabled={!importData.trim()}>
                <Upload className="mr-2 h-4 w-4" />
                Import Progress
              </Button>
            </Card>

            <Card className="border-destructive p-6">
              <h2 className="mb-6 text-2xl font-semibold text-destructive">Danger Zone</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Reset all your progress and start fresh. This action cannot be undone.
              </p>
              <Button variant="destructive" onClick={handleReset}>
                <Trash2 className="mr-2 h-4 w-4" />
                Reset All Progress
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
