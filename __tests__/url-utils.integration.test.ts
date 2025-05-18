import { isValidUrl, normalizeUrl, extractDomain, resolveUrl } from "@/lib/url-utils"

describe("URL Utilities Integration Tests", () => {
  // Test the integration between different URL utility functions

  test("should validate, normalize, and extract domain from a URL", () => {
    const testUrl = "example.com"

    // First validate the URL
    const isValid = isValidUrl(testUrl)
    expect(isValid).toBe(true)

    // Then normalize it
    const normalized = normalizeUrl(testUrl)
    expect(normalized).toBe("https://example.com")

    // Finally extract the domain
    const domain = extractDomain(normalized)
    expect(domain).toBe("example.com")
  })

  test("should handle a complete URL processing flow", () => {
    // Start with a relative image URL and a base URL
    const relativeImageUrl = "/images/logo.png"
    const baseUrl = "example.com"

    // Validate and normalize the base URL
    expect(isValidUrl(baseUrl)).toBe(true)
    const normalizedBaseUrl = normalizeUrl(baseUrl)
    expect(normalizedBaseUrl).toBe("https://example.com")

    // Resolve the relative image URL against the normalized base URL
    const absoluteImageUrl = resolveUrl(relativeImageUrl, normalizedBaseUrl)
    expect(absoluteImageUrl).toBe("https://example.com/images/logo.png")

    // Extract the domain from the absolute image URL
    const domain = extractDomain(absoluteImageUrl)
    expect(domain).toBe("example.com")
  })

  test("should handle edge cases in a complete flow", () => {
    // Test with a URL that has whitespace
    const messyUrl = " www.example.com/path "

    // Validate
    expect(isValidUrl(messyUrl)).toBe(true)

    // Normalize
    const normalizedUrl = normalizeUrl(messyUrl)
    expect(normalizedUrl).toBe("https://www.example.com/path")

    // Extract domain
    const domain = extractDomain(normalizedUrl)
    expect(domain).toBe("www.example.com")

    // Resolve a relative URL against it
    const absoluteUrl = resolveUrl("../images/logo.png", normalizedUrl)
    expect(absoluteUrl).toBe("https://www.example.com/images/logo.png")
  })

  test("should handle protocol-relative URLs in a complete flow", () => {
    const baseUrl = "https://example.com"
    const protocolRelativeUrl = "//cdn.example.com/image.jpg"

    // Resolve the protocol-relative URL
    const absoluteUrl = resolveUrl(protocolRelativeUrl, baseUrl)
    expect(absoluteUrl).toBe("https://cdn.example.com/image.jpg")

    // Validate the resolved URL
    expect(isValidUrl(absoluteUrl)).toBe(true)

    // Extract domain from the resolved URL
    const domain = extractDomain(absoluteUrl)
    expect(domain).toBe("cdn.example.com")
  })
})
