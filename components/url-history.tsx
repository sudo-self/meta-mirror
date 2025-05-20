"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { History, Clock, X, Trash2 } from "lucide-react"
import type { UrlHistoryItem } from "@/hooks/use-url-history"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"

interface UrlHistoryProps {
  history: UrlHistoryItem[]
  onSelectUrl: (url: string) => void
  onRemoveUrl: (url: string) => void
  onClearHistory: () => void
}

export function UrlHistory({
  history,
  onSelectUrl,
  onRemoveUrl,
  onClearHistory
}: UrlHistoryProps) {
  const [open, setOpen] = useState(false)

  const formatTimestamp = (timestamp: number) =>
    formatDistanceToNow(timestamp, { addSuffix: true })

  if (history.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="View URL history"
          type="button"
        >
          <History className="h-4 w-4" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogTitle className="flex items-center justify-between">
          URL History
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearHistory}
            className="text-destructive"
            aria-label="Clear all history"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTitle>

        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search history..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Recent URLs">
              <ScrollArea className="h-[300px]">
                {history.map((item) => (
                  <CommandItem
                    key={item.timestamp}
                    value={item.url}
                    onSelect={() => {
                      onSelectUrl(item.url)
                      setOpen(false)
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{item.url}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(item.timestamp)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemoveUrl(item.url)
                        }}
                        aria-label={`Remove ${item.url} from history`}
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}









