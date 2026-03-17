"use client";

import { useState } from "react";

import type { Category, FilterType } from "@/lib/types";

interface CompactFiltersProps {
  onFilterChange: (filters: FilterType) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: "auth", label: "auth" },
  { value: "database", label: "db" },
  { value: "deploy", label: "deploy" },
  { value: "jobs", label: "jobs" },
  { value: "email", label: "email" },
  { value: "files", label: "files" },
  { value: "messaging", label: "msg" },
  { value: "edge", label: "edge" },
  { value: "code", label: "code" },
  { value: "scraping", label: "scrape" },
  { value: "payments", label: "pay" },
  { value: "cache", label: "cache" },
  { value: "monitoring", label: "monitor" },
  { value: "pm", label: "pm" },
  { value: "orm", label: "orm" },
  { value: "search", label: "search" },
  { value: "ai-eval", label: "ai-eval" },
  { value: "cms", label: "cms" },
  { value: "analytics", label: "analytics" },
  { value: "media", label: "media" },
  { value: "feature-flags", label: "flags" },
];

export function CompactFilters({ onFilterChange }: CompactFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const updateFilters = (cats: Category[], searchText: string) => {
    onFilterChange({ category: cats, search: searchText });
  };

  const toggleCategory = (category: Category) => {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(next);
    updateFilters(next, search);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    updateFilters(selectedCategories, value);
  };

  const clearAll = () => {
    setSearch("");
    setSelectedCategories([]);
    updateFilters([], "");
  };

  const hasFilters = selectedCategories.length > 0 || search !== "";

  return (
    <div className="space-y-3 border-b border-border pb-4">
      <input
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-3 py-1.5 text-sm bg-muted/30 border border-border rounded focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
      />

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground uppercase tracking-wider">
            Cat:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => toggleCategory(cat.value)}
              className={`px-2 py-0.5 rounded border transition-all ${
                selectedCategories.includes(cat.value)
                  ? "bg-foreground text-background border-foreground"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {hasFilters && (
          <>
            <span className="text-border">|</span>
            <button
              type="button"
              onClick={clearAll}
              className="px-2 py-0.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}
