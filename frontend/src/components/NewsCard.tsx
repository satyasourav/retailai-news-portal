import React from "react";
import { formatDistanceToNow } from "date-fns";
import type { Article } from "../types";

const REGION_FLAGS: Record<string, string> = {
  "North America": "🇺🇸",
  "Europe": "🇪🇺",
  "Asia Pacific": "🌏",
  "Global": "🌐",
};

const TAG_COLORS: Record<string, string> = {
  AI: "bg-accenture-100 text-accenture-700 border border-accenture-200",
  Technology: "bg-violet-100 text-violet-700 border border-violet-200",
  Automation: "bg-cyan-100 text-cyan-700 border border-cyan-200",
  Analytics: "bg-teal-100 text-teal-700 border border-teal-200",
  Sustainability: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "Supply Chain": "bg-amber-100 text-amber-700 border border-amber-200",
  Payments: "bg-orange-100 text-orange-700 border border-orange-200",
  "Machine Learning": "bg-purple-100 text-purple-700 border border-purple-200",
  Startups: "bg-pink-100 text-pink-700 border border-pink-200",
  Operations: "bg-gray-100 text-gray-600 border border-gray-200",
};

// Rotate accent bar colors per source to add visual variety
const ACCENT_COLORS = [
  "from-accenture-500 to-accenture-300",
  "from-violet-600 to-purple-400",
  "from-fuchsia-600 to-pink-400",
  "from-accenture-800 to-accenture-500",
  "from-purple-700 to-violet-500",
];

function getAccentColor(source: string) {
  let hash = 0;
  for (let i = 0; i < source.length; i++) hash = source.charCodeAt(i) + ((hash << 5) - hash);
  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
    } catch {
      return "";
    }
  })();

  const accent = getAccentColor(article.source);

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col
                 shadow-card hover:shadow-card-hover
                 border border-gray-100 hover:border-accenture-200
                 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${accent} flex-shrink-0`} />

      {/* Image */}
      {article.imageUrl ? (
        <div className="h-40 overflow-hidden bg-gray-50 relative">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).parentElement!.style.display = "none";
            }}
          />
          {/* Image overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        /* Fallback decorative background when no image */
        <div className={`h-24 bg-gradient-to-br ${accent} opacity-10 flex items-center justify-center`}>
          <svg className="w-10 h-10 text-accenture-500 opacity-30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-6 4h2" />
          </svg>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        {/* Source + Region */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-accenture-600 uppercase tracking-wider truncate max-w-[60%]">
            {article.source}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
            <span>{REGION_FLAGS[article.region] || "🌐"}</span>
            <span className="hidden sm:inline">{article.region}</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-900 line-clamp-3 group-hover:text-accenture-600
                       transition-colors duration-200 leading-snug mb-2 flex-1">
          {article.title}
        </h2>

        {/* Description */}
        {article.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
            {article.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {article.industries.slice(0, 1).map((ind) => (
            <span key={ind}
              className="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
              {ind}
            </span>
          ))}
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] || "bg-gray-100 text-gray-600"}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: time + read indicator */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeAgo}
          </div>
          <span className="text-xs text-accenture-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
            Read →
          </span>
        </div>
      </div>

      {/* Subtle glow ring on hover */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-accenture-400 ring-opacity-0 group-hover:ring-opacity-20 transition-all duration-300 pointer-events-none" />
    </a>
  );
}
