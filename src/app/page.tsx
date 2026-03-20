"use client";

import { useState } from "react";

import { filterServices, getServices } from "@/lib/services";
import type { FilterType, Service } from "@/lib/types";

import { CompactFilters } from "@/components/compact-filters";
import { ServiceDrawer } from "@/components/service-drawer";
import { ServiceTable } from "@/components/service-table";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
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
      <header className="border-b border-border sticky top-0 z-30 bg-background">
        <div className="px-4 lg:px-6">
          <div className="flex h-12 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-sm font-bold tracking-tight uppercase">
                Agent Stack
              </h1>
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
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/crafter-station/agent-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                GitHub
              </a>
              <ThemeSwitcher />
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
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: "var(--color-violet-400)",
                    opacity: 0.8,
                  }}
                />
                MCP
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: "var(--color-blue-400)",
                    opacity: 0.8,
                  }}
                />
                API
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: "var(--color-cyan-400)",
                    opacity: 0.8,
                  }}
                />
                CLI
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: "var(--color-amber-400)",
                    opacity: 0.8,
                  }}
                />
                Skills
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: "var(--color-emerald-400)",
                    opacity: 0.8,
                  }}
                />
                Docs
              </span>
            </div>
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
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
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
          <span>
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
