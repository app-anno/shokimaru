import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = "font-medium rounded-xl transition-all duration-200 inline-flex items-center justify-center text-center focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-primary-500",
    secondary: "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-secondary-500",
    accent: "bg-accent hover:bg-accent-dark active:bg-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-accent",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:shadow-md focus:ring-primary-500",
    danger: "bg-error hover:bg-red-600 active:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
    fullWidth ? "w-full" : ""
  } ${
    disabled || loading ? "opacity-50 cursor-not-allowed transform-none" : ""
  } ${className}`;

  const content = loading ? (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {children}
    </>
  ) : (
    children
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}