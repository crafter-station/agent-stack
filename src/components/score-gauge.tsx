interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function ScoreGauge({ score, size = "sm" }: ScoreGaugeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "var(--color-green-400)";
    if (score >= 70) return "var(--color-blue-400)";
    return "var(--color-red-400)";
  };

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
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
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
      </svg>
      <span
        className="absolute font-bold tabular-nums"
        style={{ fontSize, color }}
      >
        {score}
      </span>
    </div>
  );
}
