import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, ImageIcon, Type, FileText, Link2, Search, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import type { OgData } from "@/lib/types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { analyzeSeo } from "@/lib/seo-recommendations"
import type { SeoRecommendationResult } from "@/lib/seo-recommendations"

interface SeoRecommendationsProps {
  ogData: OgData
}

// Define the structure for each recommendation section
interface RecommendationSection {
  id: string
  label: string
  iconType: string
  getStatus: (data: SeoRecommendationResult) => string
  contentComponent: React.FC<{ data: SeoRecommendationResult }>
}

// Component for Keywords section
const KeywordsContent: React.FC<{ data: SeoRecommendationResult }> = ({ data }) => (
  <div className="space-y-3 text-sm">
    <p className="text-muted-foreground">{data.keywords.analysis}</p>

    {data.keywords.suggested.length > 0 && (
      <div className="mt-4 space-y-2">
        <p className="font-medium">Suggested Keywords:</p>
        <div className="flex flex-wrap gap-2">
          {data.keywords.suggested.map((keyword, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>
    )}

    <BestPracticesList
      title="Keyword Best Practices"
      items={[
        "Include your primary keyword in both title and description",
        "Place important keywords near the beginning of your title",
        "Use related keywords and synonyms naturally in your description",
        "Avoid keyword stuffing which can harm SEO",
      ]}
    />
  </div>
)

// Component for Title section
const TitleContent: React.FC<{ data: SeoRecommendationResult }> = ({ data }) => (
  <div className="space-y-3 text-sm">
    <div className="flex items-center gap-2">
      <p className="text-muted-foreground flex-1">{data.title.recommendation}</p>
      <Badge variant="outline" className="whitespace-nowrap">
        {data.title.length || 0} / 60 chars
      </Badge>
    </div>

    <ProgressBar
      value={data.title.length || 0}
      max={60}
      thresholds={{ low: 10, medium: 30, high: 60 }}
      labels={["0", "30", "60"]}
    />

    <BestPracticesList
      title="Title Best Practices"
      items={[
        "Aim for 50-60 characters",
        "Include your primary keyword near the beginning",
        "Make it compelling and descriptive",
        "Each page should have a unique title",
      ]}
    />
  </div>
)

// Component for Description section
const DescriptionContent: React.FC<{ data: SeoRecommendationResult }> = ({ data }) => (
  <div className="space-y-3 text-sm">
    <div className="flex items-center gap-2">
      <p className="text-muted-foreground flex-1">{data.description.recommendation}</p>
      <Badge variant="outline" className="whitespace-nowrap">
        {data.description.length || 0} / 160 chars
      </Badge>
    </div>

    <ProgressBar
      value={data.description.length || 0}
      max={160}
      thresholds={{ low: 50, medium: 80, high: 160 }}
      labels={["0", "80", "160"]}
    />

    <BestPracticesList
      title="Description Best Practices"
      items={[
        "Aim for 140-160 characters",
        "Include relevant keywords naturally",
        "Provide a clear summary of the page content",
        "Consider adding a call to action",
      ]}
    />
  </div>
)

// Component for Image section
const ImageContent: React.FC<{ data: SeoRecommendationResult }> = ({ data }) => (
  <div className="space-y-3 text-sm">
    <p className="text-muted-foreground">{data.image.recommendation}</p>

    <BestPracticesList
      title="Image Best Practices"
      items={[
        "Use 1200×630 pixels for optimal display across platforms",
        "Keep file size under 1MB for faster loading",
        "Use high-quality, relevant images that represent your content",
        "Include branding elements for recognition",
      ]}
    />

    {data.image.status === "good" && (
      <div className="mt-4 p-3 border rounded-md flex items-center gap-3">
        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">Image Detected</p>
          <p className="text-xs text-muted-foreground">Ensure your image is high quality and relevant</p>
        </div>
      </div>
    )}
  </div>
)

// Component for URL section
const UrlContent: React.FC<{ data: SeoRecommendationResult }> = ({ data }) => (
  <div className="space-y-3 text-sm">
    <p className="text-muted-foreground">{data.url.recommendation}</p>

    <BestPracticesList
      title="URL Best Practices"
      items={[
        "Use canonical URLs to avoid duplicate content issues",
        "Keep URLs short, descriptive, and readable",
        "Include relevant keywords in the URL structure",
        "Use hyphens to separate words (not underscores)",
      ]}
    />
  </div>
)

// Reusable component for best practices list
interface BestPracticesListProps {
  title: string
  items: string[]
}

const BestPracticesList: React.FC<BestPracticesListProps> = ({ title, items }) => (
  <div className="mt-4 rounded-md bg-muted/50 p-3">
    <h4 className="font-medium mb-2">{title}:</h4>
    <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)

// Reusable component for progress bars
interface ProgressBarProps {
  value: number
  max: number
  thresholds: {
    low: number
    medium: number
    high: number
  }
  labels: string[]
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, thresholds, labels }) => {
  const getProgressColor = () => {
    if (value === 0) return "w-0"
    if (value < thresholds.low) return "w-1/6 bg-destructive"
    if (value < thresholds.medium) return "w-2/6 bg-yellow-500"
    if (value <= thresholds.high) return "w-5/6 bg-green-500"
    return "w-full bg-destructive"
  }

  return (
    <div className="relative pt-2">
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${getProgressColor()}`} />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        {labels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  )
}

// Status badge component
interface StatusBadgeProps {
  status: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "good":
      return (
        <Badge className="bg-green-500 hover:bg-green-600 gap-1">
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Good</span>
        </Badge>
      )
    case "fair":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600 gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Fair</span>
        </Badge>
      )
    case "poor":
      return (
        <Badge className="bg-orange-500 hover:bg-orange-600 gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Needs Improvement</span>
        </Badge>
      )
    case "missing":
      return (
        <Badge className="bg-destructive hover:bg-destructive/90 gap-1">
          <XCircle className="h-3.5 w-3.5" />
          <span>Missing</span>
        </Badge>
      )
    default:
      return null
  }
}

// Section icon component
interface SectionIconProps {
  type: string
}

const SectionIcon: React.FC<SectionIconProps> = ({ type }) => {
  switch (type) {
    case "title":
      return <Type className="h-5 w-5 text-primary" />
    case "description":
      return <FileText className="h-5 w-5 text-primary" />
    case "image":
      return <ImageIcon className="h-5 w-5 text-primary" />
    case "url":
      return <Link2 className="h-5 w-5 text-primary" />
    case "keywords":
      return <Search className="h-5 w-5 text-primary" />
    default:
      return <HelpCircle className="h-5 w-5 text-primary" />
  }
}

export function SeoRecommendations({ ogData }: SeoRecommendationsProps) {
  // Get SEO recommendations from the utility function
  const seoRecommendations = analyzeSeo(ogData)

  // Define all recommendation sections
  const sections: RecommendationSection[] = [
    {
      id: "keywords",
      label: "Keywords",
      iconType: "keywords",
      getStatus: (data) => data.keywords.status,
      contentComponent: KeywordsContent,
    },
    {
      id: "title",
      label: "Title",
      iconType: "title",
      getStatus: (data) => data.title.status,
      contentComponent: TitleContent,
    },
    {
      id: "description",
      label: "Description",
      iconType: "description",
      getStatus: (data) => data.description.status,
      contentComponent: DescriptionContent,
    },
    {
      id: "image",
      label: "Image",
      iconType: "image",
      getStatus: (data) => data.image.status,
      contentComponent: ImageContent,
    },
    {
      id: "url",
      label: "URL",
      iconType: "url",
      getStatus: (data) => data.url.status,
      contentComponent: UrlContent,
    },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>SEO Recommendations</CardTitle>
        <CardDescription>
          Optimize your Open Graph metadata for better search visibility and social sharing
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id} className="relative">
              <div className="absolute right-12 top-3 z-10">
                <StatusBadge status={section.getStatus(seoRecommendations)} />
              </div>
              <AccordionTrigger className="flex items-center py-3 hover:no-underline group">
                <div className="flex items-center gap-2">
                  <SectionIcon type={section.iconType} />
                  <span>{section.label}</span>
                </div>
                {/* The status badge will now be rendered outside the trigger content */}
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <section.contentComponent data={seoRecommendations} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
