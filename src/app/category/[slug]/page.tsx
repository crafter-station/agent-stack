import Link from "next/link";
import type { Metadata } from "next";
import { getServices, getCategories } from "@/lib/services";
import type { Category } from "@/lib/types";
import { ScoreBadge, PillarBadge, CategoryBadge } from "@/components/badge-components";

const categoryFullLabels: Record<Category, string> = {
  auth: "Auth",
  database: "Database",
  deploy: "Deploy",
  jobs: "Background Jobs",
  email: "Email",
  files: "File Storage",
  messaging: "Messaging",
  edge: "Edge",
  code: "Code",
  scraping: "Scraping",
  payments: "Payments",
  cache: "Cache",
  monitoring: "Monitoring",
  pm: "Project Management",
  orm: "ORM",
  search: "Search",
  "ai-eval": "AI Evaluation",
  cms: "CMS",
  analytics: "Analytics",
  media: "Media",
  "feature-flags": "Feature Flags",
  mobile: "Mobile",
  browser: "Browser Automation",
  voice: "Voice",
  memory: "Memory",
  "ai-search": "AI Search",
  "people-search": "People Search",
  "agent-email": "Agent Email",
  "agent-phone": "Agent Phone",
  "agent-payments": "Agent Payments",
  "saas-integration": "SaaS Integration",
  "api-access": "API Access",
  "compute-sandbox": "Compute Sandbox",
};

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = slug as Category;
  const label = categoryFullLabels[category] ?? slug;
  const services = getServices()
    .filter((s) => s.category === category)
    .sort((a, b) => b.score - a.score);
  const count = services.length;
  const top3 = services
    .slice(0, 3)
    .map((s) => s.name)
    .join(", ");

  const title = `Best Agent-Ready ${label} Tools | Agent Stack`;
  const description = `${count} ${label} tools ranked by AI agent readiness. Compare MCP, API, CLI, Skills, and Docs support across ${top3}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://agent-stack.crafter.run/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Agent Stack",
      url: `https://agent-stack.crafter.run/category/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@RaillyHugo",
      site: "@crafterstation",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = slug as Category;
  const label = categoryFullLabels[category] ?? slug;
  const services = getServices()
    .filter((s) => s.category === category)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← agent-stack
          </Link>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <CategoryBadge category={category} />
            <span className="text-xs text-muted-foreground tabular-nums">
              {services.length} tools
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{label}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ranked by AI agent readiness across MCP, API, CLI, Skills, and Docs.
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tools found in this category.</p>
        ) : (
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium w-8">#</th>
                  <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Tool</th>
                  <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium hidden sm:table-cell">Pillars</th>
                  <th className="text-right px-4 py-2 text-xs text-muted-foreground font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, i) => (
                  <tr
                    key={service.id}
                    className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums w-8">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/${service.id}`}
                        className="hover:text-foreground/80 transition-colors"
                      >
                        <span className="font-semibold">{service.name}</span>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {service.description}
                        </p>
                      </Link>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-1 flex-wrap">
                        <PillarBadge label="MCP" status={service.mcp.status} />
                        <PillarBadge label="API" status={service.platformApi.status} />
                        <PillarBadge label="CLI" status={service.cli.status} />
                        <PillarBadge label="Skills" status={service.skills.status} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ScoreBadge score={service.score} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← All tools
          </Link>
          <Link href="/methodology" className="hover:text-foreground transition-colors">
            Scoring methodology →
          </Link>
        </div>
      </div>
    </div>
  );
}
