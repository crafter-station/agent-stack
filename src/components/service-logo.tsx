// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AblyLogo } from "@/components/logos/ably";
import { AlgoliaLogo } from "@/components/logos/algolia";
import { Auth0Logo } from "@/components/logos/auth0";
import { AxiomLogo } from "@/components/logos/axiom";
import { BetterAuthLogo } from "@/components/logos/better-auth";
import { BraintrustLogo } from "@/components/logos/braintrust";
import { ClerkLogo } from "@/components/logos/clerk";
import { CloudflareLogo } from "@/components/logos/cloudflare";
import { CloudinaryLogo } from "@/components/logos/cloudinary";
import { ConvexLogo } from "@/components/logos/convex";
import { DatadogLogo } from "@/components/logos/datadog";
import { DrizzleLogo } from "@/components/logos/drizzle";
import { E2BLogo } from "@/components/logos/e2b";
import { ExpoLogo } from "@/components/logos/expo";
import { FalLogo } from "@/components/logos/fal";
import { FirecrawlLogo } from "@/components/logos/firecrawl";
import { FlyioLogo } from "@/components/logos/flyio";
import { GithubLogo } from "@/components/logos/github";
import { GrafanaLogo } from "@/components/logos/grafana";
import { InngestLogo } from "@/components/logos/inngest";
import { KapsoLogo } from "@/components/logos/kapso";
import { LangfuseLogo } from "@/components/logos/langfuse";
import { LaunchdarklyLogo } from "@/components/logos/launchdarkly";
import { LinearLogo } from "@/components/logos/linear";
import { MeilisearchLogo } from "@/components/logos/meilisearch";
import { MongodbLogo } from "@/components/logos/mongodb";
import { NeonLogo } from "@/components/logos/neon";
import { PagerdutyLogo } from "@/components/logos/pagerduty";
import { PayloadLogo } from "@/components/logos/payload";
import { PlanetscaleLogo } from "@/components/logos/planetscale";
import { PolarLogo } from "@/components/logos/polar";
import { PosthogLogo } from "@/components/logos/posthog";
import { PrismaLogo } from "@/components/logos/prisma";
import { RailwayLogo } from "@/components/logos/railway";
import { ReplicateLogo } from "@/components/logos/replicate";
import { RenderLogo } from "@/components/logos/render";
import { ResendLogo } from "@/components/logos/resend";
import { SanityLogo } from "@/components/logos/sanity";
import { SentryLogo } from "@/components/logos/sentry";
import { StripeLogo } from "@/components/logos/stripe";
import { SupabaseLogo } from "@/components/logos/supabase";
import { TerraformLogo } from "@/components/logos/terraform";
import { TriggerLogo } from "@/components/logos/trigger";
import { TursoLogo } from "@/components/logos/turso";
import { TwilioLogo } from "@/components/logos/twilio";
import { UploadthingLogo } from "@/components/logos/uploadthing";
import { UpstashLogo } from "@/components/logos/upstash";
import { VercelLogo } from "@/components/logos/vercel";
import { WorkosLogo } from "@/components/logos/workos";
import { XataLogo } from "@/components/logos/xata";

interface ServiceLogoProps {
  name: string;
  className?: string;
}

export function ServiceLogo({ name, className = "h-5 w-5" }: ServiceLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`${className} rounded bg-muted/30 animate-pulse`} />;
  }

  const isDark = resolvedTheme === "dark";
  const mode = isDark ? "dark" : "light";

  const realLogos: Record<string, React.ReactNode> = {
    Ably: <AblyLogo mode={mode} className={className} />,
    Algolia: <AlgoliaLogo mode={mode} className={className} />,
    Auth0: <Auth0Logo mode={mode} className={className} />,
    Axiom: <AxiomLogo mode={mode} className={className} />,
    "Better Auth": <BetterAuthLogo className={className} />,
    Braintrust: <BraintrustLogo mode={mode} className={className} />,
    Clerk: (
      <ClerkLogo
        variant="icon"
        colorScheme="purple"
        mode={mode}
        className={className}
      />
    ),
    Cloudflare: <CloudflareLogo variant="icon" className={className} />,
    Cloudinary: <CloudinaryLogo mode={mode} className={className} />,
    Convex: <ConvexLogo mode={mode} className={className} />,
    Datadog: <DatadogLogo mode={mode} className={className} />,
    Drizzle: <DrizzleLogo mode={mode} className={className} />,
    E2B: <E2BLogo mode={mode} className={className} />,
    Expo: <ExpoLogo mode={mode} className={className} />,
    "fal.ai": <FalLogo mode={mode} className={className} />,
    Firecrawl: <FirecrawlLogo variant="icon" className={className} />,
    "Fly.io": <FlyioLogo mode={mode} className={className} />,
    GitHub: <GithubLogo variant="invertocat" className={className} />,
    Grafana: <GrafanaLogo mode={mode} className={className} />,
    Inngest: <InngestLogo mode={mode} className={className} />,
    Kapso: <KapsoLogo variant="icon" className={className} />,
    Langfuse: <LangfuseLogo mode={mode} className={className} />,
    LaunchDarkly: <LaunchdarklyLogo mode={mode} className={className} />,
    Linear: <LinearLogo variant="logo" mode={mode} className={className} />,
    Meilisearch: <MeilisearchLogo mode={mode} className={className} />,
    MongoDB: <MongodbLogo mode={mode} className={className} />,
    Neon: <NeonLogo variant="icon" className={className} />,
    PagerDuty: <PagerdutyLogo mode={mode} className={className} />,
    Payload: <PayloadLogo mode={mode} className={className} />,
    PlanetScale: <PlanetscaleLogo mode={mode} className={className} />,
    Polar: <PolarLogo className={className} />,
    PostHog: <PosthogLogo mode={mode} className={className} />,
    Prisma: <PrismaLogo mode={mode} className={className} />,
    Railway: <RailwayLogo mode={mode} className={className} />,
    Render: <RenderLogo mode={mode} className={className} />,
    Replicate: <ReplicateLogo mode={mode} className={className} />,
    Resend: <ResendLogo variant="icon" className={className} />,
    Sanity: <SanityLogo mode={mode} className={className} />,
    Sentry: <SentryLogo mode={mode} className={className} />,
    Stripe: <StripeLogo className={className} />,
    Supabase: <SupabaseLogo variant="icon" className={className} />,
    Terraform: <TerraformLogo mode={mode} className={className} />,
    "Trigger.dev": (
      <TriggerLogo
        variant="icon"
        colorScheme="grayscale"
        mode={mode}
        className={className}
      />
    ),
    Turso: <TursoLogo mode={mode} className={className} />,
    Twilio: <TwilioLogo mode={mode} className={className} />,
    Uploadthing: <UploadthingLogo variant="icon" className={className} />,
    Upstash: <UpstashLogo className={className} />,
    Vercel: <VercelLogo variant="icon" className={className} />,
    WorkOS: <WorkosLogo mode={mode} className={className} />,
    Xata: <XataLogo mode={mode} className={className} />,
  };

  return <>{realLogos[name] || null}</>;
}
