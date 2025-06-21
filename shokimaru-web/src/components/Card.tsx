interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = "", 
  hover = true 
}: CardProps) {
  const baseClasses = "bg-white rounded-lg shadow-md p-6";
  const hoverClasses = hover ? "hover:shadow-lg transition-shadow duration-200" : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}