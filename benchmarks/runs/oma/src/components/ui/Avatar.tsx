interface AvatarProps {
  emoji: string;
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-base",
  md: "w-12 h-12 text-2xl",
  lg: "w-16 h-16 text-3xl",
  xl: "w-24 h-24 text-5xl",
};

const defaultColors = [
  "bg-spark-100",
  "bg-ocean-400/20",
  "bg-forest-400/20",
  "bg-magic-400/20",
  "bg-candy-400/20",
  "bg-sunset-400/20",
];

export function Avatar({
  emoji,
  label,
  size = "md",
  color,
  className = "",
}: AvatarProps) {
  const bgColor = color ?? defaultColors[emoji.codePointAt(0)! % defaultColors.length];

  return (
    <div
      className={[
        "inline-flex items-center justify-center rounded-full select-none",
        bgColor,
        sizeClasses[size],
        className,
      ].join(" ")}
      role="img"
      aria-label={label ?? emoji}
    >
      <span aria-hidden="true">{emoji}</span>
    </div>
  );
}
