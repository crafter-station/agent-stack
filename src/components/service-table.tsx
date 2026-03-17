"use client";

import { useState } from "react";

import type { Service } from "@/lib/types";

import { CategoryBadge, PillarBadge } from "@/components/badge-components";
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
  const [sortBy, setSortBy] = useState<"score" | "name">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedServices = [...services].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    switch (sortBy) {
      case "score":
        return (a.score - b.score) * order;
      case "name":
        return a.name.localeCompare(b.name) * order;
      default:
        return 0;
    }
  });

  const handleSort = (field: "score" | "name") => {
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
              Pillars
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
                      {service.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-2">
                <CategoryBadge category={service.category} />
              </TableCell>
              <TableCell className="py-2">
                <ScoreGauge score={service.score} size="sm" />
              </TableCell>
              <TableCell className="py-2">
                <div className="flex flex-wrap gap-1">
                  <PillarBadge label="MCP" status={service.mcp.status} />
                  <PillarBadge
                    label="API"
                    status={service.platformApi.status}
                  />
                  <PillarBadge label="CLI" status={service.cli.status} />
                  <PillarBadge label="Skills" status={service.skills.status} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
