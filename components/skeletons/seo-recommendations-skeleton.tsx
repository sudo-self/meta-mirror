import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SeoRecommendationsSkeleton() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>SEO Recommendations</CardTitle>
        <CardDescription>
          Optimize your Open Graph metadata for better search visibility and social sharing
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Generate 5 skeleton items for the accordion sections */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border-b pb-3">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              {index === 0 && (
                <div className="pt-2 pb-4 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex flex-wrap gap-2 mt-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-24 w-full rounded-md mt-2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
