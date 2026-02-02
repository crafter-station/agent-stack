"use client";

import { useState } from "react";

import { filterServices, getMetadata, getServices } from "@/lib/services";
import type { FilterType, Service } from "@/lib/types";

import { CompactFilters } from "@/components/compact-filters";
import { ServiceDrawer } from "@/components/service-drawer";
import { ServiceTable } from "@/components/service-table";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  const allServices = getServices();
  const metadata = getMetadata();

  const [filters, setFilters] = useState<FilterType & { search: string }>({
    tier: [],
    category: [],
    features: [],
    search: "",
  });
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = filterServices(allServices, filters);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-30 bg-background">
        <div className="px-4 lg:px-6">
          <div className="flex h-12 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-sm font-bold tracking-tight uppercase">
                Agent Stack
              </h1>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold tabular-nums">
                  {metadata.productionReady}/{metadata.totalServices}
                </span>
                <span className="text-muted-foreground">production ready</span>
              </div>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 lg:px-6 py-4">
        <div className="space-y-4">
          {/* Compact Filters */}
          <CompactFilters onFilterChange={setFilters} />

          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs border-b border-border pb-3">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                Showing {filteredServices.length} of {allServices.length}
              </span>
              <span className="text-border">|</span>
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-green-400)]">
                  T1: {allServices.filter((s) => s.tier === 1).length}
                </span>
                <span className="text-[var(--color-blue-400)]">
                  T2: {allServices.filter((s) => s.tier === 2).length}
                </span>
                <span className="text-[var(--color-red-400)]">
                  T3: {allServices.filter((s) => s.tier === 3).length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a
                href="https://github.com/crafter-station/agent-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                github
              </a>
              <a
                href="https://clerk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                clerk
              </a>
            </div>
          </div>

          {/* Services Table */}
          <ServiceTable
            services={filteredServices}
            onServiceClick={setSelectedService}
          />

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="border border-border rounded p-12 text-center text-sm">
              <div className="space-y-2">
                <div className="text-2xl text-muted-foreground">∅</div>
                <p className="text-muted-foreground">
                  No services match filters
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Drawer */}
      <ServiceDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
