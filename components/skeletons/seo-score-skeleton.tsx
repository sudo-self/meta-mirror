import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SeoScoreSkeleton() {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col items-center justify-center py-6">
        <Skeleton className="h-7 w-32 mb-4" />
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="mt-4 text-center">
          <Skeleton className="h-6 w-20 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}
