export interface OgData {
  title: string | null
  description: string | null
  image: string | null
  url: string | null
  siteName: string | null
  type: string | null
  finalUrl?: string // Add this field to track the final URL after redirects
}
