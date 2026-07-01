import React from "react";
import type { Article, NewsResponse } from "../types";
import NewsCard from "./NewsCard";

interface NewsGridProps {
  data: NewsResponse | null;
  loading: boolean;
  error: string | null;
  page: number;
  onPageChange: (p: number) => void;
}

function Skeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
          <div className="h-5 w-12 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function NewsGrid({ data, loading, error, page, onPageChange }: NewsGridProps) {
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="font-semibold text-gray-700 mb-1">Could not load news</h3>
          <p className="text-sm text-gray-500">{error}</p>
          <p className="text-xs text-gray-400 mt-2">Make sure the backend server is running on port 4000</p>
        </div>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!data || data.articles.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-semibold text-gray-700 mb-1">No articles found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters or search term</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className={`p-6 ${loading ? "opacity-60 pointer-events-none" : ""} transition-opacity`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(data.totalPages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-9 h-9 text-sm rounded-lg border transition-colors ${
                      p === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              {data.totalPages > 7 && (
                <span className="w-9 h-9 flex items-center justify-center text-gray-400">…</span>
              )}
            </div>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= data.totalPages}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-4">
          Showing {(page - 1) * data.limit + 1}–{Math.min(page * data.limit, data.total)} of {data.total} articles
        </p>
      </div>
    </div>
  );
}
