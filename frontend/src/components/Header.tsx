import React from "react";

interface HeaderProps {
  total: number;
  loading: boolean;
  onRefresh: () => void;
  lastUpdated: Date | null;
}

export default function Header({ total, loading, onRefresh, lastUpdated }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-lg p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-6 4h2" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">RetailAI News Portal</h1>
            <p className="text-blue-200 text-xs">Consumer Products · Retail · Tech & AI Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {total > 0 && (
            <span className="bg-white/20 text-sm px-3 py-1 rounded-full font-medium">
              {total.toLocaleString()} articles
            </span>
          )}
          {lastUpdated && (
            <span className="text-blue-200 text-xs hidden sm:block">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>
    </header>
  );
}
