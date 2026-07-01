import React, { useState, useEffect, useCallback, useRef } from "react";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import NewsGrid from "./components/NewsGrid";
import type { Filters, MetaResponse, NewsResponse } from "./types";

const DEFAULT_FILTERS: Filters = {
  industries: [],
  regions: [],
  tags: [],
  keyword: "",
  months: 6,
  companies: [],
};

const API = "/api/news";

export default function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [meta, setMeta] = useState<MetaResponse | null>(null);
  const [data, setData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Load metadata on mount
  useEffect(() => {
    fetch(`${API}/meta`)
      .then((r) => r.json())
      .then(setMeta)
      .catch(() => {});
  }, []);

  // Debounce filters
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedFilters(filters);
      setPage(1);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [filters]);

  const fetchNews = useCallback(
    async (p = 1) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (debouncedFilters.industries.length) params.set("industries", debouncedFilters.industries.join(","));
        if (debouncedFilters.regions.length) params.set("regions", debouncedFilters.regions.join(","));
        if (debouncedFilters.tags.length) params.set("tags", debouncedFilters.tags.join(","));

        // Merge keyword + companies into a single keyword query
        const terms = [
          debouncedFilters.keyword,
          ...debouncedFilters.companies,
        ].filter(Boolean);
        if (terms.length) params.set("keyword", terms.join(" "));

        params.set("months", String(debouncedFilters.months));
        params.set("page", String(p));
        params.set("limit", "20");

        const res = await fetch(`${API}?${params}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const json: NewsResponse = await res.json();
        setData(json);
        setLastUpdated(new Date());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [debouncedFilters]
  );

  useEffect(() => {
    fetchNews(page);
  }, [debouncedFilters, page, fetchNews]);

  function handleRefresh() {
    fetch(`${API}/refresh`, { method: "POST" }).finally(() => fetchNews(page));
  }

  function handlePageChange(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        total={data?.total ?? 0}
        loading={loading}
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
      />

      <div className="flex flex-1 overflow-hidden">
        <FilterPanel filters={filters} meta={meta} onChange={setFilters} />
        <NewsGrid
          data={data}
          loading={loading}
          error={error}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
