"use client";

import type { Service } from "@/lib/types";

import { FeatureBadge } from "@/components/badge-components";
import { ServiceModal } from "@/components/service-modal";

interface ServiceCardProps {
  service: Service;
  onClose?: () => void;
}

export function ServiceCard({ service, onClose }: ServiceCardProps) {
  return (
    <ServiceModal.Root service={service} onClose={onClose}>
      <ServiceModal.Backdrop />

      <ServiceModal.Content>
        <ServiceModal.Close />
        <ServiceModal.Header />

        <ServiceModal.Body>
          {/* Capabilities */}
          <ServiceModal.Section title="CAPABILITIES">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* MCP Server */}
              <div className="border border-border rounded p-3 bg-background">
                <div className="text-xs font-mono mb-2 text-muted-foreground">
                  MCP_SERVER
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <FeatureBadge
                    feature="mcp"
                    status={service.capabilities.mcp}
                  />
                  {service.capabilities.mcpUrl && (
                    <a
                      href={service.capabilities.mcpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono transition-colors text-primary hover:underline"
                    >
                      docs →
                    </a>
                  )}
                </div>
              </div>

              {/* Platform API */}
              <div className="border border-border rounded p-3 bg-background">
                <div className="text-xs font-mono mb-2 text-muted-foreground">
                  PLATFORM_API
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <FeatureBadge
                    feature="api"
                    status={service.capabilities.platformAPI}
                  />
                  {service.capabilities.apiType && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded border bg-card border-border text-foreground">
                      {service.capabilities.apiType}
                    </span>
                  )}
                </div>
              </div>

              {/* CLI Tool */}
              <div className="border border-border rounded p-3 bg-background">
                <div className="text-xs font-mono mb-2 text-muted-foreground">
                  CLI_TOOL
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <FeatureBadge
                    feature="cli"
                    status={service.capabilities.cli}
                  />
                  {service.capabilities.cliName && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded border bg-card border-border text-primary">
                      {service.capabilities.cliName}
                    </span>
                  )}
                </div>
              </div>

              {/* Additional */}
              <div className="border border-border rounded p-3 bg-background">
                <div className="text-xs font-mono mb-2 text-muted-foreground">
                  ADDITIONAL
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.capabilities.oauth && (
                    <FeatureBadge feature="oauth" status={true} />
                  )}
                  {service.capabilities.skills && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded border bg-card border-border text-foreground">
                      Skills
                    </span>
                  )}
                </div>
              </div>
            </div>
          </ServiceModal.Section>

          {/* Features */}
          <ServiceModal.Section title="FEATURES">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between py-2 px-3 rounded border bg-background border-border">
                <span className="text-xs font-mono text-muted-foreground">
                  webhooks
                </span>
                <span
                  className={`text-xs font-mono ${
                    service.features.webhooks
                      ? "text-[var(--color-green-400)]"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {service.features.webhooks ? "yes" : "no"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded border bg-background border-border">
                <span className="text-xs font-mono text-muted-foreground">
                  agent_rules
                </span>
                <span
                  className={`text-xs font-mono ${
                    service.features.agentRules
                      ? "text-[var(--color-green-400)]"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {service.features.agentRules ? "yes" : "no"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded border bg-background border-border">
                <span className="text-xs font-mono text-muted-foreground">
                  error_handling
                </span>
                <span className="text-xs font-mono text-primary">
                  {service.features.errorHandling}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded border bg-background border-border">
                <span className="text-xs font-mono text-muted-foreground">
                  rate_limits
                </span>
                <span
                  className={`text-xs font-mono ${
                    service.features.rateLimits
                      ? "text-[var(--color-green-400)]"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {service.features.rateLimits ? "yes" : "no"}
                </span>
              </div>
            </div>
          </ServiceModal.Section>

          {/* Strengths */}
          {service.strengths.length > 0 && (
            <ServiceModal.Section title="STRENGTHS">
              <ul className="space-y-2">
                {service.strengths.map((strength, idx) => (
                  <li key={strength} className="flex items-start gap-3 group">
                    <span className="text-xs font-mono mt-0.5 transition-colors text-[var(--color-green-400)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-mono leading-relaxed text-foreground/80">
                      {strength}
                    </span>
                  </li>
                ))}
              </ul>
            </ServiceModal.Section>
          )}

          {/* Gaps */}
          {service.gaps.length > 0 && (
            <ServiceModal.Section title="GAPS">
              <ul className="space-y-2">
                {service.gaps.map((gap, idx) => (
                  <li key={gap} className="flex items-start gap-3">
                    <span className="text-xs font-mono mt-0.5 text-primary">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-mono leading-relaxed text-foreground/80">
                      {gap}
                    </span>
                  </li>
                ))}
              </ul>
            </ServiceModal.Section>
          )}

          {/* Best For */}
          <ServiceModal.Section title="BEST_FOR">
            <p className="text-sm font-mono leading-relaxed text-foreground/80">
              {service.bestFor}
            </p>
          </ServiceModal.Section>

          {/* Resources */}
          <ServiceModal.Section title="RESOURCES" bordered>
            <div className="grid gap-2 text-sm font-mono">
              <a
                href={service.metadata.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-primary"
              >
                homepage →
              </a>
              <a
                href={service.metadata.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-primary"
              >
                documentation →
              </a>
              {service.links?.mcpDocs && (
                <a
                  href={service.links.mcpDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-muted-foreground hover:text-primary"
                >
                  mcp_docs →
                </a>
              )}
              {service.links?.apiDocs && (
                <a
                  href={service.links.apiDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-muted-foreground hover:text-primary"
                >
                  api_docs →
                </a>
              )}
              {service.links?.cliDocs && (
                <a
                  href={service.links.cliDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-muted-foreground hover:text-primary"
                >
                  cli_docs →
                </a>
              )}
              {service.links?.github && (
                <a
                  href={service.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-muted-foreground hover:text-primary"
                >
                  github →
                </a>
              )}
              {service.links?.community && (
                <a
                  href={service.links.community}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-muted-foreground hover:text-primary"
                >
                  community →
                </a>
              )}
              {service.links?.guides && service.links.guides.length > 0 && (
                <div className="space-y-2 mt-2">
                  <div className="text-xs font-mono text-muted-foreground">
                    guides:
                  </div>
                  <div className="pl-4 space-y-1">
                    {service.links.guides.map((guide) => (
                      <a
                        key={guide}
                        href={guide}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-colors text-muted-foreground hover:text-primary"
                      >
                        {new URL(guide).pathname.split("/").pop() || "guide"} →
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ServiceModal.Section>

          <ServiceModal.Footer />
        </ServiceModal.Body>
      </ServiceModal.Content>
    </ServiceModal.Root>
  );
}
