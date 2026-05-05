interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-spark-400 to-sunset-400 text-white shadow-lg hover:shadow-xl hover:from-spark-500 hover:to-sunset-500",
  secondary:
    "bg-white border-2 border-spark-400 text-sunset-500 hover:bg-spark-50",
  ghost:
    "bg-transparent text-sunset-500 hover:bg-spark-50",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-150",
        "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
