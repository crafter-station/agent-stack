"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn("h-8 w-32 animate-pulse rounded", className)}
        style={{ backgroundColor: "hsl(0 0% 10%)" }}
      />
    );
  }

  const themes = [
    { id: "light", label: "light" },
    { id: "dark", label: "dark" },
    { id: "system", label: "system" },
  ];

  return (
    <div
      data-slot="theme-switcher"
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded border",
        className,
      )}
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTheme(t.id)}
          className={cn(
            "px-3 py-1 text-xs font-mono rounded transition-all",
            theme === t.id
              ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
              : "hover:bg-[var(--color-muted)]",
          )}
          style={
            theme === t.id
              ? undefined
              : { color: "var(--color-muted-foreground)" }
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
