export interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  publishedAt: string;
  source: string;
  region: string;
  industries: string[];
  tags: string[];
  imageUrl: string | null;
}

export interface NewsResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  articles: Article[];
}

export interface MetaResponse {
  industries: string[];
  industryGroups: Record<string, string[]>;
  regions: string[];
  tags: string[];
  sources: { name: string; region: string; industries: string[] }[];
}

export interface Filters {
  industries: string[];
  regions: string[];
  tags: string[];
  keyword: string;
  months: number;
  companies: string[];
}
