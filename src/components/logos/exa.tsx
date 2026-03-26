interface LogoProps {
  className?: string;
  variant?: "icon";
  mode?: "dark" | "light";
}

const COLORS = {
  dark: "#111827",
  light: "#F9FAFB",
};

const TEXT_COLORS = {
  dark: "#FFFFFF",
  light: "#111827",
};

export function ExaLogo({
  className,
  mode = "dark",
}: LogoProps) {
  const bgColor = COLORS[mode];
  const textColor = TEXT_COLORS[mode];
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>Exa</title>
      <circle cx="12" cy="12" r="11" fill={bgColor} />
      <text x="12" y="16" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="bold" fontFamily="system-ui">EX</text>
    </svg>
  );
}
