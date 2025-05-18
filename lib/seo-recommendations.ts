import type { OgData } from "./types"

// Types for SEO recommendations
export interface SeoRecommendationResult {
  title: {
    status: string
    recommendation: string
    length: number
  }
  description: {
    status: string
    recommendation: string
    length: number
  }
  image: {
    status: string
    recommendation: string
  }
  url: {
    status: string
    recommendation: string
  }
  keywords: {
    status: string
    analysis: string
    suggested: string[]
  }
  overallScore: string
  numericScore: number // Added numeric score
  componentWeights: {
    title: number
    description: number
    image: number
    url: number
    keywords: number
  }
}

/**
 * Analyzes Open Graph metadata and provides SEO recommendations
 * @param ogData The Open Graph metadata to analyze
 * @returns Object containing SEO recommendations
 */
export function analyzeSeo(ogData: OgData): SeoRecommendationResult {
  // Analyze title
  const titleLength = ogData.title?.length || 0
  const titleStatus = !ogData.title
    ? "missing"
    : titleLength < 10
      ? "poor"
      : titleLength > 60
        ? "poor"
        : titleLength < 30
          ? "fair"
          : "good"

  // Analyze description
  const descLength = ogData.description?.length || 0
  const descStatus = !ogData.description
    ? "missing"
    : descLength < 50
      ? "poor"
      : descLength > 160
        ? "poor"
        : descLength < 80
          ? "fair"
          : "good"

  // Analyze image
  const imageStatus = !ogData.image ? "missing" : "good"

  // Analyze URL
  const urlStatus = !ogData.url ? "missing" : "good"

  // Analyze keywords
  const { keywordStatus, keywordAnalysis, suggestedKeywords } = analyzeKeywords(ogData)

  // Define component weights (must match those in the SeoScoreCard component)
  const componentWeights = {
    title: 0.25,
    description: 0.25,
    image: 0.2,
    url: 0.1,
    keywords: 0.2,
  }

  // Calculate overall score
  const overallScore = getOverallScore(titleStatus, descStatus, imageStatus, urlStatus, keywordStatus)

  // Calculate numeric score (0-100)
  const numericScore = calculateNumericScore(
    titleStatus,
    descStatus,
    imageStatus,
    urlStatus,
    keywordStatus,
    componentWeights,
  )

  return {
    title: {
      status: titleStatus,
      recommendation: getTitleRecommendation(ogData.title, titleLength),
      length: titleLength,
    },
    description: {
      status: descStatus,
      recommendation: getDescriptionRecommendation(ogData.description, descLength),
      length: descLength,
    },
    image: {
      status: imageStatus,
      recommendation: getImageRecommendation(ogData.image),
    },
    url: {
      status: urlStatus,
      recommendation: getUrlRecommendation(ogData.url),
    },
    keywords: {
      status: keywordStatus,
      analysis: keywordAnalysis,
      suggested: suggestedKeywords,
    },
    overallScore,
    numericScore,
    componentWeights,
  }
}

/**
 * Calculates a numeric score (0-100) based on individual component scores
 * @param title Title status
 * @param desc Description status
 * @param image Image status
 * @param url URL status
 * @param keywords Keywords status
 * @param weights Component weights
 * @returns Numeric score between 0 and 100
 */
function calculateNumericScore(
  title: string,
  desc: string,
  image: string,
  url: string,
  keywords: string,
  weights: {
    title: number
    description: number
    image: number
    url: number
    keywords: number
  },
): number {
  // Convert statuses to numeric scores
  const scores = {
    good: 100,
    fair: 60,
    poor: 30,
    missing: 0,
  }

  // Calculate weighted score
  const weightedScore =
    scores[title as keyof typeof scores] * weights.title +
    scores[desc as keyof typeof scores] * weights.description +
    scores[image as keyof typeof scores] * weights.image +
    scores[url as keyof typeof scores] * weights.url +
    scores[keywords as keyof typeof scores] * weights.keywords

  // Round to nearest integer
  return Math.round(weightedScore)
}

/**
 * Analyzes title and provides recommendations
 * @param title The title to analyze
 * @param length The length of the title
 * @returns Recommendation string
 */
function getTitleRecommendation(title: string | null, length: number): string {
  if (!title) {
    return "Your page is missing a title. Add a descriptive title that includes your primary keyword."
  }

  if (length < 10) {
    return "Your title is too short. Create a more descriptive title that clearly explains your content."
  }

  if (length > 60) {
    return "Your title is too long and may be truncated in search results. Consider shortening it to 50-60 characters."
  }

  if (length < 30) {
    return "Your title could be more descriptive. Consider adding more relevant information."
  }

  return "Your title length is good. Ensure it accurately represents your content and includes relevant keywords."
}

/**
 * Analyzes description and provides recommendations
 * @param description The description to analyze
 * @param length The length of the description
 * @returns Recommendation string
 */
function getDescriptionRecommendation(description: string | null, length: number): string {
  if (!description) {
    return "Your page is missing a description. Add a compelling description that summarizes your content."
  }

  if (length < 50) {
    return "Your description is too short. Provide more details about your content to improve click-through rates."
  }

  if (length > 160) {
    return "Your description is too long and may be truncated in search results. Consider shortening it to 140-160 characters."
  }

  if (length < 80) {
    return "Your description could be more detailed. Consider adding more relevant information and keywords."
  }

  return "Your description length is good. Ensure it accurately summarizes your content and includes relevant keywords."
}

/**
 * Analyzes image and provides recommendations
 * @param image The image URL to analyze
 * @returns Recommendation string
 */
function getImageRecommendation(image: string | null): string {
  if (!image) {
    return "Your page is missing an Open Graph image. Add a high-quality image to improve visibility in social shares."
  }

  return "You have an Open Graph image. Ensure it's high quality, relevant to your content, and properly sized (1200×630 pixels)."
}

/**
 * Analyzes URL and provides recommendations
 * @param url The URL to analyze
 * @returns Recommendation string
 */
function getUrlRecommendation(url: string | null): string {
  if (!url) {
    return "Your page is missing a canonical URL. Add the og:url tag to prevent duplicate content issues."
  }

  return "You have specified a canonical URL. Ensure it matches your preferred URL structure and is consistent across your site."
}

/**
 * Calculates overall SEO score based on individual scores
 * @param title Title status
 * @param desc Description status
 * @param image Image status
 * @param url URL status
 * @param keywords Keywords status
 * @returns Overall score as a string
 */
function getOverallScore(title: string, desc: string, image: string, url: string, keywords: string): string {
  // Convert statuses to numeric scores
  const scores = {
    good: 3,
    fair: 2,
    poor: 1,
    missing: 0,
  }

  // Calculate average score
  const totalScore =
    scores[title as keyof typeof scores] +
    scores[desc as keyof typeof scores] +
    scores[image as keyof typeof scores] +
    scores[url as keyof typeof scores] +
    scores[keywords as keyof typeof scores]

  const avgScore = totalScore / 5

  // Return overall rating
  if (avgScore >= 2.5) return "Good"
  if (avgScore >= 1.5) return "Needs Improvement"
  return "Poor"
}

/**
 * Analyzes keywords in metadata
 * @param ogData The Open Graph metadata to analyze
 * @returns Object with keyword status, analysis, and suggestions
 */
function analyzeKeywords(ogData: OgData): {
  keywordStatus: string
  keywordAnalysis: string
  suggestedKeywords: string[]
} {
  const title = ogData.title || ""
  const description = ogData.description || ""
  const siteName = ogData.siteName || ""

  // If title or description is missing, return early
  if (!title && !description) {
    return {
      keywordStatus: "missing",
      keywordAnalysis:
        "Both title and description are missing. Add these elements with relevant keywords to improve SEO.",
      suggestedKeywords: [],
    }
  }

  // Extract potential keywords from title and description
  const extractKeywords = (text: string): string[] => {
    if (!text) return []

    // Remove common stop words
    const stopWords = new Set([
      "a",
      "an",
      "the",
      "and",
      "or",
      "but",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "being",
      "in",
      "on",
      "at",
      "to",
      "for",
      "with",
      "by",
      "about",
      "against",
      "between",
      "into",
      "through",
      "during",
      "before",
      "after",
      "above",
      "below",
      "from",
      "up",
      "down",
      "of",
      "off",
      "over",
      "under",
      "again",
      "further",
      "then",
      "once",
      "here",
      "there",
      "when",
      "where",
      "why",
      "how",
      "all",
      "any",
      "both",
      "each",
      "few",
      "more",
      "most",
      "other",
      "some",
      "such",
      "no",
      "nor",
      "not",
      "only",
      "own",
      "same",
      "so",
      "than",
      "too",
      "very",
      "s",
      "t",
      "can",
      "will",
      "just",
      "don",
      "should",
      "now",
    ])

    // Clean text, split into words, filter out stop words and short words
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => !stopWords.has(word) && word.length > 3)
      .map((word) => word.trim())
  }

  const titleKeywords = extractKeywords(title)
  const descKeywords = extractKeywords(description)

  // Find common keywords between title and description
  const commonKeywords = titleKeywords.filter((keyword) => descKeywords.includes(keyword))

  // Check if site name is in title (common SEO practice)
  const siteNameInTitle = siteName ? title.toLowerCase().includes(siteName.toLowerCase()) : false

  // Generate suggested keywords based on frequency and position
  const allKeywords = [...titleKeywords, ...descKeywords]
  const keywordFrequency: Record<string, number> = {}

  allKeywords.forEach((keyword) => {
    keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1
  })

  // Sort keywords by frequency
  const suggestedKeywords = Object.entries(keywordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry) => entry[0])

  // Determine keyword status and analysis
  let keywordStatus = "good"
  let keywordAnalysis = ""

  if (commonKeywords.length === 0) {
    keywordStatus = "poor"
    keywordAnalysis =
      "No common keywords found between title and description. Using consistent keywords across metadata improves SEO."
  } else if (commonKeywords.length < 2) {
    keywordStatus = "fair"
    keywordAnalysis = `Found ${commonKeywords.length} common keyword between title and description. Consider adding more consistent keywords.`
  } else {
    keywordAnalysis = `Found ${commonKeywords.length} common keywords between title and description, which is good for SEO consistency.`
  }

  // Check keyword placement in title
  if (titleKeywords.length > 0) {
    const firstKeyword = titleKeywords[0]
    if (commonKeywords.includes(firstKeyword)) {
      keywordAnalysis += " Your primary keyword appears at the beginning of the title, which is excellent for SEO."
    } else {
      keywordStatus = keywordStatus === "good" ? "fair" : keywordStatus
      keywordAnalysis += " Consider placing your most important keyword at the beginning of your title."
    }
  }

  // Check for site name in title
  if (siteName && !siteNameInTitle) {
    keywordAnalysis += " Consider including your site or brand name in the title for better recognition."
  }

  return {
    keywordStatus,
    keywordAnalysis,
    suggestedKeywords,
  }
}
