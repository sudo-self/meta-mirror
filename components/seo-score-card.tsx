"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SeoScoreIndicator } from "@/components/seo-score-indicator"
import { Button } from "@/components/ui/button"
import { ChevronDown, InfoIcon as InfoCircle } from "lucide-react"
import type { OgData } from "@/lib/types"
import { analyzeSeo } from "@/lib/seo-recommendations"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SeoScoreCardProps {
  ogData: OgData
}

// Component for the score breakdown bar
interface ScoreBreakdownBarProps {
  label: string
  score: number
  weight: number
  contribution: number
  tooltipText: string
}

const ScoreBreakdownBar = ({ label, score, weight, contribution, tooltipText }: ScoreBreakdownBarProps) => {
  // Get color based on score
  const getScoreColor = () => {
    if (score >= 70) return "bg-green-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-destructive"
  }

  // Calculate width percentage based on weight
  const weightPercentage = `${weight * 100}%`

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium">{label}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Weight: {weight * 100}%</span>
          <span className="text-sm font-medium">{score}</span>
        </div>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex">
        <div className={cn("h-full rounded-full", getScoreColor())} style={{ width: weightPercentage }}>
          <div className={cn("h-full", getScoreColor())} style={{ width: `${score}%` }}></div>
        </div>
      </div>
      <div className="text-xs text-right text-muted-foreground">Contribution: +{contribution.toFixed(1)} points</div>
    </div>
  )
}

export function SeoScoreCard({ ogData }: SeoScoreCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)

  // Get SEO recommendations from the utility function
  const seoRecommendations = analyzeSeo(ogData)

  // Get score rating text
  const getScoreRating = (score: number) => {
    if (score >= 70) return "Good"
    if (score >= 40) return "Fair"
    return "Poor"
  }

  // Define the component weights (must match those in the analyzeSeo function)
  const weights = {
    title: 0.25,
    description: 0.25,
    image: 0.2,
    url: 0.1,
    keywords: 0.2,
  }

  // Convert status to score
  const getStatusScore = (status: string): number => {
    switch (status) {
      case "good":
        return 100
      case "fair":
        return 60
      case "poor":
        return 30
      case "missing":
        return 0
      default:
        return 0
    }
  }

  // Calculate individual component scores
  const componentScores = {
    title: getStatusScore(seoRecommendations.title.status),
    description: getStatusScore(seoRecommendations.description.status),
    image: getStatusScore(seoRecommendations.image.status),
    url: getStatusScore(seoRecommendations.url.status),
    keywords: getStatusScore(seoRecommendations.keywords.status),
  }

  // Calculate contribution of each component to the final score
  const contributions = {
    title: componentScores.title * weights.title,
    description: componentScores.description * weights.description,
    image: componentScores.image * weights.image,
    url: componentScores.url * weights.url,
    keywords: componentScores.keywords * weights.keywords,
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">SEO Score</h2>
          <SeoScoreIndicator score={seoRecommendations.numericScore} size="lg" />
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">{getScoreRating(seoRecommendations.numericScore)}</p>
            <p className="text-sm text-muted-foreground mt-1">Based on Open Graph metadata analysis</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="mt-4 flex items-center gap-1"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            {showBreakdown ? "Hide" : "Show"} Score Breakdown
            <ChevronDown className={cn("h-4 w-4 transition-transform", showBreakdown && "rotate-180")} />
          </Button>
        </div>

        {showBreakdown && (
          <div className="mt-6 space-y-4 border-t pt-4">
            <div className="text-sm text-muted-foreground">
              <p>
                Your SEO score is calculated based on the quality of your Open Graph metadata. Each component
                contributes a weighted percentage to your overall score:
              </p>
            </div>

            <div className="space-y-4 mt-4">
              <ScoreBreakdownBar
                label="Title"
                score={componentScores.title}
                weight={weights.title}
                contribution={contributions.title}
                tooltipText="Title should be 50-60 characters and include relevant keywords. It's one of the most important SEO factors."
              />

              <ScoreBreakdownBar
                label="Description"
                score={componentScores.description}
                weight={weights.description}
                contribution={contributions.description}
                tooltipText="Description should be 140-160 characters and provide a clear summary of your content."
              />

              <ScoreBreakdownBar
                label="Image"
                score={componentScores.image}
                weight={weights.image}
                contribution={contributions.image}
                tooltipText="High-quality images improve engagement and click-through rates on social media."
              />

              <ScoreBreakdownBar
                label="URL"
                score={componentScores.url}
                weight={weights.url}
                contribution={contributions.url}
                tooltipText="A canonical URL helps prevent duplicate content issues and improves SEO."
              />

              <ScoreBreakdownBar
                label="Keywords"
                score={componentScores.keywords}
                weight={weights.keywords}
                contribution={contributions.keywords}
                tooltipText="Keywords should be consistent across your title and description for better SEO performance."
              />
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Score:</span>
                <span className="font-bold text-lg">{seoRecommendations.numericScore}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
