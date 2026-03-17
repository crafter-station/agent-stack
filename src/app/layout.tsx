import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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

const title = "Agent Stack — Which dev tools are ready for AI agents?";
const description =
  "Ranking 49 developer tools across 5 dimensions: MCP Server, Platform API, CLI, Skills, and Docs. See which services are truly agent-ready.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://agent-stack.crafter.run"),
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Agent Stack",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@RaillyHugo",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
