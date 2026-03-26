import { getServices } from "@/lib/services";
import { HomePage } from "@/components/home-page";

export default function Page() {
  const services = getServices();
  const sorted = [...services].sort((a, b) => b.score - a.score);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Developer Tools Ranked by Agent Readiness",
    description: `${services.length} developer tools ranked across MCP Server, Platform API, CLI, Agent Skills, and Docs`,
    numberOfItems: services.length,
    itemListElement: sorted.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `https://agent-stack.crafter.run/${s.id}`,
      description: `${s.name} scores ${s.score}/${s.maxScore} on agent readiness. Category: ${s.category}.`,
    })),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Agent Stack",
    url: "https://agent-stack.crafter.run",
    description: `${services.length} developer tools ranked by AI agent readiness`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomePage />
    </>
  );
}
