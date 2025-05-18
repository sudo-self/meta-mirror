import { CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import type { OgData } from "@/lib/types"
import { extractDomain } from "@/lib/url-utils"
import { ImageWithAspectRatio } from "@/components/image-aspect-ratio"
import { PinterestIcon } from "@/components/icons/pinterest-icon"

interface PinterestPreviewProps {
  ogData: OgData
  url: string
}

export function PinterestPreview({ ogData, url }: PinterestPreviewProps) {
  const domain = extractDomain(url)

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Pinterest Preview</h2>
          <PinterestIcon className="h-5 w-5 text-[#E60023]" />
        </div>
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
      <div className="max-w-sm mx-auto overflow-hidden rounded-lg border shadow-sm">
        <div className="bg-card text-card-foreground">
          {/* Pinterest uses a taller aspect ratio for pins */}
          <ImageWithAspectRatio
            src={ogData.image || "/placeholder.svg"}
            alt={ogData.title || "Preview image"}
            aspectRatio="2/3"
            className="w-full"
          />
          <div className="p-3">
            <h3 className="font-bold text-foreground text-base line-clamp-2">{ogData.title || "No title available"}</h3>
            <div className="text-muted-foreground text-xs mt-2 flex items-center gap-1">
              <span>{domain}</span>
            </div>
          </div>
          {/* Pinterest-specific UI elements */}
          <div className="px-3 pb-3 pt-1 flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center">
                <span className="text-[#E60023] text-xs font-bold">P</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-gray-500 text-xs font-bold">U</span>
              </div>
            </div>
            <button className="bg-[#E60023] hover:bg-[#ad001b] transition-colors text-white rounded-full px-3 py-1.5 text-sm font-medium">
              Save
            </button>
          </div>
        </div>
      </div>
    </CardContent>
  )
}
