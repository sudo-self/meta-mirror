import { CardContent } from "@/components/ui/card"
import { ExternalLink, AlertCircle } from "lucide-react"
import type { OgData } from "@/lib/types"
import { extractDomain } from "@/lib/url-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageWithAspectRatio } from "@/components/image-aspect-ratio"

interface BlueskyPreviewProps {
  ogData: OgData
  url: string
}

export function BlueskyPreview({ ogData, url }: BlueskyPreviewProps) {
  const domain = extractDomain(url)

  // Check if we have the minimum required data for a preview
  const hasMinimumData = ogData.title || ogData.description

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Bluesky Preview</h2>
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

      {!hasMinimumData ? (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Insufficient metadata for Bluesky preview. Add a title or description to your Open Graph metadata.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="max-w-md mx-auto overflow-hidden rounded-lg border shadow-sm">
          <div className="bg-card text-card-foreground p-4">
            {/* Author section */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground font-medium">AT</span>
              </div>
              <div>
                <p className="font-semibold">Author Name</p>
                <p className="text-muted-foreground text-sm">@author.bsky.social</p>
              </div>
            </div>

            {/* Content preview */}
            <p className="mb-3 text-sm">Check out this link: {ogData.title || "Shared content"}</p>

            {/* Link card */}
            <div className="rounded-md border overflow-hidden">
              <ImageWithAspectRatio
                src={ogData.image || "/placeholder.svg"}
                alt={ogData.title || "Preview image"}
                aspectRatio="landscape"
              />
              <div className="p-3">
                <div className="text-muted-foreground text-xs mb-1">{domain}</div>
                <h3 className="font-bold text-foreground text-base line-clamp-2">
                  {ogData.title || "No title available"}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                  {ogData.description || "No description available"}
                </p>
              </div>
            </div>

            {/* Post metadata */}
            <div className="flex items-center gap-4 mt-3 text-muted-foreground text-sm">
              <span>9:41 AM · Jun 15, 2023</span>
              <div className="flex items-center gap-1">
                <span>·</span>
                <span>Bluesky Web</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  )
}
