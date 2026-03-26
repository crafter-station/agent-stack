import type { Metadata } from "next";
import Link from "next/link";

import { CategoryBadge, DocSignal, ScoreBadge } from "@/components/badge-components";
import { getScoreBreakdown } from "@/lib/scoring";
import { getServiceById, getServices } from "@/lib/services";
import type { PillarStatus } from "@/lib/types";

export function generateStaticParams() {
  return getServices().map((s) => ({ id: s.id }));
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

  return {
    title,
    description,
    alternates: { canonical: `https://agent-stack.crafter.run/${service.id}` },
    openGraph: {
      title,
      description,
      url: `https://agent-stack.crafter.run/${service.id}`,
      siteName: "Agent Stack",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

function statusLabel(status: PillarStatus) {
  if (status === "official") return "Official";
  if (status === "community") return "Community";
  return "None";
}

function statusColor(status: PillarStatus) {
  if (status === "official") return "var(--color-green-400)";
  if (status === "community") return "var(--color-blue-400)";
  return "var(--color-border)";
}

const PILLAR_COLORS = [
  "var(--color-violet-400)",
  "var(--color-blue-400)",
  "var(--color-cyan-400)",
  "var(--color-amber-400)",
  "var(--color-emerald-400)",
];

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
          <p className="text-muted-foreground text-sm">Service not found</p>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← back to rankings
          </Link>
        </div>
      </div>
    );
  }

  const breakdown = getScoreBreakdown(service);
  const pillars = [
    { label: "MCP", score: breakdown.mcp, max: 20, status: service.mcp.status },
    { label: "API", score: breakdown.platformApi, max: 20, status: service.platformApi.status },
    { label: "CLI", score: breakdown.cli, max: 20, status: service.cli.status },
    { label: "Skills", score: breakdown.skills, max: 20, status: service.skills.status },
    { label: "Docs", score: breakdown.docs, max: 20, status: "none" as PillarStatus },
  ];

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border">
          <div className="max-w-3xl mx-auto px-4 lg:px-6 flex h-12 items-center justify-between">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← agent stack
            </Link>
            <span className="text-[10px] text-muted-foreground/50">
              researched {service.lastResearched}
            </span>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 lg:px-6 py-8 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{service.name}</h1>
              <CategoryBadge category={service.category} />
              <ScoreBadge score={service.score} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              {service.description}
            </p>
            <div className="flex items-center gap-4 text-xs">
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
              {service.links.github && (
                <a
                  href={service.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  github →
                </a>
              )}
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Score Breakdown — {breakdown.total}/{service.maxScore}
            </h2>
            <div className="space-y-2">
              {pillars.map((p, i) => {
                const pct = p.max > 0 ? Math.round((p.score / p.max) * 100) : 0;
                return (
                  <div key={p.label} className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground w-12 shrink-0">{p.label}</span>
                    <div className="flex-1 h-2 bg-border/20 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: PILLAR_COLORS[i],
                          opacity: 0.8,
                        }}
                      />
                    </div>
                    <span className="text-[10px] tabular-nums text-muted-foreground w-10 text-right shrink-0">
                      {p.score}/{p.max}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Pillar Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <PillarCard
                title="MCP Server"
                status={service.mcp.status}
                details={[
                  { label: "Package", value: service.mcp.package },
                ]}
                link={service.links.mcpDocs}
              />
              <PillarCard
                title="Platform API"
                status={service.platformApi.status}
                details={[
                  { label: "Type", value: service.platformApi.type },
                ]}
                link={service.links.apiDocs}
              />
              <PillarCard
                title="CLI"
                status={service.cli.status}
                details={[
                  { label: "Name", value: service.cli.name },
                  { label: "JSON output", value: service.cli.supportsJson ? "Yes" : undefined },
                  { label: "Non-interactive", value: service.cli.nonInteractive ? "Yes" : undefined },
                  { label: "Install", value: service.cli.installCmd },
                ]}
                link={service.links.cliDocs}
              />
              <PillarCard
                title="Agent Skills"
                status={service.skills.status}
                details={[
                  { label: "Skill file", value: service.skills.hasSkillFile ? "Yes" : undefined },
                  { label: "Agent rules", value: service.skills.hasAgentRules ? "Yes" : undefined },
                  { label: "Prompts", value: service.skills.hasPrompts ? "Yes" : undefined },
                ]}
                link={service.links.skillsDocs}
              />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground">
              AI Docs
            </h2>
            <div className="flex flex-wrap gap-2">
              <DocSignal label="llms.txt" active={service.docs.llmsTxt} href={service.docs.llmsTxtUrl} />
              <DocSignal label="OpenAPI" active={service.docs.openApiSpec} href={service.links.apiDocs} />
              <DocSignal label="AI Quickstart" active={service.docs.aiQuickstart} href={service.docs.aiQuickstartUrl} />
              <DocSignal label="Copy MD" active={service.docs.copyMarkdown} />
            </div>
          </section>

          <div className="border-t border-border pt-6 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← all rankings
            </Link>
            <Link
              href={`/category/${service.category}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              more {service.category} tools →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

function PillarCard({
  title,
  status,
  details,
  link,
}: {
  title: string;
  status: PillarStatus;
  details: { label: string; value: string | undefined }[];
  link?: string;
}) {
  const filtered = details.filter((d) => d.value !== undefined);

  return (
    <div className="border border-border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{title}</span>
        <span
          className="text-[10px] font-bold uppercase"
          style={{ color: statusColor(status) }}
        >
          {statusLabel(status)}
        </span>
      </div>
      {filtered.length > 0 && (
        <div className="space-y-1">
          {filtered.map((d) => (
            <div key={d.label} className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">{d.label}</span>
              <span className="text-foreground/70 font-mono truncate ml-2 max-w-[200px]">{d.value}</span>
            </div>
          ))}
        </div>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[10px] text-muted-foreground hover:text-foreground transition-colors pt-1"
        >
          docs →
        </a>
      )}
    </div>
  );
}
