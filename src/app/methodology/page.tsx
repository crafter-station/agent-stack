import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scoring Methodology — How Agent Readiness is Measured | Agent Stack",
  description:
    "How Agent Stack scores developer tools across 5 dimensions: MCP Server, Platform API, CLI, Agent Skills, and AI Docs. Learn the methodology behind our agent readiness rankings.",
  alternates: {
    canonical: "https://agent-stack.crafter.run/methodology",
  },
  openGraph: {
    title: "Scoring Methodology — How Agent Readiness is Measured | Agent Stack",
    description:
      "How Agent Stack scores developer tools across 5 dimensions: MCP Server, Platform API, CLI, Agent Skills, and AI Docs. Learn the methodology behind our agent readiness rankings.",
    type: "website",
    siteName: "Agent Stack",
    url: "https://agent-stack.crafter.run/methodology",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scoring Methodology — How Agent Readiness is Measured | Agent Stack",
    description:
      "How Agent Stack scores developer tools across 5 dimensions: MCP Server, Platform API, CLI, Agent Skills, and AI Docs. Learn the methodology behind our agent readiness rankings.",
    creator: "@RaillyHugo",
    site: "@crafterstation",
  },
};

const pillars = [
  {
    label: "MCP Server",
    max: 20,
    rows: [
      { signal: "Official MCP server", points: 20 },
      { signal: "Community MCP server", points: 12 },
      { signal: "None", points: 0 },
    ],
    note: "Model Context Protocol — a standardized interface for LLMs to call tools. Official support scores higher because it guarantees maintenance alignment with the product.",
  },
  {
    label: "Platform API",
    max: 20,
    rows: [
      { signal: "Official REST/GraphQL API", points: 20 },
      { signal: "Community API wrapper", points: 12 },
      { signal: "None", points: 0 },
    ],
    note: "A well-documented programmatic API lets agents perform actions via HTTP without needing human-facing interfaces.",
  },
  {
    label: "CLI",
    max: 20,
    rows: [
      { signal: "Official CLI", points: 12 },
      { signal: "Community CLI", points: 7 },
      { signal: "None", points: 0 },
      { signal: "JSON output flag (--json)", points: 4 },
      { signal: "Non-interactive mode", points: 4 },
    ],
    note: "CLI tools let agents invoke commands in sandboxed environments. JSON output and non-interactive flags are critical for agent pipelines — they determine whether output can be parsed reliably.",
  },
  {
    label: "Agent Skills",
    max: 20,
    rows: [
      { signal: "Official skill/plugin", points: 8 },
      { signal: "Community skill", points: 5 },
      { signal: "None", points: 0 },
      { signal: "Skill file (.md / config)", points: 4 },
      { signal: "Agent rules file", points: 4 },
      { signal: "Prompts library", points: 4 },
    ],
    note: "Skills are structured prompts or integrations that let agents use a tool with minimal guesswork. Skill files, agent rules, and prompt libraries reduce hallucination and improve task success rates.",
  },
  {
    label: "AI Docs",
    max: 20,
    rows: [
      { signal: "llms.txt", points: 5 },
      { signal: "OpenAPI spec", points: 5 },
      { signal: "AI-optimized quickstart", points: 5 },
      { signal: "Copy-as-markdown on docs pages", points: 5 },
    ],
    note: "Documentation quality directly affects how well LLMs can reason about a tool. llms.txt provides a curated index; OpenAPI specs enable typed tool-calling; AI quickstarts reduce cold-start errors; copy-as-markdown means docs can be injected into context without manual reformatting.",
  },
];

const tiers = [
  { range: "95–100", label: "Tier 1", description: "Production-ready for autonomous agents", color: "text-[var(--color-green-400)]" },
  { range: "80–94", label: "Tier 2", description: "Strong coverage, minor gaps", color: "text-[var(--color-blue-400)]" },
  { range: "60–79", label: "Tier 3", description: "Partial agent support", color: "text-[var(--color-yellow-400)]" },
  { range: "< 60", label: "Needs Improvement", description: "Significant gaps for agent workflows", color: "text-[var(--color-red-400)]" },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← agent-stack
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight">Scoring Methodology</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Every tool is assessed across 5 pillars, each worth up to 20 points. Total max score: 100.
            Scores reflect how well a tool supports autonomous AI agents — not general developer experience.
          </p>
        </div>

        <div className="space-y-10">
          {pillars.map((pillar) => (
            <div key={pillar.label}>
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-sm font-bold tracking-wide uppercase">{pillar.label}</h2>
                <span className="text-xs text-muted-foreground tabular-nums">{pillar.max} pts max</span>
              </div>
              <div className="border border-border rounded-md overflow-hidden mb-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left px-3 py-2 text-muted-foreground font-medium">Signal</th>
                      <th className="text-right px-3 py-2 text-muted-foreground font-medium">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pillar.rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-3 py-2 text-foreground/80">{row.signal}</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold">
                          {row.points > 0 ? `+${row.points}` : "0"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{pillar.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-sm font-bold tracking-wide uppercase mb-4">Tier Classification</h2>
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Score</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Tier</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium hidden sm:table-cell">What it means</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-3 py-2 tabular-nums font-semibold">{tier.range}</td>
                    <td className={`px-3 py-2 font-bold ${tier.color}`}>{tier.label}</td>
                    <td className="px-3 py-2 text-muted-foreground hidden sm:table-cell">{tier.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <h2 className="text-sm font-bold tracking-wide uppercase mb-3">Assessment Process</h2>
          <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              All assessments are done manually. Each tool is researched against its official docs, GitHub repos,
              npm/PyPI packages, and community sources. Scores reflect the state of tooling at the time of last research.
            </p>
            <p>
              The <span className="text-foreground font-medium">lastResearched</span> date on each tool page indicates
              when the assessment was last verified. If you find outdated or incorrect data, open an issue or PR on
              the Agent Stack repository.
            </p>
            <p>
              Community contributions (e.g. a third-party MCP server or CLI wrapper) are counted but scored lower
              than official offerings, since they may fall out of sync with the tool's API surface.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← All tools
          </Link>
          <span>Total: 100 points max</span>
        </div>
      </div>
    </div>
  );
}
