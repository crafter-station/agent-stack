"use client";

import { useEffect } from "react";

import type { Service } from "@/lib/types";

import { CategoryBadge, DocSignal } from "./badge-components";
import { ScoreGauge } from "./score-gauge";
import { ServiceLogo } from "./service-logo";

interface ServiceDrawerProps {
  service: Service | null;
  onClose: () => void;
}

function PillarCard({
  label,
  status,
  detail,
  link,
}: {
  label: string;
  status: string;
  detail?: string;
  link?: string;
}) {
  return (
    <div className="border border-border rounded p-2 space-y-1.5 bg-muted/20">
      <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
        {label}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <span
          className={`text-xs font-bold ${
            status === "official"
              ? "text-[var(--color-green-400)]"
              : status === "community"
                ? "text-[var(--color-blue-400)]"
                : "text-muted-foreground"
          }`}
        >
          {status}
        </span>
        {detail && <span className="text-xs text-foreground">{detail}</span>}
      </div>
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

export function ServiceDrawer({ service, onClose }: ServiceDrawerProps) {
  useEffect(() => {
    if (!service) return;
    document.body.style.overflow = "hidden";
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
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        aria-label="Close drawer"
      />

      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-background border-l border-border z-50 overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-start justify-between gap-4 z-10">
          <div className="space-y-3 flex-1">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 pt-1">
                <ServiceLogo name={service.name} className="h-10 w-10" />
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold">{service.name}</h2>
                  <CategoryBadge category={service.category} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.description}
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

        <div className="p-4 space-y-6">
          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Four Pillars
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <PillarCard
                label="MCP Server"
                status={service.mcp.status}
                detail={service.mcp.package}
                link={service.links.mcpDocs}
              />
              <PillarCard
                label="Platform API"
                status={service.platformApi.status}
                detail={service.platformApi.type}
                link={service.links.apiDocs}
              />
              <PillarCard
                label="CLI"
                status={service.cli.status}
                detail={service.cli.name}
                link={service.links.cliDocs}
              />
              <PillarCard
                label="Skills"
                status={service.skills.status}
                detail={service.skills.hasSkillFile ? "SKILL.md" : undefined}
                link={service.links.skillsDocs}
              />
            </div>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Docs Signals
            </h3>
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
            <section>
              <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                Install CLI
              </h3>
              <code className="block text-xs bg-muted/30 border border-border rounded px-3 py-2 font-mono">
                {service.cli.installCmd}
              </code>
            </section>
          )}

          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Resources
            </h3>
            <div className="space-y-1.5 text-xs">
              <a
                href={service.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                homepage →
              </a>
              <a
                href={service.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                documentation →
              </a>
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
        </div>

        <div className="sticky bottom-0 bg-background border-t border-border p-4 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            researched: {service.lastResearched}
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
