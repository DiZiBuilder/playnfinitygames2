import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeartBurstProps {
  isVisible: boolean;
  x: number;
  y: number;
}

const HeartBurst = ({ isVisible, x, y }: HeartBurstProps) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Heart
        className={cn(
          "w-24 h-24 text-heart fill-heart animate-heart-burst glow-heart",
          "drop-shadow-[0_0_30px_hsl(var(--heart-glow))]"
        )}
      />
      
      {/* Particle effects */}
      {[...Array(8)].map((_, i) => (
        <Heart
          key={i}
          className="absolute w-6 h-6 text-heart fill-heart opacity-80"
          style={{
            animation: `heart-burst 0.8s ease-out forwards`,
            animationDelay: `${i * 50}ms`,
            transform: `rotate(${i * 45}deg) translateY(-40px)`,
            transformOrigin: "center center",
          }}
        />
      ))}
    </div>
  );
};

export default HeartBurst;
