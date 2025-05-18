import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PreviewSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="max-w-md mx-auto">
          {/* Platform tabs skeleton */}
          <div className="flex justify-center mb-4">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Preview content skeleton with proper aspect ratio */}
          <div className="overflow-hidden rounded-md border">
            <Skeleton className="aspect-[1.91/1] w-full" />
            <div className="space-y-2 p-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
