"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeTest() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the component after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Theme Test Panel</CardTitle>
        <CardDescription>Verify theme functionality and persistence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Current Theme State</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-semibold">Selected Theme:</span>{" "}
                <code className="bg-muted px-1 py-0.5 rounded">{theme}</code>
              </li>
              <li>
                <span className="font-semibold">Resolved Theme:</span>{" "}
                <code className="bg-muted px-1 py-0.5 rounded">{resolvedTheme}</code>
              </li>
              <li>
                <span className="font-semibold">System Theme:</span>{" "}
                <code className="bg-muted px-1 py-0.5 rounded">{systemTheme}</code>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Theme Controls</h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="justify-start" onClick={() => setTheme("light")}>
                <Sun className="h-4 w-4 mr-2" />
                Set Light Theme
              </Button>
              <Button variant="outline" size="sm" className="justify-start" onClick={() => setTheme("dark")}>
                <Moon className="h-4 w-4 mr-2" />
                Set Dark Theme
              </Button>
              <Button variant="outline" size="sm" className="justify-start" onClick={() => setTheme("system")}>
                <Monitor className="h-4 w-4 mr-2" />
                Set System Theme
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Refresh the page to verify theme persistence. The theme should remain the same after page reload.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
