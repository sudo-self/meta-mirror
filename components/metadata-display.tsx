import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { History, Type, ImageIcon, Link2, FileText, HelpCircle, Search } from "lucide-react"
import { MetadataItem } from "@/components/metadata-item"
import type { OgData } from "@/lib/types"

interface MetadataDisplayProps {

  ogData: OgData

  originalUrl: string
}

export function MetadataDisplay({ ogData, originalUrl }: MetadataDisplayProps) {
  const wasRedirected = ogData.finalUrl && ogData.finalUrl !== originalUrl

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            Raw Metadata
          </h3>
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
          <MetadataItem label="Title" value={ogData.title} icon={FileText} />
          <MetadataItem label="Description" value={ogData.description} icon={HelpCircle} />
          <MetadataItem label="Image" value={ogData.image} isUrl icon={ImageIcon} />
          <MetadataItem label="URL" value={ogData.url || originalUrl} isUrl icon={Link2} />
          <MetadataItem label="Site Name" value={ogData.siteName} icon={FileText} />
          <MetadataItem label="Type" value={ogData.type} icon={Type} />
        </div>
      </div>
    </Card>
  )
}

