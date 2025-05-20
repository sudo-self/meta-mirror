"use client";

import React, { useState } from "react";

interface MetadataOutput {
  title: string;
  description: string;
  generator: string;
  keywords: string[];
  icons: {
    icon: { url: string; sizes: string; type?: string; purpose?: string }[];
    apple: { url: string; sizes: string }[];
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: { url: string; width: number; height: number; alt: string }[];
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
}

const MetaTagMaker = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");  // New state for keywords
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    const metadata: MetadataOutput = {
      title: title || "Default Title",
      description: description || "Default Description",
      generator: "MetaTagMaker",
      keywords: keywords.split(",").map((keyword) => keyword.trim()), 
      icons: {
        icon: [
          {
            url: "/favicon.ico",
            sizes: "any",
            type: "image/x-icon",
          },
        ],
        apple: [
          {
            url: "/apple-touch-icon.png",
            sizes: "180x180",
          },
        ],
      },
      openGraph: {
        title: title || "Title",
        description: description || "Description",
        url: url || "https://example.com",
        siteName: "Example Site",
        images: [
          {
            url: image || "https://example.com/image.png",
            width: 1200,
            height: 630,
            alt: "Open Graph Image",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: title || "Default Title",
        description: description || "Description",
        images: [image || "https://example.com/default-image.jpg"],
      },
    };

    const outputString = `export const metadata: Metadata = ${JSON.stringify(
      metadata,
      null,
      2
    )};`;
    setOutput(outputString);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "metadata.ts";
    link.click();
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-3xl font-bold mb-6">Meta Tag Generator</h1>

      <div className="space-y-4">
        <div>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a Title"
          />
        </div>

        <div>
          <textarea
            id="description"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a Description"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-semibold mb-1">
            image
          </label>
          <input
            id="image"
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-semibold mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label htmlFor="keywords" className="block text-sm font-semibold mb-1">
            Keywords
          </label>
          <input
            id="keywords"
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="keyword, keyword, keyword, Keyword"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-150 dark:bg-gray-900 dark:hover:bg-gray-700"
        >
          Generate Metadata
        </button>
      </div>

      {/* Output Section */}
      {output && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Generated Metadata</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md max-h-96 overflow-auto whitespace-pre-wrap text-sm text-gray-900 dark:text-white">
            {output}
          </pre>
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleCopyToClipboard}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
            >
              Copy
            </button>
            <button
              onClick={handleDownload}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
            >
              Download
            </button>
          </div>
        </div>
      )}

{/* Live Preview */}
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
  <div className="bg-gray-100 p-4 rounded-md dark:bg-gray-800">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
      {title || "Title"}
    </h3>
    <p className="text-gray-700 dark:text-gray-300">
      {description || "Description"}
    </p>
    <img
      src={image || "/placeholder.svg"}
      alt="Preview"
      className="mt-4 w-full max-h-64 object-cover rounded"
    />
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      URL: {url || "https://example.com"}
    </p>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      Keywords: {keywords || "keywords"}
    </p>
  </div>
</div>
    </div>
  );
};

export default MetaTagMaker;









