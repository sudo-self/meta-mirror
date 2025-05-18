"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { History, Clock, Trash2, X } from "lucide-react"
import type { UrlHistoryItem } from "@/hooks/use-url-history"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"

interface UrlHistoryProps {
  /** The list of URL history items */
  history: UrlHistoryItem[]
  /** Function to select a URL from history */
  onSelectUrl: (url: string) => void
  /** Function to remove a URL from history */
  onRemoveUrl: (url: string) => void
  /** Function to clear all history */
  onClearHistory: () => void
}

export function UrlHistory({ history, onSelectUrl, onRemoveUrl, onClearHistory }: UrlHistoryProps) {
  const [open, setOpen] = useState(false)

  // Format the timestamp as a relative time (e.g., "2 hours ago")
  const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: true })
  }

  // No history to display
  if (history.length === 0) {
    return null
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        aria-label="View URL history"
        type="button"
        onClick={() => setOpen(true)}
      >
        <History className="h-4 w-4" />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>URL History</DialogTitle>
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
                        <span className="text-xs text-muted-foreground">{formatTimestamp(item.timestamp)}</span>
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
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    onClearHistory()
                    setOpen(false)
                  }}
                  className="justify-center text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear History
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
