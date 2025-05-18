"use client"

import type React from "react"

/**
 * Component for the URL input form
 * Handles URL input, validation, and submission
 */
import { AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { UrlHistory } from "@/components/url-history"
import type { UrlHistoryItem } from "@/hooks/use-url-history"

interface UrlFormProps {
  /** The current URL */
  url: string
  /** Function to update the URL */
  onUrlChange: (url: string) => void
  /** Function to clear the URL */
  onUrlClear: () => void
  /** Function to submit the form */
  onSubmit: (e: React.FormEvent) => Promise<void>
  /** Whether the URL is valid */
  isValid: boolean
  /** Whether the form is submitting */
  isLoading: boolean
  /** Error message, if any */
  error: string | null
  /** Function to clear any error */
  onErrorClear: () => void
  /** URL history items */
  history: UrlHistoryItem[]
  /** Function to remove a URL from history */
  onRemoveUrl: (url: string) => void
  /** Function to clear all history */
  onClearHistory: () => void
}

export function UrlForm({
  url,
  onUrlChange,
  onUrlClear,
  onSubmit,
  isValid,
  isLoading,
  error,
  onErrorClear,
  history,
  onRemoveUrl,
  onClearHistory,
}: UrlFormProps) {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter a URL (e.g., example.com)"
                value={url}
                onChange={(e) => {
                  onUrlChange(e.target.value)
                  if (error) onErrorClear()
                }}
                className={`pr-10 ${url.trim() !== "" && !isValid ? "border-destructive" : ""}`}
                aria-invalid={url.trim() !== "" && !isValid}
                aria-describedby={url.trim() !== "" && !isValid ? "url-error" : undefined}
              />
              {url.trim() !== "" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={onUrlClear}
                  aria-label="Clear URL input"
                >
                  <span className="sr-only">Clear input</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading || (url.trim() !== "" && !isValid)} className="min-w-[100px]">
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing
                  </>
                ) : (
                  "Analyze"
                )}
              </Button>
              {/* The UrlHistory component is now outside the form's button group */}
              <UrlHistory
                history={history}
                onSelectUrl={onUrlChange}
                onRemoveUrl={onRemoveUrl}
                onClearHistory={onClearHistory}
              />
            </div>
          </div>
          {url.trim() !== "" && !isValid && !error && (
            <p className="text-sm text-destructive flex items-center gap-1.5" id="url-error">
              <AlertCircle className="h-3.5 w-3.5" />
              Please enter a valid URL (e.g., example.com or https://example.com)
            </p>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>
    </Card>
  )
}
