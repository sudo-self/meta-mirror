/**
 * URL utility functions for the Open Graph debugger
 */

/**
 * Validates if a string is a valid URL
 * @param urlString The URL string to validate
 * @returns boolean indicating if the URL is valid
 */
export function isValidUrl(urlString: string): boolean {
  try {
    // Handle empty strings
    if (!urlString || !urlString.trim()) {
      return false
    }

    // Special case for root path
    if (urlString.trim() === "/") {
      return false
    }

    // Try to create a URL object
    const normalizedUrl = urlString.trim()

    // If it has a protocol, validate directly
    if (normalizedUrl.match(/^[a-zA-Z]+:\/\//)) {
      new URL(normalizedUrl)
      return true
    }

    // If no protocol, add https:// and validate
    new URL(`https://${normalizedUrl}`)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Normalizes a URL by adding a protocol if missing
 * @param url The URL to normalize
 * @returns The normalized URL
 * @throws Error if the URL is invalid
 */
export function normalizeUrl(url: string): string {
  // Trim whitespace
  let normalizedUrl = url.trim()

  // Handle special case for root path
  if (normalizedUrl === "/") {
    throw new Error("Please enter a complete URL (e.g., example.com)")
  }

  // Check if the URL has a protocol
  if (!normalizedUrl.match(/^[a-zA-Z]+:\/\//)) {
    // If it doesn't have a protocol, add https://
    normalizedUrl = `https://${normalizedUrl}`
  }

  try {
    // Validate the URL
    new URL(normalizedUrl)
    return normalizedUrl
  } catch (error) {
    throw new Error("Invalid URL format. Please enter a valid URL.")
  }
}

/**
 * Extracts the domain from a URL
 * @param urlString The URL to extract the domain from
 * @returns The domain or a fallback string
 */
export function extractDomain(urlString: string): string {
  try {
    // Check if the URL is valid and has a protocol
    if (!urlString) return ""

    // If it doesn't have a protocol, add one for URL parsing
    const urlWithProtocol = urlString.match(/^[a-zA-Z]+:\/\//) ? urlString : `https://${urlString}`

    return new URL(urlWithProtocol).hostname
  } catch (e) {
    // Return a fallback for invalid URLs
    return urlString || ""
  }
}

/**
 * Resolves a relative URL to an absolute URL
 * @param relativeUrl The relative URL to resolve
 * @param baseUrl The base URL to resolve against
 * @returns The resolved absolute URL
 */
export function resolveUrl(relativeUrl: string, baseUrl: string): string {
  try {
    // Handle protocol-relative URLs
    if (relativeUrl.startsWith("//")) {
      const baseUrlObj = new URL(baseUrl)
      return `${baseUrlObj.protocol}${relativeUrl}`
    }

    // Handle root-relative URLs
    if (relativeUrl.startsWith("/")) {
      const baseUrlObj = new URL(baseUrl)
      return `${baseUrlObj.origin}${relativeUrl}`
    }

    // Handle absolute URLs
    if (relativeUrl.match(/^[a-zA-Z]+:\/\//)) {
      return relativeUrl
    }

    // Handle relative URLs
    return new URL(relativeUrl, baseUrl).toString()
  } catch (e) {
    // Return the original URL if resolution fails
    return relativeUrl
  }
}
