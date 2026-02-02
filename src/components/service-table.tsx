"use client";

import { useState } from "react";

import type { Service } from "@/lib/types";

import {
  CategoryBadge,
  FeatureBadge,
  TierBadge,
} from "@/components/badge-components";
import { ScoreGauge } from "@/components/score-gauge";
import { ServiceLogo } from "@/components/service-logo";
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
    <div className="border border-border overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="w-12 h-9 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              #
            </TableHead>
            <TableHead className="h-9">
              <button
                type="button"
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 text-[10px] font-bold tracking-wider transition-colors text-muted-foreground hover:text-foreground uppercase"
              >
                Service
                {sortBy === "name" && (
                  <span className="text-foreground">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </TableHead>
            <TableHead className="h-9 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Category
            </TableHead>
            <TableHead className="h-9">
              <button
                type="button"
                onClick={() => handleSort("tier")}
                className="flex items-center gap-1 text-[10px] font-bold tracking-wider transition-colors text-muted-foreground hover:text-foreground uppercase"
              >
                Tier
                {sortBy === "tier" && (
                  <span className="text-foreground">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </TableHead>
            <TableHead className="h-9">
              <button
                type="button"
                onClick={() => handleSort("score")}
                className="flex items-center gap-1 text-[10px] font-bold tracking-wider transition-colors text-muted-foreground hover:text-foreground uppercase"
              >
                Score
                {sortBy === "score" && (
                  <span className="text-foreground">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </TableHead>
            <TableHead className="h-9 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Features
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedServices.map((service, index) => (
            <TableRow
              key={service.id}
              className="cursor-pointer border-b border-border last:border-0 transition-all hover:bg-muted/50 group"
              onClick={() => onServiceClick?.(service)}
            >
              <TableCell className="text-[10px] font-bold tabular-nums py-2 text-muted-foreground group-hover:text-foreground transition-colors">
                {String(index + 1).padStart(2, "0")}
              </TableCell>
              <TableCell className="py-2">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <ServiceLogo name={service.name} className="h-6 w-6" />
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="font-bold text-xs group-hover:text-foreground transition-colors">
                      {service.name}
                    </div>
                    <div className="text-[10px] truncate text-muted-foreground">
                      {service.metadata.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-2">
                <CategoryBadge category={service.category} />
              </TableCell>
              <TableCell className="py-2">
                <TierBadge tier={service.tier} />
              </TableCell>
              <TableCell className="py-2">
                <ScoreGauge score={service.score} size="sm" />
              </TableCell>
              <TableCell className="py-2">
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
