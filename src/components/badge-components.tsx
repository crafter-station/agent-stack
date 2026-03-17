import type { Category, PillarStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const getClassName = (score: number) => {
    if (score >= 95) {
      return "bg-[var(--color-emerald-400)]/10 text-[var(--color-emerald-400)] border-[var(--color-emerald-400)]/20";
    }
    if (score >= 85) {
      return "bg-[var(--color-cyan-400)]/10 text-[var(--color-cyan-400)] border-[var(--color-cyan-400)]/20";
    }
    if (score >= 75) {
      return "bg-[var(--color-orange-400)]/10 text-[var(--color-orange-400)] border-[var(--color-orange-400)]/20";
    }
    if (score >= 60) {
      return "bg-[var(--color-yellow-400)]/10 text-[var(--color-yellow-400)] border-[var(--color-yellow-400)]/20";
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

interface PillarBadgeProps {
  label: string;
  status: PillarStatus;
  href?: string;
}

export function PillarBadge({ label, status, href }: PillarBadgeProps) {
  const colorClass =
    status === "official"
      ? "border-[var(--color-green-400)]/30 bg-[var(--color-green-400)]/10 text-[var(--color-green-400)]"
      : status === "community"
        ? "border-[var(--color-blue-400)]/30 bg-[var(--color-blue-400)]/10 text-[var(--color-blue-400)]"
        : "border-border/30 bg-transparent text-muted-foreground/20";

  const baseClass = cn(
    "inline-flex items-center text-[10px] px-1.5 py-0 rounded border font-bold tracking-wide uppercase",
    colorClass,
    href && status !== "none" && "hover:brightness-125 transition-all cursor-pointer",
  );

  if (href && status !== "none") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
        {status === "community" && "*"}
      </a>
    );
  }

  return (
    <span className={baseClass}>
      {label}
      {status === "community" && "*"}
    </span>
  );
}

interface CategoryBadgeProps {
  category: Category;
}

const categoryLabels: Record<Category, string> = {
  auth: "Auth",
  database: "DB",
  deploy: "Deploy",
  jobs: "Jobs",
  email: "Email",
  files: "Files",
  messaging: "Msg",
  edge: "Edge",
  code: "Code",
  scraping: "Scrape",
  payments: "Pay",
  cache: "Cache",
  monitoring: "Monitor",
  pm: "PM",
  orm: "ORM",
  search: "Search",
  "ai-eval": "AI Eval",
  cms: "CMS",
  analytics: "Analytics",
  media: "Media",
  "feature-flags": "Flags",
  mobile: "Mobile",
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="text-[10px] border border-border bg-muted/20 text-muted-foreground font-bold tracking-wide px-1.5 py-0 uppercase"
    >
      {categoryLabels[category]}
    </Badge>
  );
}

interface DocSignalProps {
  label: string;
  active: boolean;
  href?: string;
}

export function DocSignal({ label, active, href }: DocSignalProps) {
  const baseClass = cn(
    "inline-flex items-center text-[10px] px-1.5 py-0 rounded border font-bold tracking-wide",
    active
      ? "border-border bg-muted/30 text-foreground"
      : "border-transparent bg-transparent text-muted-foreground/30",
    href && active && "hover:bg-muted/50 transition-all cursor-pointer",
  );

  if (href && active) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </a>
    );
  }

  return <span className={baseClass}>{label}</span>;
}
