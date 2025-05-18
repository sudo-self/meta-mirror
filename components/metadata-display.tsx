/**
 * Component for displaying Open Graph metadata
 * Shows all extracted metadata in a structured format
 */
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { History } from "lucide-react"
import { MetadataItem } from "@/components/metadata-item"
import type { OgData } from "@/lib/types"

interface MetadataDisplayProps {
  /** The Open Graph data to display */
  ogData: OgData
  /** The original URL that was analyzed */
  originalUrl: string
}

export function MetadataDisplay({ ogData, originalUrl }: MetadataDisplayProps) {
  const wasRedirected = ogData.finalUrl && ogData.finalUrl !== originalUrl

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Raw Metadata</h3>
          {wasRedirected && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="flex items-center gap-1.5">
                    <History className="h-3.5 w-3.5" />
                    Redirected
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redirected to: {ogData.finalUrl}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetadataItem label="Title" value={ogData.title} />
          <MetadataItem label="Description" value={ogData.description} />
          <MetadataItem label="Image" value={ogData.image} isUrl />
          <MetadataItem label="URL" value={ogData.url || originalUrl} isUrl />
          <MetadataItem label="Site Name" value={ogData.siteName} />
          <MetadataItem label="Type" value={ogData.type} />
        </div>
      </div>
    </Card>
  )
}
