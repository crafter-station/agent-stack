"use client";

import { useState } from "react";

import type { FilterType } from "@/lib/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  onFilterChange: (filters: FilterType & { search: string }) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [search, setSearch] = useState("");
  const [selectedTiers, setSelectedTiers] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const categories = [
    "auth",
    "database",
    "deploy",
    "jobs",
    "email",
    "files",
    "messaging",
    "edge",
    "code",
  ];
  const features = ["MCP", "CLI", "OAuth", "Webhooks"];

  const toggleFilter = <T,>(
    value: T,
    selected: T[],
    setter: (values: T[]) => void,
  ) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setter(newSelected);
    updateFilters(
      { selectedTiers, selectedCategories, selectedFeatures, search },
      { [getKey(value, selected)]: newSelected },
    );
  };

  const getKey = <T,>(value: T, selected: T[]): string => {
    if (typeof value === "number") return "selectedTiers";
    if (categories.includes(value as string)) return "selectedCategories";
    return "selectedFeatures";
  };

  const updateFilters = (current: any, updates: any) => {
    const merged = { ...current, ...updates };
    onFilterChange({
      tier: merged.selectedTiers,
      category: merged.selectedCategories,
      features: merged.selectedFeatures,
      search: merged.search,
    });
  };

  const clearAll = () => {
    setSearch("");
    setSelectedTiers([]);
    setSelectedCategories([]);
    setSelectedFeatures([]);
    onFilterChange({ tier: [], category: [], features: [], search: "" });
  };

  const hasActiveFilters =
    selectedTiers.length > 0 ||
    selectedCategories.length > 0 ||
    selectedFeatures.length > 0 ||
    search.length > 0;

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      {/* Search */}
      <div>
        <Input
          placeholder="Search services..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            updateFilters(
              { selectedTiers, selectedCategories, selectedFeatures },
              { search: e.target.value },
            );
          }}
          className="font-mono"
        />
      </div>

      {/* Tier Filter */}
      <div>
        <div className="mb-2 text-sm font-semibold">Tier</div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((tier) => (
            <Badge
              key={tier}
              variant={selectedTiers.includes(tier) ? "default" : "outline"}
              className="cursor-pointer font-mono"
              onClick={() =>
                toggleFilter(tier, selectedTiers, setSelectedTiers)
              }
            >
              Tier {tier}
            </Badge>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <div className="mb-2 text-sm font-semibold">Category</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={
                selectedCategories.includes(category) ? "default" : "outline"
              }
              className="cursor-pointer font-mono capitalize"
              onClick={() =>
                toggleFilter(
                  category,
                  selectedCategories,
                  setSelectedCategories,
                )
              }
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Features Filter */}
      <div>
        <div className="mb-2 text-sm font-semibold">Features</div>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <Badge
              key={feature}
              variant={
                selectedFeatures.includes(feature) ? "default" : "outline"
              }
              className="cursor-pointer font-mono"
              onClick={() =>
                toggleFilter(feature, selectedFeatures, setSelectedFeatures)
              }
            >
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <div className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="font-mono text-xs"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
