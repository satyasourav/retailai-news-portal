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
  colorClass = "bg-blue-100 text-blue-800 border-blue-300",
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  colorClass?: string;
}) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                active
                  ? colorClass
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
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
    filters.industries.length +
    filters.regions.length +
    filters.tags.length +
    filters.companies.length +
    (filters.keyword ? 1 : 0);

  return (
    <aside className="w-72 shrink-0 bg-white border-r border-gray-200 overflow-y-auto h-full">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={reset}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <div className="p-4">
        {/* Keyword / Company Search */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Search
          </h3>
          <input
            type="text"
            placeholder="Search headlines…"
            value={filters.keyword}
            onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company filter */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Companies
          </h3>
          <input
            type="text"
            placeholder="Type company + Enter…"
            value={companyInput}
            onChange={(e) => setCompanyInput(e.target.value)}
            onKeyDown={addCompany}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          {filters.companies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {filters.companies.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 border border-purple-300 text-xs px-2 py-1 rounded-full"
                >
                  {c}
                  <button onClick={() => removeCompany(c)} className="hover:text-red-600">×</button>
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-400 mt-1">e.g. Walmart, Amazon, Unilever</p>
        </div>

        {/* Date range */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Date Range
          </h3>
          <div className="space-y-1">
            {MONTH_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="months"
                  checked={filters.months === opt.value}
                  onChange={() => onChange({ ...filters, months: opt.value })}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Industry groups */}
        {meta && meta.industryGroups ? (
          Object.entries(meta.industryGroups).map(([groupName, options]) => (
            <MultiSelect
              key={groupName}
              label={groupName === "Core" ? "Industry" : "Capabilities"}
              options={options}
              selected={filters.industries}
              onToggle={(v) => toggle("industries", v)}
              colorClass={
                groupName === "Core"
                  ? "bg-blue-100 text-blue-800 border-blue-300"
                  : "bg-indigo-100 text-indigo-800 border-indigo-300"
              }
            />
          ))
        ) : meta ? (
          <MultiSelect
            label="Industry"
            options={meta.industries}
            selected={filters.industries}
            onToggle={(v) => toggle("industries", v)}
            colorClass="bg-blue-100 text-blue-800 border-blue-300"
          />
        ) : null}

        {/* Regions */}
        {meta && (
          <MultiSelect
            label="Region"
            options={meta.regions}
            selected={filters.regions}
            onToggle={(v) => toggle("regions", v)}
            colorClass="bg-green-100 text-green-800 border-green-300"
          />
        )}

        {/* Tech / AI Tags */}
        {meta && (
          <MultiSelect
            label="Tech & AI Topics"
            options={meta.tags}
            selected={filters.tags}
            onToggle={(v) => toggle("tags", v)}
            colorClass="bg-orange-100 text-orange-800 border-orange-300"
          />
        )}

        {/* Source list */}
        {meta && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Active Sources ({meta.sources.length})
            </h3>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {meta.sources.map((s) => (
                <div key={s.name} className="text-xs text-gray-600 flex items-start gap-1">
                  <span className="mt-0.5">{REGION_FLAGS[s.region] || "•"}</span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
