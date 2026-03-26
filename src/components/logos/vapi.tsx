interface LogoProps {
  className?: string;
  variant?: "icon";
  mode?: "dark" | "light";
}

export function VapiLogo({
  className,
  mode = "dark",
}: LogoProps) {
  const textColor = mode === "dark" ? "#FFFFFF" : "#FFFFFF";
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>Vapi</title>
      <circle cx="12" cy="12" r="11" fill="#7C3AED" />
      <text x="12" y="16" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="bold" fontFamily="system-ui">VA</text>
    </svg>
  );
}
