"use client";

import { useState } from "react";

import type { Service } from "@/lib/types";

import {
  CategoryBadge,
  FeatureBadge,
  ScoreBadge,
  TierBadge,
} from "@/components/badge-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServiceTableProps {
  services: Service[];
  onServiceClick?: (service: Service) => void;
}

export function ServiceTable({ services, onServiceClick }: ServiceTableProps) {
  const [sortBy, setSortBy] = useState<"score" | "name" | "tier">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedServices = [...services].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;

    switch (sortBy) {
      case "score":
        return (a.score - b.score) * order;
      case "name":
        return a.name.localeCompare(b.name) * order;
      case "tier":
        return (a.tier - b.tier) * order;
      default:
        return 0;
    }
  });

  const handleSort = (field: "score" | "name" | "tier") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>
              <button
                type="button"
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 hover:text-foreground"
              >
                Service
                {sortBy === "name" && (
                  <span className="text-xs">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <button
                type="button"
                onClick={() => handleSort("tier")}
                className="flex items-center gap-1 hover:text-foreground"
              >
                Tier
                {sortBy === "tier" && (
                  <span className="text-xs">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </TableHead>
            <TableHead>
              <button
                type="button"
                onClick={() => handleSort("score")}
                className="flex items-center gap-1 hover:text-foreground"
              >
                Score
                {sortBy === "score" && (
                  <span className="text-xs">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </TableHead>
            <TableHead>Features</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedServices.map((service, index) => (
            <TableRow
              key={service.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onServiceClick?.(service)}
            >
              <TableCell className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded border bg-background">
                    <span className="text-xs font-bold">{service.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{service.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {service.metadata.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <CategoryBadge category={service.category} />
              </TableCell>
              <TableCell>
                <TierBadge tier={service.tier} />
              </TableCell>
              <TableCell>
                <ScoreBadge score={service.score} />
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  <FeatureBadge
                    feature="mcp"
                    status={service.capabilities.mcp}
                  />
                  <FeatureBadge
                    feature="api"
                    status={service.capabilities.platformAPI}
                  />
                  <FeatureBadge
                    feature="cli"
                    status={service.capabilities.cli}
                  />
                  {service.capabilities.oauth && (
                    <FeatureBadge feature="oauth" status={true} />
                  )}
                  {service.features.webhooks && (
                    <FeatureBadge feature="webhooks" status={true} />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
