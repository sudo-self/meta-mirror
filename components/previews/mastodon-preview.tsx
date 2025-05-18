import { CardContent } from "@/components/ui/card"
import { ExternalLink, AlertCircle } from "lucide-react"
import type { OgData } from "@/lib/types"
import { extractDomain } from "@/lib/url-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageWithAspectRatio } from "@/components/image-aspect-ratio"

interface MastodonPreviewProps {
  ogData: OgData
  url: string
}

export function MastodonPreview({ ogData, url }: MastodonPreviewProps) {
  const domain = extractDomain(url)

  // Check if we have the minimum required data for a preview
  const hasMinimumData = ogData.title || ogData.description

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Mastodon Preview</h2>
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
            Insufficient metadata for Mastodon preview. Add a title or description to your Open Graph metadata.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="max-w-md mx-auto overflow-hidden rounded-lg border shadow-sm">
          <div className="bg-card text-card-foreground">
            {/* Header with author info */}
            <div className="p-4 border-b">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">M</span>
                </div>
                <div>
                  <p className="font-bold">Display Name</p>
                  <p className="text-muted-foreground text-sm">@username@mastodon.social</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="mb-4 text-base">Check out this interesting link I found! #OpenGraph #Metadata</p>

              {/* Link preview card */}
              <div className="rounded-md border overflow-hidden">
                <ImageWithAspectRatio
                  src={ogData.image || "/placeholder.svg"}
                  alt={ogData.title || "Preview image"}
                  aspectRatio="landscape"
                />
                <div className="p-3">
                  <h3 className="font-bold text-foreground text-base line-clamp-2">
                    {ogData.title || "No title available"}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mt-1">
                    {ogData.description || "No description available"}
                  </p>
                  <div className="text-muted-foreground text-xs mt-2 flex items-center gap-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>{domain}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t text-muted-foreground text-xs">
              <span>June 15, 2023 · 9:41 AM · Mastodon Web</span>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  )
}
