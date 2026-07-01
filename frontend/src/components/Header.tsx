import React from "react";

interface HeaderProps {
  total: number;
  loading: boolean;
  onRefresh: () => void;
  lastUpdated: Date | null;
}

export default function Header({ total, loading, onRefresh, lastUpdated }: HeaderProps) {
  return (
    <header className="bg-accenture-gradient text-white shadow-xl relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-0 right-0 w-64 h-16 bg-accenture-400 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-32 h-10 bg-accenture-300 opacity-15 rounded-full blur-2xl translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-2 shadow-inner">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-tight">RetailAI News Portal</h1>
            <p className="text-accenture-200 text-xs font-medium">
              Consumer Products · Retail · Tech &amp; AI Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {total > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-sm px-3 py-1.5 rounded-full font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {total.toLocaleString()} articles
            </div>
          )}
          {lastUpdated && (
            <span className="text-accenture-200 text-xs hidden lg:block">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm
                       border border-white/20 transition-all duration-200
                       px-3 py-1.5 rounded-full text-sm font-medium
                       disabled:opacity-50 shadow-inner hover:shadow-md"
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
