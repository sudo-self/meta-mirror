import { OgDebugger } from "@/components/og-debugger"
import { ModeToggle } from "@/components/mode-toggle"
import { LogoWithText } from "@/components/logo"
import MetaTagMaker from '../components/MetaTagMaker'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <LogoWithText textClassName="text-xl" />
          <ModeToggle />
        </div>
      </header>

      <main className="container py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">SEO Meta Mirror</h2>
            <p className="text-muted-foreground">
              Enter a URL to see how it will appear on different platforms
            </p>
          </div>

          <OgDebugger />

          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="font-semibold mb-2">How it Works</h3>
            <p className="text-sm text-muted-foreground">
              This tool lets you preview how your URLs will appear when shared online by extracting Open Graph metadata. It also provides actionable feedback to help you optimize for improved search visibility and social media engagement.
            </p>
          </div>

          {/* MetaTagMaker Modal */}

<Dialog>
  <DialogTrigger asChild>
    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90">
      Meta Maker
    </button>
  </DialogTrigger>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Meta Maker</DialogTitle>
      <DialogDescription>
        Create SEO metadata
      </DialogDescription>
    </DialogHeader>
    <div className="p-4 space-y-6 bg-background text-foreground">
      <MetaTagMaker />
    </div>
  </DialogContent>
</Dialog>

        </div>
      </main>
    </div>
  )
}










