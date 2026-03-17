// @ts-nocheck
"use client";

import { useTheme } from "next-themes";
import { ClerkLogo } from "@/components/logos/clerk";
import { CloudflareLogo } from "@/components/logos/cloudflare";
import { GithubLogo } from "@/components/logos/github";
import { KapsoLogo } from "@/components/logos/kapso";
import { NeonLogo } from "@/components/logos/neon";
import { ResendLogo } from "@/components/logos/resend";
import { SupabaseLogo } from "@/components/logos/supabase";
import { TriggerLogo } from "@/components/logos/trigger";
import { FirecrawlLogo } from "@/components/logos/firecrawl";
import { LinearLogo } from "@/components/logos/linear";
import { PolarLogo } from "@/components/logos/polar";
import { SentryLogo } from "@/components/logos/sentry";
import { StripeLogo } from "@/components/logos/stripe";
import { UploadthingLogo } from "@/components/logos/uploadthing";
import { UpstashLogo } from "@/components/logos/upstash";
import { VercelLogo } from "@/components/logos/vercel";
import { PrismaLogo } from "@/components/logos/prisma";
import { BetterAuthLogo } from "@/components/logos/better-auth";
import { DrizzleLogo } from "@/components/logos/drizzle";

interface ServiceLogoProps {
  name: string;
  className?: string;
}

export function ServiceLogo({ name, className = "h-5 w-5" }: ServiceLogoProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Real logos from Elements registry (theme-aware)
  const realLogos: Record<string, React.ReactNode> = {
    Clerk: (
      <ClerkLogo
        variant="icon"
        colorScheme="purple"
        mode={isDark ? "dark" : "light"}
        className={className}
      />
    ),
    Supabase: <SupabaseLogo variant="icon" className={className} />,
    GitHub: <GithubLogo variant="invertocat" className={className} />,
    "Trigger.dev": (
      <TriggerLogo
        variant="icon"
        colorScheme="grayscale"
        mode={isDark ? "dark" : "light"}
        className={className}
      />
    ),
    Vercel: <VercelLogo variant="icon" className={className} />,
    Resend: <ResendLogo variant="icon" className={className} />,
    Neon: <NeonLogo variant="icon" className={className} />,
    Cloudflare: <CloudflareLogo variant="icon" className={className} />,
    Uploadthing: <UploadthingLogo variant="icon" className={className} />,
    Kapso: <KapsoLogo variant="icon" className={className} />,
    Firecrawl: <FirecrawlLogo variant="icon" className={className} />,
    Linear: (
      <LinearLogo
        variant="logo"
        mode={isDark ? "dark" : "light"}
        className={className}
      />
    ),
    Stripe: <StripeLogo className={className} />,
    Upstash: <UpstashLogo className={className} />,
    Sentry: (
      <SentryLogo
        mode={isDark ? "dark" : "light"}
        className={className}
      />
    ),
    Polar: <PolarLogo className={className} />,
    Prisma: (
      <PrismaLogo
        mode={isDark ? "dark" : "light"}
        className={className}
      />
    ),
    "Better Auth": <BetterAuthLogo className={className} />,
    Drizzle: (
      <DrizzleLogo
        mode={isDark ? "dark" : "light"}
        className={className}
      />
    ),
  };

  return <>{realLogos[name] || null}</>;
}
