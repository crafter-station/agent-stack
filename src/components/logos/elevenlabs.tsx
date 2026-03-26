interface LogoProps {
  className?: string;
  variant?: "icon";
  mode?: "dark" | "light";
}

const COLORS = {
  dark: "#000000",
  light: "#FFFFFF",
};

const TEXT_COLORS = {
  dark: "#FFFFFF",
  light: "#000000",
};

export function ElevenlabsLogo({
  className,
  mode = "dark",
}: LogoProps) {
  const bgColor = COLORS[mode];
  const textColor = TEXT_COLORS[mode];
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>ElevenLabs</title>
      <circle cx="12" cy="12" r="11" fill={bgColor} />
      <text x="12" y="16" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="bold" fontFamily="system-ui">EL</text>
    </svg>
  );
}
