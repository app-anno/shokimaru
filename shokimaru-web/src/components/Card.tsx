interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradient?: "primary" | "secondary" | "ocean" | "none";
  padding?: "sm" | "md" | "lg";
}

export default function Card({
  children,
  className = "",
  hover = true,
  glass = false,
  gradient = "none",
  padding = "md",
}: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const gradientClasses = {
    primary: "bg-gradient-to-br from-primary-400 to-primary-600 text-white",
    secondary: "bg-gradient-to-br from-secondary-400 to-secondary-600 text-white",
    ocean: "bg-gradient-to-br from-ocean-light to-ocean-dark text-white",
    none: "bg-white",
  };

  const baseClasses = glass
    ? "backdrop-blur-md bg-white/70 border border-white/20"
    : gradient !== "none"
    ? gradientClasses[gradient]
    : "bg-white border border-gray-100";

  const hoverClasses = hover
    ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
    : "transition-shadow duration-300";

  return (
    <div
      className={`
        ${baseClasses}
        ${hoverClasses}
        ${paddingClasses[padding]}
        rounded-2xl shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}