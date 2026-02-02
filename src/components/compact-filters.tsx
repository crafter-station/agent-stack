"use client";

import { useState } from "react";

import type { FilterType } from "@/lib/types";

interface CompactFiltersProps {
  onFilterChange: (filters: FilterType & { search: string }) => void;
}

export function CompactFilters({ onFilterChange }: CompactFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedTiers, setSelectedTiers] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const updateFilters = (
    tiers: number[],
    categories: string[],
    features: string[],
    searchText: string,
  ) => {
    onFilterChange({
      tier: tiers,
      category: categories,
      features,
      search: searchText,
    });
  };

  const toggleTier = (tier: number) => {
    const newTiers = selectedTiers.includes(tier)
      ? selectedTiers.filter((t) => t !== tier)
      : [...selectedTiers, tier];
    setSelectedTiers(newTiers);
    updateFilters(newTiers, selectedCategories, selectedFeatures, search);
  };

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    updateFilters(selectedTiers, newCategories, selectedFeatures, search);
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];
    setSelectedFeatures(newFeatures);
    updateFilters(selectedTiers, selectedCategories, newFeatures, search);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    updateFilters(selectedTiers, selectedCategories, selectedFeatures, value);
  };

  const clearAll = () => {
    setSearch("");
    setSelectedTiers([]);
    setSelectedCategories([]);
    setSelectedFeatures([]);
    updateFilters([], [], [], "");
  };

  const hasFilters =
    selectedTiers.length > 0 ||
    selectedCategories.length > 0 ||
    selectedFeatures.length > 0 ||
    search !== "";

  return (
    <div className="space-y-3 border-b border-border pb-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-3 py-1.5 text-sm bg-muted/30 border border-border rounded focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
      />

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Tier Filters */}
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground uppercase tracking-wider">
            Tier:
          </span>
          {[1, 2, 3].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => toggleTier(tier)}
              className={`px-2 py-0.5 rounded border transition-all ${
                selectedTiers.includes(tier)
                  ? tier === 1
                    ? "bg-[var(--color-green-400)]/20 border-[var(--color-green-400)] text-[var(--color-green-400)]"
                    : tier === 2
                      ? "bg-[var(--color-blue-400)]/20 border-[var(--color-blue-400)] text-[var(--color-blue-400)]"
                      : "bg-[var(--color-red-400)]/20 border-[var(--color-red-400)] text-[var(--color-red-400)]"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        <span className="text-border">|</span>

        {/* Category Filters */}
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground uppercase tracking-wider">
            Cat:
          </span>
          {["auth", "database", "deploy", "jobs"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`px-2 py-0.5 rounded border transition-all ${
                selectedCategories.includes(cat)
                  ? "bg-foreground text-background border-foreground"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-border">|</span>

        {/* Feature Filters */}
        <div className="flex items-center gap-1">
          {["mcp", "api", "cli", "oauth"].map((feat) => (
            <button
              key={feat}
              type="button"
              onClick={() => toggleFeature(feat)}
              className={`px-2 py-0.5 rounded border transition-all uppercase ${
                selectedFeatures.includes(feat)
                  ? "bg-foreground text-background border-foreground"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {feat}
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
