"use client"

import type React from "react"

/**
 * Custom hook for fetching and managing Open Graph data
 * Encapsulates URL validation, data fetching, loading states, and error handling
 */
import { useState } from "react"
import { fetchOgData } from "@/lib/actions"
import { isValidUrl } from "@/lib/url-utils"
import { useToast } from "@/components/ui/use-toast"
import type { OgData } from "@/lib/types"
import { useUrlHistory } from "@/hooks/use-url-history"

interface UseOgDataReturn {
  /** The current URL being analyzed */
  url: string
  /** Function to update the URL */
  setUrl: (url: string) => void
  /** Function to clear the URL input */
  clearUrl: () => void
  /** Whether the URL is currently being analyzed */
  isLoading: boolean
  /** The fetched Open Graph data, if available */
  ogData: OgData | null
  /** Any error that occurred during URL validation or data fetching */
  error: string | null
  /** Function to clear any error */
  clearError: () => void
  /** Function to analyze the current URL */
  analyzeUrl: (e: React.FormEvent) => Promise<void>
  /** Whether the current URL is valid */
  isUrlValid: boolean
  /** URL history items */
  history: Array<{ url: string; timestamp: number }>
  /** Function to remove a URL from history */
  removeFromHistory: (url: string) => void
  /** Function to clear all history */
  clearHistory: () => void
  /** The URL that was actually analyzed (for display in metadata) */
  analyzedUrl: string
}

/**
 * Hook for managing Open Graph data fetching and URL validation
 * @returns Object containing URL state, OG data, and related functions
 */
export function useOgData(): UseOgDataReturn {
  const [url, setUrl] = useState("")
  const [analyzedUrl, setAnalyzedUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [ogData, setOgData] = useState<OgData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { history, addToHistory, removeFromHistory, clearHistory } = useUrlHistory()

  // Derived state for URL validation
  const isUrlValid = url.trim() === "" || isValidUrl(url)

  /**
   * Clear the URL input
   */
  const clearUrl = () => setUrl("")

  /**
   * Clear any error message
   */
  const clearError = () => setError(null)

  /**
   * Analyze the current URL to fetch Open Graph data
   * @param e - Form event
   */
  const analyzeUrl = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      setError("Please enter a URL")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Set the analyzed URL to the current form URL
      setAnalyzedUrl(url)

      const data = await fetchOgData(url)
      setOgData(data)

      // Add the URL to history
      addToHistory(url)

      // If there was a redirect, update the displayed URL and show toast
      if (data.finalUrl && data.finalUrl !== url) {
        // Update the form URL to the final URL
        setUrl(data.finalUrl)
        // Also update the analyzed URL to the final URL
        setAnalyzedUrl(data.finalUrl)
        // Also add the final URL to history
        addToHistory(data.finalUrl)

        toast({
          title: "URL Redirected",
          description: `Redirected to: ${data.finalUrl}`,
          duration: 3000,
        })
      } else {
        toast({
          title: "Analysis Complete",
          description: "Open Graph data successfully retrieved",
          duration: 3000,
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch Open Graph data"
      setError(errorMessage)
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        duration: 5000,
      })
      setOgData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    url,
    setUrl,
    clearUrl,
    isLoading,
    ogData,
    error,
    clearError,
    analyzeUrl,
    isUrlValid,
    history,
    removeFromHistory,
    clearHistory,
    analyzedUrl,
  }
}
