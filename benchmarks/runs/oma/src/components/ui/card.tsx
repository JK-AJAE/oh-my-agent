interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className = "",
  hoverable = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={[
        "bg-white rounded-3xl shadow-md",
        paddingClasses[padding],
        hoverable
          ? "transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
