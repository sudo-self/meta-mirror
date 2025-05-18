/**
 * Component for displaying a single metadata item
 * Handles different display formats for URLs and regular text
 */
import { ExternalLink } from "lucide-react"

interface MetadataItemProps {
  /** The label for the metadata item */
  label: string
  /** The value of the metadata item */
  value: string | null
  /** Whether the value is a URL */
  isUrl?: boolean
}

export function MetadataItem({ label, value, isUrl = false }: MetadataItemProps) {
  return (
    <div className="space-y-1.5">
      <h4 className="text-sm font-medium">{label}</h4>
      {value ? (
        isUrl ? (
          <div className="flex items-center gap-1.5 group">
            <p className="text-sm text-muted-foreground break-all">{value}</p>
            <a
              href={value.startsWith("http") ? value : `https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Open ${label} URL in new tab`}
            >
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">Open URL</span>
            </a>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground break-words">{value}</p>
        )
      ) : (
        <p className="text-sm text-muted-foreground italic">Not found</p>
      )}
    </div>
  )
}
