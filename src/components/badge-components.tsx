import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface TierBadgeProps {
  tier: 1 | 2 | 3;
}

export function TierBadge({ tier }: TierBadgeProps) {
  const variants = {
    1: {
      label: "T1",
      className:
        "bg-[var(--color-green-400)]/10 text-[var(--color-green-400)] border-[var(--color-green-400)]/20",
    },
    2: {
      label: "T2",
      className:
        "bg-[var(--color-blue-400)]/10 text-[var(--color-blue-400)] border-[var(--color-blue-400)]/20",
    },
    3: {
      label: "T3",
      className:
        "bg-[var(--color-red-400)]/10 text-[var(--color-red-400)] border-[var(--color-red-400)]/20",
    },
  };

  const variant = variants[tier];

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-bold tracking-wide border px-1.5 py-0",
        variant.className,
      )}
    >
      {variant.label}
    </Badge>
  );
}

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const getClassName = (score: number) => {
    if (score >= 80) {
      return "bg-[var(--color-green-400)]/10 text-[var(--color-green-400)] border-[var(--color-green-400)]/20";
    }
    if (score >= 70) {
      return "bg-[var(--color-blue-400)]/10 text-[var(--color-blue-400)] border-[var(--color-blue-400)]/20";
    }
    return "bg-[var(--color-red-400)]/10 text-[var(--color-red-400)] border-[var(--color-red-400)]/20";
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-bold tabular-nums border px-1.5 py-0",
        getClassName(score),
      )}
    >
      {score}
    </Badge>
  );
}

interface FeatureBadgeProps {
  feature: "mcp" | "api" | "cli" | "oauth" | "webhooks";
  status: string | boolean;
}

export function FeatureBadge({ feature, status }: FeatureBadgeProps) {
  const getLabel = () => {
    const featureNames = {
      mcp: "MCP",
      api: "API",
      cli: "CLI",
      oauth: "OAuth",
      webhooks: "Webhooks",
    };

    const name = featureNames[feature];

    if (feature === "mcp" || feature === "cli") {
      if (status === "official") return name;
      if (status === "community") return `${name}*`;
      return null;
    }

    return status ? name : null;
  };

  const label = getLabel();
  if (!label) return null;

  return (
    <span className="inline-flex items-center text-[10px] px-1.5 py-0 rounded border border-border bg-muted/30 text-foreground font-bold tracking-wide uppercase">
      {label}
    </span>
  );
}

interface CategoryBadgeProps {
  category: Service["category"];
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const labels = {
    auth: "Auth",
    database: "DB",
    deploy: "Deploy",
    jobs: "Jobs",
    email: "Email",
    files: "Files",
    messaging: "Msg",
    edge: "Edge",
    code: "Code",
  };

  return (
    <Badge
      variant="outline"
      className="text-[10px] border border-border bg-muted/20 text-muted-foreground font-bold tracking-wide px-1.5 py-0 uppercase"
    >
      {labels[category]}
    </Badge>
  );
}
