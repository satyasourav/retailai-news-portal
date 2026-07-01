import React, { useState } from "react";
import type { Filters, MetaResponse } from "../types";

interface FilterPanelProps {
  filters: Filters;
  meta: MetaResponse | null;
  onChange: (filters: Filters) => void;
}

const REGION_FLAGS: Record<string, string> = {
  "North America": "🇺🇸",
  "Europe": "🇪🇺",
  "Asia Pacific": "🌏",
  "Global": "🌐",
};

// Slider steps: weekly for first month, monthly thereafter
const SLIDER_STEPS = [
  { days: 7,   label: "1w",  group: "week" },
  { days: 14,  label: "2w",  group: "week" },
  { days: 21,  label: "3w",  group: "week" },
  { days: 28,  label: "4w",  group: "week" },
  { days: 60,  label: "2m",  group: "month" },
  { days: 90,  label: "3m",  group: "month" },
  { days: 120, label: "4m",  group: "month" },
  { days: 150, label: "5m",  group: "month" },
  { days: 180, label: "6m",  group: "month" },
];

function daysToStep(days: number): number {
  const idx = SLIDER_STEPS.findIndex((s) => s.days === days);
  return idx >= 0 ? idx : SLIDER_STEPS.length - 1;
}

function DateSlider({ days, onChange }: { days: number; onChange: (d: number) => void }) {
  const step = daysToStep(days);
  const pct = (step / (SLIDER_STEPS.length - 1)) * 100;
  const current = SLIDER_STEPS[step];

  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Date Range
      </h3>

      {/* Selected value badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-400">
          {current.group === "week" ? "Weekly view" : "Monthly view"}
        </span>
        <span className="text-xs font-bold text-white bg-accenture-500 px-2.5 py-1 rounded-full shadow-sm">
          Last {current.label === "1w" ? "1 week"
            : current.label === "2w" ? "2 weeks"
            : current.label === "3w" ? "3 weeks"
            : current.label === "4w" ? "4 weeks"
            : current.label}
        </span>
      </div>

      {/* Slider track */}
      <div className="relative px-1">
        <div className="relative">
          {/* Background track */}
          <div className="h-1.5 bg-gray-200 rounded-full" />
          {/* Filled track */}
          <div
            className="absolute top-0 left-0 h-1.5 rounded-full bg-gradient-to-r from-accenture-800 to-accenture-500 transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
          {/* Range input (invisible but interactive) */}
          <input
            type="range"
            min={0}
            max={SLIDER_STEPS.length - 1}
            step={1}
            value={step}
            onChange={(e) => onChange(SLIDER_STEPS[parseInt(e.target.value)].days)}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
            style={{ margin: 0 }}
          />
          {/* Thumb dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-accenture-500 shadow-md shadow-accenture-200 transition-all duration-150 pointer-events-none"
            style={{ left: `calc(${pct}% - 8px)` }}
          />
        </div>

        {/* Tick labels */}
        <div className="flex justify-between mt-3">
          {SLIDER_STEPS.map((s, i) => (
            <button
              key={s.days}
              onClick={() => onChange(s.days)}
              className="flex flex-col items-center gap-0.5 group"
              style={{ width: `${100 / SLIDER_STEPS.length}%` }}
            >
              {/* Tick mark */}
              <div className={`w-px h-2 rounded-full transition-colors ${
                i === step ? "bg-accenture-500" : "bg-gray-300 group-hover:bg-accenture-300"
              }`} />
              <span className={`text-[9px] font-semibold transition-colors ${
                i === step
                  ? "text-accenture-600"
                  : i < step
                  ? "text-accenture-300"
                  : "text-gray-300 group-hover:text-accenture-400"
              }`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Week / Month divider label */}
        <div className="flex mt-1">
          <div className="flex-none text-[9px] text-gray-300 font-medium" style={{ width: `${(4 / 9) * 100}%` }}>
            ← weeks
          </div>
          <div className="flex-1 text-right text-[9px] text-gray-300 font-medium">
            months →
          </div>
        </div>
      </div>
    </div>
  );
}

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
    onChange({ industries: [], regions: [], tags: [], keyword: "", days: 180, companies: [] });
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

        {/* Date slider */}
        <DateSlider
          days={filters.days}
          onChange={(d) => onChange({ ...filters, days: d })}
        />

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
