interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function ScoreGauge({ score, size = "sm" }: ScoreGaugeProps) {
  const getColor = (score: number) => {
    if (score >= 95) return "var(--color-emerald-400)";
    if (score >= 85) return "var(--color-cyan-400)";
    if (score >= 75) return "var(--color-orange-400)";
    if (score >= 60) return "var(--color-yellow-400)";
    return "var(--color-red-400)";
  };

  const isPerfect = score === 100;

  const sizes = {
    sm: { width: 32, height: 32, strokeWidth: 3, fontSize: "10px" },
    md: { width: 48, height: 48, strokeWidth: 4, fontSize: "12px" },
    lg: { width: 64, height: 64, strokeWidth: 5, fontSize: "14px" },
  };

  const { width, height, strokeWidth, fontSize } = sizes[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={width}
        height={height}
        className="transform -rotate-90"
        role="img"
        aria-label={`Score: ${score}`}
      >
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={isPerfect ? color : "var(--color-border)"}
          strokeWidth={strokeWidth}
          fill={isPerfect ? color : "none"}
        />
        {!isPerfect && (
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}
      </svg>
      <span
        className="absolute tabular-nums"
        style={{
          fontSize,
          color: isPerfect ? "var(--color-black)" : color,
          fontWeight: isPerfect ? 900 : 700,
        }}
      >
        {score}
      </span>
    </div>
  );
}
