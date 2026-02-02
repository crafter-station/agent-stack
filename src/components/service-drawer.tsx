"use client";

import { useEffect } from "react";

import type { Service } from "@/lib/types";

import { FeatureBadge, TierBadge } from "./badge-components";
import { ScoreGauge } from "./score-gauge";
import { ServiceLogo } from "./service-logo";

interface ServiceDrawerProps {
  service: Service | null;
  onClose: () => void;
}

export function ServiceDrawer({ service, onClose }: ServiceDrawerProps) {
  useEffect(() => {
    if (!service) return;

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // ESC to close
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        aria-label="Close drawer"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-background border-l border-border z-50 overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-start justify-between gap-4 z-10">
          <div className="space-y-3 flex-1">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 pt-1">
                <ServiceLogo name={service.name} className="h-10 w-10" />
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold">{service.name}</h2>
                  <TierBadge tier={service.tier} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.metadata.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <ScoreGauge score={service.score} size="md" />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 border border-border rounded hover:border-foreground"
          >
            [ESC]
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Capabilities */}
          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Capabilities
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="border border-border rounded p-2 space-y-1.5 bg-muted/20">
                <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
                  MCP Server
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <FeatureBadge
                    feature="mcp"
                    status={service.capabilities.mcp}
                  />
                  {service.capabilities.mcpUrl && (
                    <a
                      href={service.capabilities.mcpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      docs →
                    </a>
                  )}
                </div>
              </div>

              <div className="border border-border rounded p-2 space-y-1.5 bg-muted/20">
                <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
                  Platform API
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <FeatureBadge
                    feature="api"
                    status={service.capabilities.platformAPI}
                  />
                  {service.capabilities.apiType && (
                    <span className="text-foreground">
                      {service.capabilities.apiType}
                    </span>
                  )}
                </div>
              </div>

              <div className="border border-border rounded p-2 space-y-1.5 bg-muted/20">
                <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
                  CLI Tool
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <FeatureBadge
                    feature="cli"
                    status={service.capabilities.cli}
                  />
                  {service.capabilities.cliName && (
                    <span className="text-foreground">
                      {service.capabilities.cliName}
                    </span>
                  )}
                </div>
              </div>

              <div className="border border-border rounded p-2 space-y-1.5 bg-muted/20">
                <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
                  Additional
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {service.capabilities.oauth && (
                    <FeatureBadge feature="oauth" status={true} />
                  )}
                  {service.features.webhooks && (
                    <FeatureBadge feature="webhooks" status={true} />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Features
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { key: "webhooks", value: service.features.webhooks },
                { key: "agent_rules", value: service.features.agentRules },
                {
                  key: "error_handling",
                  value: service.features.errorHandling,
                },
                { key: "rate_limits", value: service.features.rateLimits },
              ].map(({ key, value }) => (
                <div
                  key={key}
                  className="flex items-center justify-between border border-border rounded px-2 py-1.5 bg-muted/20"
                >
                  <span className="text-muted-foreground">{key}</span>
                  <span
                    className={
                      typeof value === "boolean"
                        ? value
                          ? "text-[var(--color-green-400)]"
                          : "text-muted-foreground"
                        : "text-foreground"
                    }
                  >
                    {typeof value === "boolean"
                      ? value
                        ? "yes"
                        : "no"
                      : value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Strengths */}
          {service.strengths.length > 0 && (
            <section>
              <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                Strengths
              </h3>
              <ul className="space-y-1.5 text-xs">
                {service.strengths.map((strength, idx) => (
                  <li key={strength} className="flex items-start gap-2">
                    <span className="text-[var(--color-green-400)] mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {strength}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gaps */}
          {service.gaps.length > 0 && (
            <section>
              <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                Gaps
              </h3>
              <ul className="space-y-1.5 text-xs">
                {service.gaps.map((gap, idx) => (
                  <li key={gap} className="flex items-start gap-2">
                    <span className="text-[var(--color-red-400)] mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {gap}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Best For */}
          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Best For
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {service.bestFor}
            </p>
          </section>

          {/* Resources */}
          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Resources
            </h3>
            <div className="space-y-1.5 text-xs">
              <a
                href={service.metadata.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                homepage →
              </a>
              <a
                href={service.metadata.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                documentation →
              </a>
              {service.links?.mcpDocs && (
                <a
                  href={service.links.mcpDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  mcp_docs →
                </a>
              )}
              {service.links?.apiDocs && (
                <a
                  href={service.links.apiDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  api_docs →
                </a>
              )}
              {service.links?.github && (
                <a
                  href={service.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  github →
                </a>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            updated: {service.lastUpdated}
          </span>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(service, null, 2));
            }}
            className="px-2 py-1 border border-border rounded text-muted-foreground hover:border-foreground hover:text-foreground transition-all"
          >
            copy_json
          </button>
        </div>
      </div>
    </>
  );
}
