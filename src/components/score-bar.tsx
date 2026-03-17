import type { Service } from "@/lib/types";
import { getScoreBreakdown } from "@/lib/scoring";

interface ScoreBarProps {
  service: Service;
  size?: "sm" | "md";
}

const PILLAR_COLORS = {
  mcp: "var(--color-violet-400)",
  platformApi: "var(--color-blue-400)",
  cli: "var(--color-cyan-400)",
  skills: "var(--color-amber-400)",
  docs: "var(--color-emerald-400)",
} as const;

const PILLAR_MAX = {
  mcp: 20,
  platformApi: 20,
  cli: 20,
  skills: 20,
  docs: 20,
} as const;

export function ScoreBar({ service, size = "sm" }: ScoreBarProps) {
  const breakdown = getScoreBreakdown(service);
  const pillars = ["mcp", "platformApi", "cli", "skills", "docs"] as const;
  const height = size === "sm" ? 6 : 8;

  return (
    <div className="flex items-center gap-2 w-full">
      <span
        className="text-[10px] font-bold tabular-nums shrink-0"
        style={{
          color:
            breakdown.total >= 95
              ? "var(--color-emerald-400)"
              : breakdown.total >= 85
                ? "var(--color-cyan-400)"
                : breakdown.total >= 75
                  ? "var(--color-orange-400)"
                  : breakdown.total >= 60
                    ? "var(--color-yellow-400)"
                    : "var(--color-red-400)",
        }}
      >
        {breakdown.total}
      </span>
      <div
        className="flex flex-1 gap-px rounded-sm overflow-hidden"
        style={{ height }}
      >
        {pillars.map((pillar) => {
          const value = breakdown[pillar];
          const max = PILLAR_MAX[pillar];
          const pct = (value / max) * 100;
          const color = PILLAR_COLORS[pillar];

          return (
            <div
              key={pillar}
              className="relative flex-1"
              style={{ backgroundColor: "var(--color-muted)" }}
              title={`${pillar === "platformApi" ? "API" : pillar.toUpperCase()}: ${value}/${max}`}
            >
              <div
                className="absolute inset-y-0 left-0 transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: color,
                  opacity: value === 0 ? 0 : 0.8,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
