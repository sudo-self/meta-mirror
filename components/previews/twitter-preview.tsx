import { CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import type { OgData } from "@/lib/types"
import { extractDomain } from "@/lib/url-utils"
import { ImageWithAspectRatio } from "@/components/image-aspect-ratio"

interface TwitterPreviewProps {
  ogData: OgData
  url: string
}

export function TwitterPreview({ ogData, url }: TwitterPreviewProps) {
  const domain = extractDomain(url)

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">X / Twitter Preview</h2>
        {ogData.image && (
          <a
            href={ogData.image}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <span>View image</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
      <div className="max-w-md mx-auto overflow-hidden rounded-lg border shadow-sm">
        <div className="bg-card text-card-foreground">
          <ImageWithAspectRatio
            src={ogData.image || "/placeholder.svg"}
            alt={ogData.title || "Preview image"}
            aspectRatio="landscape"
          />
          <div className="p-3">
            <h3 className="font-bold text-foreground text-base line-clamp-2">{ogData.title || "No title available"}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {ogData.description || "No description available"}
            </p>
            <div className="text-muted-foreground text-sm mt-2 flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>{domain}</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  )
}
