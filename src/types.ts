export interface Interest {
  keyword: string;
  category?: string;
  frequency: "daily" | "weekly" | "monthly";
  sources?: string[];
  createdAt: Date;
  lastSearched?: Date;
}

export interface InterestOptions {
  category?: string;
  frequency?: "daily" | "weekly" | "monthly";
  sources?: string[];
}

export interface SearchResult {
  id: string;
  keyword: string;
  title: string;
  url: string;
  snippet: string;
  publishedAt?: Date;
  source: string;
}

export interface SearchOptions {
  limit?: number;
  sources?: string[];
  fromDate?: string;
}

export interface CuriosityConfig {
  memory?: boolean;
  scheduler?: boolean;
  searchApiKey?: string;
}

export interface SearchResultEntry {
  results: SearchResult[];
  searchedAt: Date;
  keyword: string;
}
