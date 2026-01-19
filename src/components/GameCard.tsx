import { Play, Heart, Clock, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Game, formatNumber } from "@/data/games";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface GameCardProps {
  game: Game;
  index: number;
}

const GameCard = ({ game, index }: GameCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handlePlay = () => {
    navigate(`/play/${game.id}`);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl game-card-glow cursor-pointer",
        "bg-card border border-border/50 min-h-[420px]",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handlePlay}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-shimmer" />
        )}
        {imageError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
            <Gamepad2 className="w-16 h-16 text-primary/50" />
          </div>
        ) : (
          <img
            src={game.thumbnail}
            alt={game.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button 
            className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center glow-primary-intense transform hover:scale-110 transition-transform"
            aria-label={`Play ${game.title}`}
          >
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </button>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium">{game.duration}</span>
        </div>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {game.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/20 text-primary border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg mb-1 line-clamp-1">
          {game.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">by {game.creator}</p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Gamepad2 className="w-4 h-4" />
            <span>{formatNumber(game.plays)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-heart" />
            <span>{formatNumber(game.likes)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
