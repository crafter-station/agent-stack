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

  const getKey = <T,>(value: T, _selected: T[]): string => {
    if (typeof value === "number") return "selectedTiers";
    if (categories.includes(value as string)) return "selectedCategories";
    return "selectedFeatures";
  };

  const updateFilters = (
    current: {
      selectedTiers: number[];
      selectedCategories: string[];
      selectedFeatures: string[];
      search: string;
    },
    updates: Record<string, unknown>,
  ) => {
    const merged = { ...current, ...updates };
    onFilterChange({
      tier: merged.selectedTiers as number[],
      category: merged.selectedCategories as string[],
      features: merged.selectedFeatures as string[],
      search: merged.search as string,
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
    <div className="space-y-3 rounded-lg border border-border bg-card p-3">
      <div>
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            updateFilters(
              {
                selectedTiers,
                selectedCategories,
                selectedFeatures,
                search: "",
              },
              { search: e.target.value },
            );
          }}
          className="h-8 text-sm"
        />
      </div>

      <div>
        <div className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">
          Tier
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3].map((tier) => (
            <Badge
              key={tier}
              variant={selectedTiers.includes(tier) ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() =>
                toggleFilter(tier, selectedTiers, setSelectedTiers)
              }
            >
              {tier}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">
          Category
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={
                selectedCategories.includes(category) ? "default" : "outline"
              }
              className="cursor-pointer capitalize text-xs"
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

      <div>
        <div className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">
          Features
        </div>
        <div className="flex flex-wrap gap-1.5">
          {features.map((feature) => (
            <Badge
              key={feature}
              variant={
                selectedFeatures.includes(feature) ? "default" : "outline"
              }
              className="cursor-pointer text-xs"
              onClick={() =>
                toggleFilter(feature, selectedFeatures, setSelectedFeatures)
              }
            >
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
