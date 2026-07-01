import React, { useState } from "react";
import type { Filters, MetaResponse } from "../types";

interface FilterPanelProps {
  filters: Filters;
  meta: MetaResponse | null;
  onChange: (filters: Filters) => void;
}

const MONTH_OPTIONS = [
  { value: 1, label: "Last 1 month" },
  { value: 3, label: "Last 3 months" },
  { value: 6, label: "Last 6 months" },
];

const REGION_FLAGS: Record<string, string> = {
  "North America": "🇺🇸",
  "Europe": "🇪🇺",
  "Asia Pacific": "🌏",
  "Global": "🌐",
};

function MultiSelect({
  label,
  options,
  selected,
  onToggle,
  activeClass,
  icon,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  activeClass: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
        {icon}
        {label}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                active
                  ? activeClass
                  : "bg-white text-gray-500 border-gray-200 hover:border-accenture-300 hover:text-accenture-600"
              }`}
            >
              {REGION_FLAGS[opt] ? `${REGION_FLAGS[opt]} ` : ""}{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterPanel({ filters, meta, onChange }: FilterPanelProps) {
  const [companyInput, setCompanyInput] = useState("");

  function toggle(key: "industries" | "regions" | "tags", val: string) {
    const arr = filters[key];
    onChange({
      ...filters,
      [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
    });
  }

  function addCompany(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && companyInput.trim()) {
      const val = companyInput.trim();
      if (!filters.companies.includes(val)) {
        onChange({ ...filters, companies: [...filters.companies, val] });
      }
      setCompanyInput("");
    }
  }

  function removeCompany(c: string) {
    onChange({ ...filters, companies: filters.companies.filter((x) => x !== c) });
  }

  function reset() {
    onChange({ industries: [], regions: [], tags: [], keyword: "", months: 6, companies: [] });
  }

  const activeCount =
    filters.industries.length + filters.regions.length + filters.tags.length +
    filters.companies.length + (filters.keyword ? 1 : 0);

  return (
    <aside className="w-72 shrink-0 bg-white border-r border-gray-100 overflow-y-auto h-full shadow-sm">
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between
                      bg-gradient-to-r from-accenture-50 to-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-accenture-500" />
          <h2 className="font-bold text-gray-800 text-sm">Filters</h2>
        </div>
        {activeCount > 0 && (
          <button
            onClick={reset}
            className="text-xs text-accenture-600 hover:text-accenture-800 font-semibold
                       bg-accenture-50 hover:bg-accenture-100 px-2 py-1 rounded-full transition-colors"
          >
            Clear ({activeCount})
          </button>
        )}
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="mb-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </h3>
          <input
            type="text"
            placeholder="Search headlines…"
            value={filters.keyword}
            onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-accenture-400 focus:border-accenture-400
                       transition-all placeholder-gray-300"
          />
        </div>

        {/* Companies */}
        <div className="mb-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Companies
          </h3>
          <input
            type="text"
            placeholder="Type name + Enter…"
            value={companyInput}
            onChange={(e) => setCompanyInput(e.target.value)}
            onKeyDown={addCompany}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-accenture-400 focus:border-accenture-400
                       transition-all placeholder-gray-300 mb-2"
          />
          {filters.companies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-1">
              {filters.companies.map((c) => (
                <span key={c}
                  className="inline-flex items-center gap-1 bg-accenture-50 text-accenture-700
                             border border-accenture-200 text-xs px-2.5 py-1 rounded-full font-medium">
                  {c}
                  <button onClick={() => removeCompany(c)}
                    className="hover:text-red-500 transition-colors ml-0.5 font-bold">×</button>
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-300 mt-1">e.g. Walmart, Amazon, Unilever</p>
        </div>

        {/* Date range */}
        <div className="mb-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Date Range
          </h3>
          <div className="space-y-1.5">
            {MONTH_OPTIONS.map((opt) => (
              <label key={opt.value}
                className={`flex items-center gap-2.5 cursor-pointer px-3 py-2 rounded-xl border transition-all duration-200 ${
                  filters.months === opt.value
                    ? "bg-accenture-50 border-accenture-300 text-accenture-700"
                    : "border-transparent hover:border-gray-200 text-gray-600"
                }`}>
                <input
                  type="radio"
                  name="months"
                  checked={filters.months === opt.value}
                  onChange={() => onChange({ ...filters, months: opt.value })}
                  className="accent-accenture-500"
                />
                <span className="text-sm font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          {/* Industry groups */}
          {meta && meta.industryGroups ? (
            Object.entries(meta.industryGroups).map(([groupName, options]) => (
              <MultiSelect
                key={groupName}
                label={groupName === "Core" ? "Industry" : "Capabilities"}
                options={options}
                selected={filters.industries}
                onToggle={(v) => toggle("industries", v)}
                activeClass={
                  groupName === "Core"
                    ? "bg-accenture-500 text-white border-accenture-500 shadow-sm"
                    : "bg-accenture-800 text-white border-accenture-800 shadow-sm"
                }
                icon={
                  groupName === "Core"
                    ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                    : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                }
              />
            ))
          ) : meta ? (
            <MultiSelect
              label="Industry"
              options={meta.industries}
              selected={filters.industries}
              onToggle={(v) => toggle("industries", v)}
              activeClass="bg-accenture-500 text-white border-accenture-500"
            />
          ) : null}

          {/* Regions */}
          {meta && (
            <MultiSelect
              label="Region"
              options={meta.regions}
              selected={filters.regions}
              onToggle={(v) => toggle("regions", v)}
              activeClass="bg-emerald-500 text-white border-emerald-500 shadow-sm"
              icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>}
            />
          )}

          {/* Tech & AI Tags */}
          {meta && (
            <MultiSelect
              label="Tech & AI Topics"
              options={meta.tags}
              selected={filters.tags}
              onToggle={(v) => toggle("tags", v)}
              activeClass="bg-violet-600 text-white border-violet-600 shadow-sm"
              icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            />
          )}
        </div>

        {/* Sources list */}
        {meta && (
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Active Sources ({meta.sources.length})
            </h3>
            <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
              {meta.sources.map((s) => (
                <div key={s.name} className="text-xs text-gray-500 flex items-center gap-1.5 py-0.5">
                  <span className="shrink-0">{REGION_FLAGS[s.region] || "•"}</span>
                  <span className="truncate">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
