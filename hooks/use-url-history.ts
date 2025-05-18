"use client"

import { useState, useEffect } from "react"

/**
 * Interface for a URL history item
 */
export interface UrlHistoryItem {
  /** The URL that was analyzed */
  url: string
  /** When the URL was analyzed */
  timestamp: number
}

/**
 * Hook for managing URL history
 * Provides functions to add, remove, and retrieve URL history
 */
export function useUrlHistory() {
  const [history, setHistory] = useState<UrlHistoryItem[]>([])

  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem("og-debugger-history")
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory) as UrlHistoryItem[]
        setHistory(parsedHistory)
      } catch (error) {
        console.error("Failed to parse URL history:", error)
        // If parsing fails, reset the history
        localStorage.removeItem("og-debugger-history")
      }
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("og-debugger-history", JSON.stringify(history))
  }, [history])

  /**
   * Add a URL to the history
   * @param url The URL to add
   */
  const addToHistory = (url: string) => {
    // Don't add empty URLs
    if (!url.trim()) return

    setHistory((prevHistory) => {
      // Remove any existing entries with the same URL
      const filteredHistory = prevHistory.filter((item) => item.url !== url)

      // Add the new URL to the beginning of the history
      return [{ url, timestamp: Date.now() }, ...filteredHistory].slice(0, 10) // Limit to 10 items
    })
  }

  /**
   * Remove a URL from the history
   * @param url The URL to remove
   */
  const removeFromHistory = (url: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.url !== url))
  }

  /**
   * Clear all URLs from the history
   */
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("og-debugger-history")
  }

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
