import { cn } from "@/lib/utils"

interface SeoScoreIndicatorProps {
  score: number
  size?: "sm" | "md" | "lg"
  label?: string
  className?: string
}

export function SeoScoreIndicator({ score, size = "md", label = "SEO Score", className }: SeoScoreIndicatorProps) {
  // Calculate the circumference of the circle
  const radius = size === "sm" ? 30 : size === "md" ? 40 : 50
  const strokeWidth = size === "sm" ? 4 : size === "md" ? 5 : 6
  const circumference = 2 * Math.PI * radius

  // Calculate the stroke-dasharray value based on the score
  const dashArray = (score / 100) * circumference

  // Determine color based on score
  const getColor = () => {
    if (score >= 70) return "text-green-500"
    if (score >= 40) return "text-yellow-500"
    return "text-destructive"
  }

  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-20 h-20"
      case "lg":
        return "w-32 h-32"
      default:
        return "w-24 h-24"
    }
  }

  // Get font size for score
  const getScoreFontSize = () => {
    switch (size) {
      case "sm":
        return "text-xl"
      case "lg":
        return "text-3xl"
      default:
        return "text-2xl"
    }
  }

  // Get font size for label
  const getLabelFontSize = () => {
    switch (size) {
      case "sm":
        return "text-xs"
      case "lg":
        return "text-sm"
      default:
        return "text-xs"
    }
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-center", getSizeClasses(), className)}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}>
        {/* Background circle */}
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />

        {/* Progress circle */}
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dashArray}
          strokeLinecap="round"
          className={getColor()}
        />
      </svg>

      {/* Score text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className={cn("font-bold", getScoreFontSize())}>{score}</span>
        <span className={cn("text-muted-foreground", getLabelFontSize())}>{label}</span>
      </div>
    </div>
  )
}
