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
  AI: "bg-violet-100 text-violet-700",
  Technology: "bg-blue-100 text-blue-700",
  Automation: "bg-cyan-100 text-cyan-700",
  Analytics: "bg-teal-100 text-teal-700",
  Sustainability: "bg-green-100 text-green-700",
  "Supply Chain": "bg-yellow-100 text-yellow-700",
  Payments: "bg-orange-100 text-orange-700",
  "Machine Learning": "bg-purple-100 text-purple-700",
  Startups: "bg-pink-100 text-pink-700",
  Operations: "bg-gray-100 text-gray-700",
};

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

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Image */}
      {article.imageUrl && (
        <div className="h-40 overflow-hidden bg-gray-100">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).parentElement!.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        {/* Source + Region */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
            {article.source}
          </span>
          <span className="text-xs text-gray-400">
            {REGION_FLAGS[article.region] || ""} {article.region}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-900 line-clamp-3 group-hover:text-blue-700 transition-colors leading-snug mb-2 flex-1">
          {article.title}
        </h2>

        {/* Description */}
        {article.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{article.description}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {article.industries.slice(0, 2).map((ind) => (
            <span key={ind} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {ind}
            </span>
          ))}
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] || "bg-gray-100 text-gray-600"}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Time */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timeAgo}
        </div>
      </div>
    </a>
  );
}
