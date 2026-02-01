"use client";

import { useState } from "react";

import { filterServices, getMetadata, getServices } from "@/lib/services";
import type { FilterType, Service } from "@/lib/types";

import { FilterBar } from "@/components/filter-bar";
import { ServiceCard } from "@/components/service-card";
import { ServiceTable } from "@/components/service-table";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">agent-stack</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Agent Provisioning Readiness Assessment
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {metadata.totalServices} services assessed
              </div>
              <div className="text-xs text-muted-foreground">
                {metadata.productionReady} production-ready
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Sidebar - Filters */}
          <aside className="space-y-4">
            <FilterBar onFilterChange={setFilters} />

            {/* Stats */}
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <h3 className="font-semibold text-sm">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Services</span>
                  <span className="font-mono font-semibold">
                    {allServices.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Filtered</span>
                  <span className="font-mono font-semibold">
                    {filteredServices.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tier 1</span>
                  <span className="font-mono font-semibold text-green-500">
                    {allServices.filter((s) => s.tier === 1).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tier 2</span>
                  <span className="font-mono font-semibold text-yellow-500">
                    {allServices.filter((s) => s.tier === 2).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tier 3</span>
                  <span className="font-mono font-semibold text-red-500">
                    {allServices.filter((s) => s.tier === 3).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Research Info */}
            <div className="rounded-lg border bg-card p-4 space-y-2">
              <h3 className="font-semibold text-sm">Research</h3>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>Date: {metadata.researchDate}</div>
                <div>By: {metadata.researcher}</div>
                <div>Phase: {metadata.phase}</div>
              </div>
            </div>
          </aside>

          {/* Main Area */}
          <div className="space-y-6">
            {/* Selected Service Detail */}
            {selectedService && (
              <ServiceCard
                service={selectedService}
                onClose={() => setSelectedService(null)}
              />
            )}

            {/* Services Table */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredServices.length === allServices.length
                    ? "All Services"
                    : `${filteredServices.length} Service${filteredServices.length !== 1 ? "s" : ""}`}
                </h2>
              </div>
              <ServiceTable
                services={filteredServices}
                onServiceClick={setSelectedService}
              />
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && (
              <div className="rounded-lg border bg-card p-12 text-center">
                <p className="text-muted-foreground">
                  No services match your filters. Try adjusting your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>
              Built by{" "}
              <a
                href="https://github.com/crafter-station"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-foreground"
              >
                Crafter Station
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/crafter-station/agent-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href="https://clerk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Clerk
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
