import Image from "next/image"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageWithAspectRatioProps {
  src: string | null
  alt: string
  aspectRatio: "landscape" | "portrait" | "square" | string
  className?: string
  fallbackClassName?: string
}

/**
 * A component that displays an image with a specific aspect ratio
 * Handles both image display and fallback when no image is available
 */
export function ImageWithAspectRatio({
  src,
  alt,
  aspectRatio,
  className,
  fallbackClassName,
}: ImageWithAspectRatioProps) {
  // Convert named aspect ratios to their numeric values
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "landscape":
        return "aspect-[1.91/1]" // Standard OG image ratio (1200×630)
      case "portrait":
        return "aspect-[2/3]" // Pinterest-style portrait ratio
      case "square":
        return "aspect-square" // 1:1 ratio
      default:
        return `aspect-[${aspectRatio}]` // Custom ratio if provided as string (e.g. "16/9")
    }
  }

  const aspectRatioClass = getAspectRatioClass()

  if (!src) {
    return (
      <div className={cn(aspectRatioClass, "w-full bg-muted flex items-center justify-center", fallbackClassName)}>
        <Globe className="h-12 w-12 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className={cn("relative", aspectRatioClass, "w-full overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
