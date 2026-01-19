import { Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner = ({ message = "Loading...", size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer glow ring */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow",
            sizeClasses[size]
          )} 
        />
        
        {/* Spinning ring */}
        <div 
          className={cn(
            "rounded-full border-2 border-transparent border-t-primary animate-spin-slow",
            sizeClasses[size]
          )} 
        />
        
        {/* Center icon */}
        <Gamepad2 
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-float",
            size === "sm" ? "w-4 h-4" : size === "md" ? "w-8 h-8" : "w-12 h-12"
          )} 
        />
      </div>
      
      <p className="text-muted-foreground text-sm animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
