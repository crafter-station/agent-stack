interface FirecrawlLogoProps {
  variant?: "icon";
  className?: string;
}

export function FirecrawlLogo({
  className = "h-5 w-5",
}: FirecrawlLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Firecrawl"
    >
      <path
        d="M12 2C8 2 6 6 6 10c0 2 1 4 2 5.5C9 17 10 19 10 22h4c0-3 1-5 2-6.5C17 14 18 12 18 10c0-4-2-8-6-8z"
        fill="#FF6B35"
      />
      <path
        d="M12 6c-2 0-3 2-3 4 0 1 .5 2.5 1 3.5.5 1 1 2.5 1 4h2c0-1.5.5-3 1-4 .5-1 1-2.5 1-3.5 0-2-1-4-3-4z"
        fill="#FFB347"
      />
    </svg>
  );
}
