import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
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
}: ButtonProps) {
  const baseClasses = "font-bold rounded-lg transition-all duration-200 inline-block text-center";
  
  const variantClasses = {
    primary: "bg-primary hover:bg-sky-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-secondary hover:bg-cyan-600 text-white shadow-lg hover:shadow-xl",
  };

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}