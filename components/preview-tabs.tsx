/**
 * Component for displaying social media preview tabs
 * Shows previews for different platforms in a tabbed interface
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacebookFilledIcon } from "@/components/icons/filled/facebook-icon"
import { TwitterFilledIcon } from "@/components/icons/filled/twitter-icon"
import { LinkedinFilledIcon } from "@/components/icons/filled/linkedin-icon"
import { PinterestFilledIcon } from "@/components/icons/filled/pinterest-icon"
import { BlueskyFilledIcon } from "@/components/icons/filled/bluesky-icon"
import { MastodonFilledIcon } from "@/components/icons/filled/mastodon-icon"
import { FacebookPreview } from "@/components/previews/facebook-preview"
import { TwitterPreview } from "@/components/previews/twitter-preview"
import { LinkedinPreview } from "@/components/previews/linkedin-preview"
import { PinterestPreview } from "@/components/previews/pinterest-preview"
import { BlueskyPreview } from "@/components/previews/bluesky-preview"
import { MastodonPreview } from "@/components/previews/mastodon-preview"
import type { OgData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PreviewTabsProps {
  /** The Open Graph data to display in previews */
  ogData: OgData
  /** The URL that was analyzed */
  url: string
}

export function PreviewTabs({ ogData, url }: PreviewTabsProps) {
  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <Tabs defaultValue="facebook" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto p-1">
          <TabsTrigger value="facebook" className="flex items-center justify-center py-2" aria-label="Facebook Preview">
            <FacebookFilledIcon
              className={cn(
                "h-5 w-5 transition-colors",
                "text-[#1877F2] group-data-[state=active]/trigger:text-[#1877F2]",
                "group-data-[state=inactive]/trigger:text-[#1877F2]/70",
              )}
            />
            <span className="sr-only">Facebook</span>
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center justify-center py-2" aria-label="Twitter Preview">
            <TwitterFilledIcon
              className={cn(
                "h-5 w-5 transition-colors",
                "text-[#1DA1F2] group-data-[state=active]/trigger:text-[#1DA1F2]",
                "group-data-[state=inactive]/trigger:text-[#1DA1F2]/70",
              )}
            />
            <span className="sr-only">X / Twitter</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center justify-center py-2" aria-label="LinkedIn Preview">
            <LinkedinFilledIcon
              className={cn(
                "h-5 w-5 transition-colors",
                "text-[#0A66C2] group-data-[state=active]/trigger:text-[#0A66C2]",
                "group-data-[state=inactive]/trigger:text-[#0A66C2]/70",
              )}
            />
            <span className="sr-only">LinkedIn</span>
          </TabsTrigger>
          <TabsTrigger
            value="pinterest"
            className="flex items-center justify-center py-2"
            aria-label="Pinterest Preview"
          >
            <PinterestFilledIcon
              className={cn(
                "h-5 w-5 transition-colors",
                "text-[#E60023] group-data-[state=active]/trigger:text-[#E60023]",
                "group-data-[state=inactive]/trigger:text-[#E60023]/70",
              )}
            />
            <span className="sr-only">Pinterest</span>
          </TabsTrigger>
          <TabsTrigger value="bluesky" className="flex items-center justify-center py-2" aria-label="Bluesky Preview">
            <BlueskyFilledIcon
              className={cn(
                "h-5 w-5 transition-colors",
                "text-[#0085FF] group-data-[state=active]/trigger:text-[#0085FF]",
                "group-data-[state=inactive]/trigger:text-[#0085FF]/70",
              )}
            />
            <span className="sr-only">Bluesky</span>
          </TabsTrigger>
          <TabsTrigger value="mastodon" className="flex items-center justify-center py-2" aria-label="Mastodon Preview">
            <MastodonFilledIcon
              className={cn(
                "h-5 w-5 transition-colors",
                "text-[#6364FF] group-data-[state=active]/trigger:text-[#6364FF]",
                "group-data-[state=inactive]/trigger:text-[#6364FF]/70",
              )}
            />
            <span className="sr-only">Mastodon</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="facebook" className="mt-0">
          <FacebookPreview ogData={ogData} url={url} />
        </TabsContent>

        <TabsContent value="twitter" className="mt-0">
          <TwitterPreview ogData={ogData} url={url} />
        </TabsContent>

        <TabsContent value="linkedin" className="mt-0">
          <LinkedinPreview ogData={ogData} url={url} />
        </TabsContent>

        <TabsContent value="pinterest" className="mt-0">
          <PinterestPreview ogData={ogData} url={url} />
        </TabsContent>

        <TabsContent value="bluesky" className="mt-0">
          <BlueskyPreview ogData={ogData} url={url} />
        </TabsContent>

        <TabsContent value="mastodon" className="mt-0">
          <MastodonPreview ogData={ogData} url={url} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
