import type { Service } from "@/lib/types";

import { Badge } from "@/components/ui/badge";

interface TierBadgeProps {
  tier: 1 | 2 | 3;
}

export function TierBadge({ tier }: TierBadgeProps) {
  const variants = {
    1: {
      label: "Tier 1",
      className: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    2: {
      label: "Tier 2",
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
    3: {
      label: "Tier 3",
      className: "bg-red-500/10 text-red-500 border-red-500/20",
    },
  };

  const variant = variants[tier];

  return (
    <Badge
      variant="outline"
      className={`font-mono text-xs ${variant.className}`}
    >
      {variant.label}
    </Badge>
  );
}

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-12 w-12">
        <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-muted-foreground/20"
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={`stroke-current ${getColor(score)}`}
            strokeWidth="2"
            strokeDasharray={`${score}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${getColor(score)}`}>
            {score}
          </span>
        </div>
      </div>
    </div>
  );
}

interface FeatureBadgeProps {
  feature: "mcp" | "api" | "cli" | "oauth" | "webhooks";
  status: string | boolean;
}

export function FeatureBadge({ feature, status }: FeatureBadgeProps) {
  const getLabel = () => {
    switch (feature) {
      case "mcp":
        return status === "official"
          ? "MCP ✓"
          : status === "community"
            ? "MCP (C)"
            : "MCP ✗";
      case "api":
        return status ? "API ✓" : "API ✗";
      case "cli":
        return status === "official"
          ? "CLI ✓"
          : status === "community"
            ? "CLI (C)"
            : "CLI ✗";
      case "oauth":
        return status ? "OAuth ✓" : "OAuth ✗";
      case "webhooks":
        return status ? "Webhooks ✓" : "Webhooks ✗";
      default:
        return "";
    }
  };

  const getVariant = () => {
    if (feature === "mcp" || feature === "cli") {
      return status === "official"
        ? "default"
        : status === "community"
          ? "secondary"
          : "outline";
    }
    return status ? "default" : "outline";
  };

  return (
    <Badge variant={getVariant()} className="font-mono text-xs">
      {getLabel()}
    </Badge>
  );
}

interface CategoryBadgeProps {
  category: Service["category"];
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const labels = {
    auth: "Auth",
    database: "Database",
    deploy: "Deploy",
    jobs: "Jobs",
    email: "Email",
    files: "Files",
    messaging: "Messaging",
    edge: "Edge",
    code: "Code",
  };

  return (
    <Badge variant="secondary" className="font-mono text-xs">
      {labels[category]}
    </Badge>
  );
}
