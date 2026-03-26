"use client";

import { useState } from "react";

import { filterServices, getServices } from "@/lib/services";
import type { FilterType, Service } from "@/lib/types";

import { CompactFilters } from "@/components/compact-filters";
import { ServiceDrawer } from "@/components/service-drawer";
import { ServiceTable } from "@/components/service-table";
import { ThemeSwitcher } from "@/components/theme-switcher";

const LEGEND_ITEMS = [
  { label: "MCP", color: "var(--color-violet-400)" },
  { label: "API", color: "var(--color-blue-400)" },
  { label: "CLI", color: "var(--color-cyan-400)" },
  { label: "Skills", color: "var(--color-amber-400)" },
  { label: "Docs", color: "var(--color-emerald-400)" },
];

function ScoreLegend() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="hidden sm:flex items-center gap-3 text-[10px] text-muted-foreground">
        {LEGEND_ITEMS.map((item) => (
          <span key={item.label} className="flex items-center gap-1">
            <span
              className="inline-block w-2 h-2 rounded-sm"
              style={{ backgroundColor: item.color, opacity: 0.8 }}
            />
            {item.label}
          </span>
        ))}
      </div>

      <div className="sm:hidden relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 px-2 py-1 border border-border rounded text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="flex -space-x-0.5">
            {LEGEND_ITEMS.map((item) => (
              <span
                key={item.label}
                className="inline-block w-2.5 h-2.5 rounded-full border border-background"
                style={{ backgroundColor: item.color, opacity: 0.9 }}
              />
            ))}
          </div>
          <span className="ml-1">legend</span>
        </button>

        {open && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-label="Close legend"
            />
            <div className="absolute right-0 top-full mt-2 z-50 bg-card border border-border rounded p-3 shadow-lg min-w-[140px]">
              <div className="space-y-2">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                  Score breakdown
                </div>
                {LEGEND_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: item.color, opacity: 0.8 }}
                    />
                    <span className="text-foreground">{item.label}</span>
                    <span className="text-muted-foreground ml-auto">/ 20</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 mt-2 flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-foreground font-bold">/ 100</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function HomePage() {
  const allServices = getServices();

  const [filters, setFilters] = useState<FilterType>({
    category: [],
    search: "",
  });
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = filterServices(allServices, filters);

  const withAllPillars = allServices.filter((s) => s.score === 100).length;
  const avgScore = Math.round(
    allServices.reduce((sum, s) => sum + s.score, 0) / allServices.length,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1 className="sr-only">Developer Tools Ranked by AI Agent Readiness</h1>
      <header className="border-b border-border sticky top-0 z-30 bg-background">
        <div className="px-4 lg:px-6">
          <div className="flex h-12 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold tracking-tight uppercase whitespace-nowrap">
                Agent Stack
              </span>
              <div className="hidden sm:flex items-center gap-3 text-[10px] text-muted-foreground">
                <span>
                  <span className="font-bold text-foreground tabular-nums">
                    {allServices.length}
                  </span>{" "}
                  services
                </span>
                <span className="text-border">|</span>
                <span>
                  <span className="font-bold text-foreground tabular-nums">
                    {withAllPillars}
                  </span>{" "}
                  fully agent-ready
                </span>
                <span className="text-border">|</span>
                <span>
                  avg score{" "}
                  <span className="font-bold text-foreground tabular-nums">
                    {avgScore}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://github.com/crafter-station/agent-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:block text-[10px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                GitHub
              </a>
              <ThemeSwitcher className="[&_button]:px-2 [&_button]:text-[10px] sm:[&_button]:px-3 sm:[&_button]:text-xs" />
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 lg:px-6 py-4">
        <div className="space-y-4">
          <CompactFilters onFilterChange={setFilters} />

          <div className="flex items-center justify-between text-xs border-b border-border pb-3">
            <span className="text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-foreground tabular-nums">
                {filteredServices.length}
              </span>{" "}
              of {allServices.length}
            </span>
            <ScoreLegend />
          </div>

          <ServiceTable
            services={filteredServices}
            onServiceClick={setSelectedService}
          />

          {filteredServices.length === 0 && (
            <div className="border border-border rounded p-12 text-center text-sm">
              <div className="space-y-2">
                <div className="text-2xl text-muted-foreground">&#8709;</div>
                <p className="text-muted-foreground">
                  No services match filters
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border py-4 px-4 lg:px-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              Built by{" "}
              <a
                href="https://x.com/RaillyHugo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                @RaillyHugo
              </a>
            </span>
            <span className="text-border">|</span>
            <span>
              Logos by{" "}
              <a
                href="https://tryelements.dev/docs/logos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                Elements
              </a>
            </span>
          </div>
          <span className="hidden sm:inline">
            Score = MCP(20) + API(20) + CLI(20) + Skills(20) + Docs(20)
          </span>
        </div>
      </footer>

      <ServiceDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
