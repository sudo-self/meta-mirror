import { isValidUrl, normalizeUrl, extractDomain, resolveUrl } from "@/lib/url-utils"

describe("URL Utilities", () => {
  // Tests for isValidUrl function
  describe("isValidUrl", () => {
    test("should return true for valid URLs with protocol", () => {
      expect(isValidUrl("https://example.com")).toBe(true)
      expect(isValidUrl("http://example.com")).toBe(true)
      expect(isValidUrl("https://www.example.com")).toBe(true)
      expect(isValidUrl("https://subdomain.example.com")).toBe(true)
      expect(isValidUrl("https://example.com/path")).toBe(true)
      expect(isValidUrl("https://example.com/path?query=value")).toBe(true)
      expect(isValidUrl("https://example.com/path#fragment")).toBe(true)
      expect(isValidUrl("ftp://example.com")).toBe(true)
    })

    test("should return true for valid URLs without protocol", () => {
      expect(isValidUrl("example.com")).toBe(true)
      expect(isValidUrl("www.example.com")).toBe(true)
      expect(isValidUrl("subdomain.example.com")).toBe(true)
      expect(isValidUrl("example.com/path")).toBe(true)
      expect(isValidUrl("example.co.uk")).toBe(true)
      expect(isValidUrl("example.com/path?query=value")).toBe(true)
    })

    test("should return false for invalid URLs", () => {
      expect(isValidUrl("")).toBe(false)
      expect(isValidUrl(" ")).toBe(false)
      expect(isValidUrl("/")).toBe(false)
      expect(isValidUrl("example")).toBe(false)
      expect(isValidUrl("http://")).toBe(false)
      expect(isValidUrl("http:///example.com")).toBe(false)
      expect(isValidUrl("://example.com")).toBe(false)
      expect(isValidUrl("http:/example.com")).toBe(false)
    })

    test("should handle URLs with whitespace", () => {
      expect(isValidUrl(" https://example.com ")).toBe(true)
      expect(isValidUrl(" example.com ")).toBe(true)
    })

    test("should handle null and undefined", () => {
      expect(isValidUrl(null as unknown as string)).toBe(false)
      expect(isValidUrl(undefined as unknown as string)).toBe(false)
    })
  })

  // Tests for normalizeUrl function
  describe("normalizeUrl", () => {
    test("should return the same URL if it already has a protocol", () => {
      expect(normalizeUrl("https://example.com")).toBe("https://example.com")
      expect(normalizeUrl("http://example.com")).toBe("http://example.com")
      expect(normalizeUrl("ftp://example.com")).toBe("ftp://example.com")
    })

    test("should add https:// protocol if missing", () => {
      expect(normalizeUrl("example.com")).toBe("https://example.com")
      expect(normalizeUrl("www.example.com")).toBe("https://www.example.com")
      expect(normalizeUrl("example.com/path")).toBe("https://example.com/path")
    })

    test("should trim whitespace", () => {
      expect(normalizeUrl(" example.com ")).toBe("https://example.com")
      expect(normalizeUrl(" https://example.com ")).toBe("https://example.com")
    })

    test("should throw an error for invalid URLs", () => {
      expect(() => normalizeUrl("")).toThrow()
      expect(() => normalizeUrl("/")).toThrow("Please enter a complete URL")
      expect(() => normalizeUrl("http://")).toThrow("Invalid URL format")
      expect(() => normalizeUrl("://example.com")).toThrow("Invalid URL format")
    })
  })

  // Tests for extractDomain function
  describe("extractDomain", () => {
    test("should extract domain from URLs with protocol", () => {
      expect(extractDomain("https://example.com")).toBe("example.com")
      expect(extractDomain("http://www.example.com")).toBe("www.example.com")
      expect(extractDomain("https://subdomain.example.com")).toBe("subdomain.example.com")
      expect(extractDomain("https://example.com/path")).toBe("example.com")
      expect(extractDomain("https://example.com:8080")).toBe("example.com")
    })

    test("should extract domain from URLs without protocol", () => {
      expect(extractDomain("example.com")).toBe("example.com")
      expect(extractDomain("www.example.com")).toBe("www.example.com")
      expect(extractDomain("subdomain.example.com")).toBe("subdomain.example.com")
      expect(extractDomain("example.com/path")).toBe("example.com")
    })

    test("should handle invalid URLs gracefully", () => {
      expect(extractDomain("")).toBe("")
      expect(extractDomain("/")).toBe("/")
      expect(extractDomain("invalid")).toBe("invalid")
    })

    test("should handle URLs with whitespace", () => {
      expect(extractDomain(" https://example.com ")).toBe("example.com")
      expect(extractDomain(" example.com ")).toBe("example.com")
    })

    test("should handle null and undefined", () => {
      expect(extractDomain(null as unknown as string)).toBe("")
      expect(extractDomain(undefined as unknown as string)).toBe("")
    })
  })

  // Tests for resolveUrl function
  describe("resolveUrl", () => {
    test("should resolve root-relative URLs", () => {
      expect(resolveUrl("/path", "https://example.com")).toBe("https://example.com/path")
      expect(resolveUrl("/path/to/resource", "https://example.com")).toBe("https://example.com/path/to/resource")
      expect(resolveUrl("/path?query=value", "https://example.com")).toBe("https://example.com/path?query=value")
    })

    test("should resolve protocol-relative URLs", () => {
      expect(resolveUrl("//cdn.example.com/image.jpg", "https://example.com")).toBe("https://cdn.example.com/image.jpg")
      expect(resolveUrl("//cdn.example.com/image.jpg", "http://example.com")).toBe("http://cdn.example.com/image.jpg")
    })

    test("should return absolute URLs unchanged", () => {
      expect(resolveUrl("https://other.com/image.jpg", "https://example.com")).toBe("https://other.com/image.jpg")
      expect(resolveUrl("http://other.com/image.jpg", "https://example.com")).toBe("http://other.com/image.jpg")
    })

    test("should resolve relative URLs", () => {
      expect(resolveUrl("image.jpg", "https://example.com/path/")).toBe("https://example.com/path/image.jpg")
      expect(resolveUrl("../image.jpg", "https://example.com/path/to/")).toBe("https://example.com/path/image.jpg")
      expect(resolveUrl("./image.jpg", "https://example.com/path/")).toBe("https://example.com/path/image.jpg")
    })

    test("should handle invalid inputs gracefully", () => {
      expect(resolveUrl("", "https://example.com")).toBe("https://example.com/")
      expect(resolveUrl("image.jpg", "")).toBe("image.jpg")
      expect(resolveUrl("", "")).toBe("")
    })
  })
})
