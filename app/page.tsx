import { OgDebugger } from "@/components/og-debugger"
import { ModeToggle } from "@/components/mode-toggle"
import { LogoWithText } from "@/components/logo"
import MetaTagMaker from "../components/MetaTagMaker"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
          {/* Title Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">SEO Meta Mirror</h2>
            <p className="text-muted-foreground">
              Enter a URL to see how it will appear on different platforms
            </p>
          </div>

          {/* OG Debugger Tool */}
          <OgDebugger />

          {/* How It Works Card with Responsive Layout */}
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">
                  Preview how your URL appears when shared online using Open Graph metadata.
                  Get feedback to improve SEO and generate meta tags if needed.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-auto py-2 px-4 text-sm font-medium whitespace-nowrap">
                    Meta Maker
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Meta Maker</DialogTitle>
                    <DialogDescription>Create SEO metadata</DialogDescription>
                  </DialogHeader>
                  <div className="p-4 space-y-6 bg-background text-foreground">
                    <MetaTagMaker />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}















