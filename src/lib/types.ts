export interface Service {
  id: string;
  name: string;
  category:
    | "auth"
    | "database"
    | "deploy"
    | "jobs"
    | "email"
    | "files"
    | "messaging"
    | "edge"
    | "code";
  tier: 1 | 2 | 3;
  score: number;

  capabilities: {
    mcp: "official" | "community" | "none";
    mcpUrl?: string;
    platformAPI: boolean;
    apiType?: "REST" | "GraphQL" | "Both";
    cli: "official" | "community" | "none";
    cliName?: string;
    skills: boolean;
    oauth: boolean;
  };

  features: {
    webhooks: boolean;
    agentRules: boolean;
    errorHandling: "excellent" | "good" | "basic";
    rateLimits: boolean;
  };

  docs: {
    aiFocused: boolean;
    openAPI: boolean;
    quickStart: boolean;
  };

  provisioning: {
    oneShot: boolean;
    secrets: boolean;
    branching: boolean;
  };

  metadata: {
    homepage: string;
    docs: string;
    logo: string;
    description: string;
  };

  links: {
    mcpDocs?: string;
    apiDocs?: string;
    cliDocs?: string;
    github?: string;
    community?: string;
    guides?: string[];
  };

  strengths: string[];
  gaps: string[];
  bestFor: string;

  lastUpdated: string;
}

export interface ComparisonData {
  services: Service[];
  metadata: {
    researchDate: string;
    researcher: string;
    phase: string;
    totalServices: number;
    productionReady: number;
  };
  recommendations: {
    recommendedStack: {
      auth: string;
      database: string;
      deployment: string;
      jobs: string;
      code: string;
      email: string;
      files: string;
      messaging: string;
      edge: string;
    };
    estimatedCost: string;
  };
}

export type FilterType = {
  tier: number[];
  category: string[];
  features: string[];
};

export type SortType = "score" | "name" | "tier";
