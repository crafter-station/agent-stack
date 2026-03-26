import type { Metadata } from "next";
import Link from "next/link";

import { CategoryBadge, DocSignal, ScoreBadge } from "@/components/badge-components";
import { ScoreGauge } from "@/components/score-gauge";
import { getScoreBreakdown } from "@/lib/scoring";
import { getServiceById, getServices } from "@/lib/services";
import type { PillarStatus } from "@/lib/types";

export function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return { title: "Not Found | Agent Stack" };
  }

  const title = `${service.name} — Agent Readiness Score ${service.score}/100 | Agent Stack`;
  const description = `${service.name} scores ${service.score}/${service.maxScore} on agent readiness. ${service.description}. See the full breakdown across MCP, API, CLI, Skills, and Docs.`;
  const canonical = `https://agent-stack.crafter.run/${service.id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Agent Stack",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function statusColor(status: PillarStatus) {
  if (status === "official") return "text-[var(--color-green-400)]";
  if (status === "community") return "text-[var(--color-blue-400)]";
  return "text-muted-foreground/40";
}

function PillarSection({
  label,
  status,
  score,
  maxScore,
  details,
  link,
}: {
  label: string;
  status: PillarStatus;
  score: number;
  maxScore: number;
  details?: { label: string; value: string | boolean | undefined }[];
  link?: string;
}) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div className="border border-border rounded p-3 space-y-2 bg-muted/10">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-[10px] tabular-nums text-muted-foreground">
          {score}/{maxScore}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold ${statusColor(status)}`}>{status}</span>
        {status === "community" && (
          <span className="text-[10px] text-muted-foreground/50">(community)</span>
        )}
      </div>
      <div className="h-1 bg-border/40 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-current transition-all"
          style={{
            width: `${pct}%`,
            color:
              status === "official"
                ? "var(--color-green-400)"
                : status === "community"
                  ? "var(--color-blue-400)"
                  : "var(--color-border)",
            backgroundColor:
              status === "official"
                ? "var(--color-green-400)"
                : status === "community"
                  ? "var(--color-blue-400)"
                  : "var(--color-border)",
          }}
        />
      </div>
      {details && details.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {details
            .filter((d) => d.value !== undefined && d.value !== false && d.value !== "")
            .map((d) => (
              <span key={d.label} className="text-[10px] text-muted-foreground">
                <span className="text-muted-foreground/50">{d.label}:</span>{" "}
                <span className="text-foreground/70">
                  {typeof d.value === "boolean" ? "yes" : d.value}
                </span>
              </span>
            ))}
        </div>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          docs →
        </a>
      )}
    </div>
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-sm">service not found</p>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← back to rankings
          </Link>
        </div>
      </div>
    );
  }

  const breakdown = getScoreBreakdown(service);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: service.name,
    description: service.description,
    url: service.homepage,
    applicationCategory: service.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: service.score,
      bestRating: service.maxScore,
      worstRating: 0,
      ratingCount: 1,
    },
  };

  const pillarMaxScores = { mcp: 20, api: 20, cli: 20, skills: 20, docs: 20 };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← agent stack
            </Link>
            <span className="text-[10px] text-muted-foreground/50">
              researched: {service.lastResearched}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold">{service.name}</h1>
                  <CategoryBadge category={service.category} />
                  <ScoreBadge score={service.score} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="flex gap-3 text-[10px]">
                  <a
                    href={service.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    homepage →
                  </a>
                  <a
                    href={service.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    docs →
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <ScoreGauge score={service.score} size="lg" />
              </div>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Score Breakdown
            </h2>
            <div className="border border-border rounded p-3 space-y-2.5 bg-muted/10">
              {[
                { label: "MCP Server", score: breakdown.mcp, max: pillarMaxScores.mcp },
                { label: "Platform API", score: breakdown.platformApi, max: pillarMaxScores.api },
                { label: "CLI", score: breakdown.cli, max: pillarMaxScores.cli },
                { label: "Skills", score: breakdown.skills, max: pillarMaxScores.skills },
                { label: "Docs", score: breakdown.docs, max: pillarMaxScores.docs },
              ].map(({ label, score, max }) => {
                const pct = Math.round((score / max) * 100);
                return (
                  <div key={label} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="tabular-nums text-muted-foreground/70">
                        {score}/{max}
                      </span>
                    </div>
                    <div className="h-1 bg-border/30 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor:
                            pct >= 80
                              ? "var(--color-green-400)"
                              : pct >= 50
                                ? "var(--color-yellow-400)"
                                : pct > 0
                                  ? "var(--color-red-400)"
                                  : "transparent",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="pt-1 border-t border-border/30 flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground font-bold">Total</span>
                <span className="tabular-nums font-bold">
                  {breakdown.total}/{service.maxScore}
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Four Pillars
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <PillarSection
                label="MCP Server"
                status={service.mcp.status}
                score={breakdown.mcp}
                maxScore={pillarMaxScores.mcp}
                details={[
                  { label: "package", value: service.mcp.package },
                ]}
                link={service.links.mcpDocs}
              />
              <PillarSection
                label="Platform API"
                status={service.platformApi.status}
                score={breakdown.platformApi}
                maxScore={pillarMaxScores.api}
                details={[
                  { label: "type", value: service.platformApi.type },
                ]}
                link={service.links.apiDocs}
              />
              <PillarSection
                label="CLI"
                status={service.cli.status}
                score={breakdown.cli}
                maxScore={pillarMaxScores.cli}
                details={[
                  { label: "name", value: service.cli.name },
                  { label: "json", value: service.cli.supportsJson },
                  { label: "non-interactive", value: service.cli.nonInteractive },
                ]}
                link={service.links.cliDocs}
              />
              <PillarSection
                label="Skills"
                status={service.skills.status}
                score={breakdown.skills}
                maxScore={pillarMaxScores.skills}
                details={[
                  { label: "skill file", value: service.skills.hasSkillFile },
                  { label: "agent rules", value: service.skills.hasAgentRules },
                  { label: "prompts", value: service.skills.hasPrompts },
                ]}
                link={service.links.skillsDocs}
              />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Docs Signals
            </h2>
            <div className="flex flex-wrap gap-1.5">
              <DocSignal
                label="llms.txt"
                active={service.docs.llmsTxt}
                href={service.docs.llmsTxtUrl}
              />
              <DocSignal
                label="Copy MD"
                active={service.docs.copyMarkdown}
                href={service.docsUrl}
              />
              <DocSignal
                label="AI Quickstart"
                active={service.docs.aiQuickstart}
                href={service.docs.aiQuickstartUrl}
              />
              <DocSignal
                label="OpenAPI"
                active={service.docs.openApiSpec}
                href={service.links.apiDocs}
              />
            </div>
          </section>

          {service.cli.status !== "none" && service.cli.installCmd && (
            <section className="space-y-3">
              <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Install CLI
              </h2>
              <code className="block text-xs bg-muted/20 border border-border rounded px-3 py-2.5 font-mono">
                {service.cli.installCmd}
              </code>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Links
            </h2>
            <div className="space-y-1.5 text-xs">
              {service.links.github && (
                <a
                  href={service.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  github →
                </a>
              )}
              {service.links.mcpDocs && (
                <a
                  href={service.links.mcpDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  mcp docs →
                </a>
              )}
              {service.links.cliDocs && (
                <a
                  href={service.links.cliDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  cli docs →
                </a>
              )}
              {service.links.apiDocs && (
                <a
                  href={service.links.apiDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  api docs →
                </a>
              )}
              {service.links.skillsDocs && (
                <a
                  href={service.links.skillsDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  skills docs →
                </a>
              )}
              {service.docs.llmsTxtUrl && (
                <a
                  href={service.docs.llmsTxtUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  llms.txt →
                </a>
              )}
              {service.docs.aiQuickstartUrl && (
                <a
                  href={service.docs.aiQuickstartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  ai quickstart →
                </a>
              )}
            </div>
          </section>

          <div className="border-t border-border/30 pt-4">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← view all rankings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
