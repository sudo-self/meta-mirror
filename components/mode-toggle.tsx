"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get the current theme icon and label
  const getThemeIcon = () => {
    if (!mounted) return null

    const currentTheme = theme === "system" ? resolvedTheme : theme

    if (currentTheme === "dark") {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />
    }
    if (currentTheme === "light") {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />
    }
    return <Monitor className="h-[1.2rem] w-[1.2rem]" />
  }

  // Get the current theme label for the tooltip
  const getThemeLabel = () => {
    if (!mounted) return "Toggle theme"

    const currentTheme = theme === "system" ? resolvedTheme : theme

    if (currentTheme === "dark") {
      return "Dark mode (click to change)"
    }
    if (currentTheme === "light") {
      return "Light mode (click to change)"
    }
    return "System theme (click to change)"
  }

  // Handle direct toggle between light and dark (skipping system)
  const toggleTheme = () => {
    const currentTheme = theme === "system" ? resolvedTheme : theme
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <Button variant="outline" size="icon" className="w-9 h-9" disabled>
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" onClick={toggleTheme} className="w-9 h-9">
                {getThemeIcon()}
                <span className="sr-only">{getThemeLabel()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
                {theme === "light" && <span className="ml-auto text-xs">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
                {theme === "dark" && <span className="ml-auto text-xs">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>System</span>
                {theme === "system" && <span className="ml-auto text-xs">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getThemeLabel()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
