"use client"

import { useOgData } from "@/hooks/use-og-data"
import { UrlForm } from "@/components/url-form"
import { MetadataDisplay } from "@/components/metadata-display"
import { PreviewTabs } from "@/components/preview-tabs"
import { SeoRecommendations } from "@/components/seo-recommendations"
import { SeoScoreCard } from "@/components/seo-score-card"
import { MetadataSkeleton } from "@/components/skeletons/metadata-skeleton"
import { PreviewSkeleton } from "@/components/skeletons/preview-skeleton"
import { SeoRecommendationsSkeleton } from "@/components/skeletons/seo-recommendations-skeleton"
import { SeoScoreSkeleton } from "@/components/skeletons/seo-score-skeleton"

export function OgDebugger() {
  // Use the custom hook to manage URL-related state and operations
  const {
    url,
    setUrl,
    clearUrl,
    isLoading,
    ogData,
    error,
    clearError,
    analyzeUrl,
    isUrlValid,
    history,
    removeFromHistory,
    clearHistory,
    analyzedUrl,
  } = useOgData()

  return (
    <div className="space-y-8">
      {/* URL input form with history */}
      <UrlForm
        url={url}
        onUrlChange={setUrl}
        onUrlClear={clearUrl}
        onSubmit={analyzeUrl}
        isValid={isUrlValid}
        isLoading={isLoading}
        error={error}
        onErrorClear={clearError}
        history={history}
        onRemoveUrl={removeFromHistory}
        onClearHistory={clearHistory}
      />

      {/* Loading skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-8">
            <SeoScoreSkeleton />
            <MetadataSkeleton />
            <SeoRecommendationsSkeleton />
          </div>
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-24">
              <PreviewSkeleton />
            </div>
          </div>
          <div className="block lg:hidden">
            <PreviewSkeleton />
          </div>
        </div>
      )}

      {/* Results display */}
      {ogData && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left column - SEO Score, Metadata and SEO recommendations */}
          <div className="space-y-8">
            <SeoScoreCard ogData={ogData} />
            <MetadataDisplay ogData={ogData} originalUrl={analyzedUrl} />
            <SeoRecommendations ogData={ogData} />
          </div>

          {/* Right column - Preview tabs (sticky on desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PreviewTabs ogData={ogData} url={analyzedUrl} />
          </div>
        </div>
      )}
    </div>
  )
}
