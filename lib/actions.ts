"use server"

import type { OgData } from "./types"
import { parse } from "node-html-parser"
import { normalizeUrl, resolveUrl } from "./url-utils"

export async function fetchOgData(url: string): Promise<OgData> {
  try {
    // Normalize the URL (add protocol if missing)
    const normalizedUrl = normalizeUrl(url)

    // Fetch the HTML content with redirect following
    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OGDebugger/1.0; +https://example.com)",
      },
      redirect: "follow", // Ensure redirects are followed
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`)
    }

    // Get the final URL after redirects
    const finalUrl = response.url

    const html = await response.text()

    // Parse the HTML
    const root = parse(html)

    // Extract Open Graph metadata
    const ogData: OgData = {
      title: null,
      description: null,
      image: null,
      url: null,
      siteName: null,
      type: null,
      finalUrl: finalUrl, // Store the final URL after redirects
    }

    // Get Open Graph tags
    const metaTags = root.querySelectorAll("meta")

    metaTags.forEach((tag) => {
      const property = tag.getAttribute("property") || tag.getAttribute("name")
      const content = tag.getAttribute("content")

      if (!property || !content) return

      if (property === "og:title") {
        ogData.title = content
      } else if (property === "og:description") {
        ogData.description = content
      } else if (property === "og:image") {
        // Use the resolveUrl utility to handle relative URLs
        ogData.image = resolveUrl(content, finalUrl)
      } else if (property === "og:url") {
        ogData.url = content
      } else if (property === "og:site_name") {
        ogData.siteName = content
      } else if (property === "og:type") {
        ogData.type = content
      }
    })

    // Fallbacks for missing OG tags
    if (!ogData.title) {
      const titleTag = root.querySelector("title")
      if (titleTag) {
        ogData.title = titleTag.text
      }
    }

    if (!ogData.description) {
      const descTag = root.querySelector('meta[name="description"]')
      if (descTag) {
        ogData.description = descTag.getAttribute("content")
      }
    }

    // If no image was found, look for other common image meta tags
    if (!ogData.image) {
      const twitterImage = root.querySelector('meta[name="twitter:image"]')
      if (twitterImage) {
        const content = twitterImage.getAttribute("content")
        if (content) {
          // Use the resolveUrl utility to handle relative URLs
          ogData.image = resolveUrl(content, finalUrl)
        }
      }
    }

    return ogData
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Invalid URL")) {
      throw new Error("Invalid URL format. Please enter a valid URL.")
    } else if (error instanceof Error) {
      throw new Error(`Error fetching Open Graph data: ${error.message}`)
    }
    throw new Error("Unknown error occurred while fetching Open Graph data")
  }
}
