import servicesData from "@/data/services.json";
import type { Category, Service } from "./types";

export function getServices(): Service[] {
  return servicesData.services as Service[];
}

export function getServiceById(id: string): Service | undefined {
  return getServices().find((service) => service.id === id);
}

export function getCategories(): Category[] {
  const services = getServices();
  return [...new Set(services.map((s) => s.category))];
}

export function computeScore(service: Service): number {
  let score = 0;
  const max = 20;

  const pillarScore = (status: string) =>
    status === "official" ? 5 : status === "community" ? 3 : 0;

  score += pillarScore(service.mcp.status);
  score += pillarScore(service.platformApi.status);
  score += pillarScore(service.cli.status);
  score += pillarScore(service.skills.status);

  return Math.round((score / max) * 100);
}

export function filterServices(
  services: Service[],
  filters: {
    category?: Category[];
    search?: string;
  },
): Service[] {
  let filtered = services;

  if (filters.category && filters.category.length > 0) {
    filtered = filtered.filter((service) =>
      filters.category?.includes(service.category),
    );
  }

  if (filters.search && filters.search.length > 0) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (service) =>
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower),
    );
  }

  return filtered;
}

export function sortServices(
  services: Service[],
  field: "score" | "name" | "category",
  direction: "asc" | "desc" = "desc",
): Service[] {
  return [...services].sort((a, b) => {
    let cmp: number;
    switch (field) {
      case "score":
        cmp = a.score - b.score;
        break;
      case "name":
        cmp = a.name.localeCompare(b.name);
        break;
      case "category":
        cmp = a.category.localeCompare(b.category);
        break;
      default:
        cmp = 0;
    }
    return direction === "desc" ? -cmp : cmp;
  });
}
