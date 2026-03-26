import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Agent Stack — Developer Tools Ranked by AI Agent Readiness";
const description =
  "Rankings for 68 developer tools across 5 agent-readiness dimensions: MCP Server, Platform API, CLI, Agent Skills, and Docs. Find which services are truly ready for AI coding agents.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://agent-stack.crafter.run"),
  alternates: {
    canonical: "https://agent-stack.crafter.run",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Agent Stack",
    url: "https://agent-stack.crafter.run",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@RaillyHugo",
    site: "@crafterstation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
