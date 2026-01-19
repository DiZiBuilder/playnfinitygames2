import { Share2, Maximize2, X, Heart, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface PullDownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
  onFullscreen: () => void;
  onLike: () => void;
  isLiked: boolean;
  gameTitle: string;
}

const PullDownMenu = ({
  isOpen,
  onClose,
  onShare,
  onFullscreen,
  onLike,
  isLiked,
  gameTitle,
}: PullDownMenuProps) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      icon: Share2,
      label: "Share",
      onClick: onShare,
    },
    {
      icon: Heart,
      label: isLiked ? "Liked" : "Like",
      onClick: onLike,
      active: isLiked,
    },
    {
      icon: Maximize2,
      label: "Fullscreen",
      onClick: onFullscreen,
    },
    {
      icon: Flag,
      label: "Report",
      onClick: () => {},
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Menu */}
      <div 
        className="absolute top-0 left-0 right-0 glass-strong rounded-b-3xl p-6 pt-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-muted-foreground/30" />
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-lg truncate pr-4">{gameTitle}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick();
                if (item.label !== "Like") onClose();
              }}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl transition-all",
                "hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                item.active && "text-heart"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                item.active ? "bg-heart/20" : "glass"
              )}>
                <item.icon className={cn(
                  "w-5 h-5",
                  item.active && "fill-heart text-heart"
                )} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PullDownMenu;
