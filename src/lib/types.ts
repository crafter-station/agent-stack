export type PillarStatus = "official" | "community" | "none";

export interface MCPPillar {
  status: PillarStatus;
  url?: string;
  package?: string;
}

export interface PlatformAPIPillar {
  status: PillarStatus;
  type?: "REST" | "GraphQL" | "Both";
  docsUrl?: string;
}

export interface CLIPillar {
  status: PillarStatus;
  name?: string;
  installCmd?: string;
  supportsJson?: boolean;
  nonInteractive?: boolean;
}

export interface SkillsPillar {
  status: PillarStatus;
  hasSkillFile?: boolean;
  hasAgentRules?: boolean;
  hasPrompts?: boolean;
}

export interface DocsSignals {
  llmsTxt: boolean;
  llmsTxtUrl?: string;
  copyMarkdown: boolean;
  aiQuickstart: boolean;
  aiQuickstartUrl?: string;
  openApiSpec: boolean;
}

export type Category =
  | "auth"
  | "database"
  | "deploy"
  | "jobs"
  | "email"
  | "files"
  | "messaging"
  | "edge"
  | "code"
  | "scraping"
  | "payments"
  | "cache"
  | "monitoring"
  | "pm"
  | "orm"
  | "search"
  | "ai-eval"
  | "cms"
  | "analytics"
  | "media"
  | "feature-flags"
  | "mobile"
  | "browser"
  | "voice"
  | "memory"
  | "ai-search"
  | "people-search"
  | "agent-email"
  | "agent-phone"
  | "agent-payments"
  | "saas-integration"
  | "api-access"
  | "compute-sandbox";

export interface Service {
  id: string;
  name: string;
  category: Category;
  description: string;
  homepage: string;
  docsUrl: string;

  mcp: MCPPillar;
  platformApi: PlatformAPIPillar;
  cli: CLIPillar;
  skills: SkillsPillar;
  docs: DocsSignals;

  score: number;
  maxScore: number;

  links: {
    github?: string;
    mcpDocs?: string;
    cliDocs?: string;
    apiDocs?: string;
    skillsDocs?: string;
  };

  lastUpdated: string;
  lastResearched: string;
}

export type SortField = "score" | "name" | "category";
export type SortDirection = "asc" | "desc";

export type FilterType = {
  category: Category[];
  search: string;
};
