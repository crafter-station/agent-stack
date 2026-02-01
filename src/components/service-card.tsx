"use client";

import type { Service } from "@/lib/types";

import {
  CategoryBadge,
  FeatureBadge,
  ScoreBadge,
  TierBadge,
} from "@/components/badge-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceCardProps {
  service: Service;
  onClose?: () => void;
}

export function ServiceCard({ service, onClose }: ServiceCardProps) {
  const copyAsJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(service, null, 2));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl">{service.name}</CardTitle>
              <TierBadge tier={service.tier} />
              <CategoryBadge category={service.category} />
            </div>
            <CardDescription>{service.metadata.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ScoreBadge score={service.score} />
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Capabilities */}
        <div>
          <h3 className="mb-3 font-semibold">Capabilities</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                MCP Server
              </div>
              <div className="flex items-center gap-2">
                <FeatureBadge feature="mcp" status={service.capabilities.mcp} />
                {service.capabilities.mcpUrl && (
                  <a
                    href={service.capabilities.mcpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline truncate"
                  >
                    {service.capabilities.mcpUrl}
                  </a>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Platform API
              </div>
              <div className="flex items-center gap-2">
                <FeatureBadge
                  feature="api"
                  status={service.capabilities.platformAPI}
                />
                {service.capabilities.apiType && (
                  <span className="text-xs">
                    {service.capabilities.apiType}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">CLI Tool</div>
              <div className="flex items-center gap-2">
                <FeatureBadge feature="cli" status={service.capabilities.cli} />
                {service.capabilities.cliName && (
                  <code className="text-xs bg-muted px-1 rounded">
                    {service.capabilities.cliName}
                  </code>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Additional
              </div>
              <div className="flex flex-wrap gap-1">
                {service.capabilities.oauth && (
                  <FeatureBadge feature="oauth" status={true} />
                )}
                {service.capabilities.skills && (
                  <Badge variant="secondary" className="text-xs">
                    Skills
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="mb-3 font-semibold">Features</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Webhooks</span>
              <Badge
                variant={service.features.webhooks ? "default" : "outline"}
                className="text-xs"
              >
                {service.features.webhooks ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Agent Rules</span>
              <Badge
                variant={service.features.agentRules ? "default" : "outline"}
                className="text-xs"
              >
                {service.features.agentRules ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Error Handling
              </span>
              <Badge variant="secondary" className="text-xs capitalize">
                {service.features.errorHandling}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rate Limits</span>
              <Badge
                variant={service.features.rateLimits ? "default" : "outline"}
                className="text-xs"
              >
                {service.features.rateLimits ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Strengths */}
        {service.strengths.length > 0 && (
          <div>
            <h3 className="mb-3 font-semibold">Strengths</h3>
            <ul className="space-y-1 text-sm">
              {service.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gaps */}
        {service.gaps.length > 0 && (
          <div>
            <h3 className="mb-3 font-semibold">Gaps</h3>
            <ul className="space-y-1 text-sm">
              {service.gaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-yellow-500">⚠</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Best For */}
        <div>
          <h3 className="mb-3 font-semibold">Best For</h3>
          <p className="text-sm text-muted-foreground">{service.bestFor}</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" asChild>
            <a
              href={service.metadata.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Homepage ↗
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={service.metadata.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs ↗
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={copyAsJSON}>
            Copy JSON
          </Button>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-muted-foreground pt-2">
          Last updated: {service.lastUpdated}
        </div>
      </CardContent>
    </Card>
  );
}
