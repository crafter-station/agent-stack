"use client";

import { useState } from "react";

import type { Service } from "@/lib/types";

import { cn } from "@/lib/utils";

import {
  CategoryBadge,
  DocSignal,
  PillarBadge,
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

  const getRowTint = (score: number) => {
    if (score >= 95) return "bg-[var(--color-emerald-400)]/[0.03]";
    if (score >= 85) return "bg-[var(--color-cyan-400)]/[0.03]";
    if (score >= 75) return "bg-[var(--color-orange-400)]/[0.03]";
    if (score >= 60) return "bg-[var(--color-yellow-400)]/[0.03]";
    return "bg-[var(--color-red-400)]/[0.03]";
  };

  return (
    <div className="border border-border overflow-hidden bg-card">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="w-[3%] h-9 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              #
            </TableHead>
            <TableHead className="w-[27%] h-9">
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
            <TableHead className="w-[8%] h-9 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Category
            </TableHead>
            <TableHead className="w-[6%] h-9">
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
            <TableHead className="w-[26%] h-9 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Pillars
            </TableHead>
            <TableHead className="w-[30%] h-9 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Docs
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedServices.map((service, index) => (
            <TableRow
              key={service.id}
              className={cn(
                "cursor-pointer border-b border-border last:border-0 transition-all hover:bg-muted/50 group",
                getRowTint(service.score),
              )}
              onClick={() => onServiceClick?.(service)}
            >
              <TableCell className="text-[10px] font-bold tabular-nums py-2 text-muted-foreground group-hover:text-foreground transition-colors">
                {String(index + 1).padStart(2, "0")}
              </TableCell>
              <TableCell className="py-2">
                <div className="flex items-center gap-2.5">
                  <ServiceLogo
                    name={service.name}
                    className="h-5 w-5 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-xs group-hover:text-foreground transition-colors whitespace-nowrap block">
                      {service.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 truncate block max-w-[240px]">
                      {service.description}
                    </span>
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
              <TableCell className="py-2">
                <div className="flex flex-wrap gap-1">
                  <DocSignal label="llms.txt" active={service.docs.llmsTxt} />
                  <DocSignal label="OpenAPI" active={service.docs.openApiSpec} />
                  <DocSignal
                    label="AI Guide"
                    active={service.docs.aiQuickstart}
                  />
                  <DocSignal
                    label="Copy MD"
                    active={service.docs.copyMarkdown}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
