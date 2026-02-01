import servicesData from "@/data/services.json";
import type { ComparisonData, Service } from "./types";

export function getServices(): Service[] {
  return (servicesData as ComparisonData).services;
}

export function getServiceById(id: string): Service | undefined {
  return getServices().find((service) => service.id === id);
}

export function getMetadata() {
  return (servicesData as ComparisonData).metadata;
}

export function getRecommendations() {
  return (servicesData as ComparisonData).recommendations;
}

export function filterServices(
  services: Service[],
  filters: {
    tier?: number[];
    category?: string[];
    features?: string[];
    search?: string;
  },
): Service[] {
  let filtered = services;

  // Filter by tier
  if (filters.tier && filters.tier.length > 0) {
    filtered = filtered.filter((service) =>
      filters.tier?.includes(service.tier),
    );
  }

  // Filter by category
  if (filters.category && filters.category.length > 0) {
    filtered = filtered.filter((service) =>
      filters.category?.includes(service.category),
    );
  }

  // Filter by features
  if (filters.features && filters.features.length > 0) {
    filtered = filtered.filter((service) => {
      return filters.features?.every((feature) => {
        switch (feature) {
          case "MCP":
            return service.capabilities.mcp !== "none";
          case "CLI":
            return service.capabilities.cli !== "none";
          case "OAuth":
            return service.capabilities.oauth;
          case "Webhooks":
            return service.features.webhooks;
          default:
            return false;
        }
      });
    });
  }

  // Filter by search
  if (filters.search && filters.search.length > 0) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (service) =>
        service.name.toLowerCase().includes(searchLower) ||
        service.metadata.description.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower),
    );
  }

  return filtered;
}
