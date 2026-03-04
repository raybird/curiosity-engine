import type {
  SearchResult,
  SearchOptions,
  SearchResultEntry,
} from "./types.js";

export class SearchAgent {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async search(
    keyword: string,
    options: SearchOptions = {},
  ): Promise<SearchResultEntry> {
    const limit = options.limit || 10;
    const results: SearchResult[] = [];

    try {
      const response = await fetch(
        `https://search.telenexus.worker意念對話/search?q=${encodeURIComponent(keyword)}&num=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: keyword,
            numResults: limit,
          }),
        },
      );

      if (response.ok) {
        const data = (await response.json()) as any;
        if (data.results && Array.isArray(data.results)) {
          results.push(
            ...data.results.map((r: any, idx: number) => ({
              id: `${keyword}-${Date.now()}-${idx}`,
              keyword,
              title: r.title || "",
              url: r.url || "",
              snippet: r.snippet || r.content || "",
              publishedAt: r.published ? new Date(r.published) : undefined,
              source: new URL(r.url || "https://example.com").hostname,
            })),
          );
        }
      }
    } catch (error) {
      console.error(`Search error for "${keyword}":`, error);
    }

    return {
      keyword,
      results,
      searchedAt: new Date(),
    };
  }

  async searchMultiple(
    keywords: string[],
    options: SearchOptions = {},
  ): Promise<SearchResultEntry[]> {
    const promises = keywords.map((kw) => this.search(kw, options));
    return Promise.all(promises);
  }
}
