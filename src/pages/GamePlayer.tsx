import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Gamepad2 } from "lucide-react";
import { games } from "@/data/games";
import HeartBurst from "@/components/HeartBurst";
import PullDownMenu from "@/components/PullDownMenu";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";

const GamePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [heartBurst, setHeartBurst] = useState({ visible: false, x: 0, y: 0 });
  
  // Touch handling
  const [touchStart, setTouchStart] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);

  // Find current game
  useEffect(() => {
    const index = games.findIndex((g) => g.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [id]);

  const currentGame = games[currentIndex];
  const prevGame = games[currentIndex - 1];
  const nextGame = games[currentIndex + 1];

  // Auto-hide info box
  useEffect(() => {
    if (showInfo) {
      const timer = setTimeout(() => setShowInfo(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showInfo, currentIndex]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Simulate 404 for demo
      setHasError(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleDoubleTap = useCallback((x: number, y: number) => {
    setIsLiked(true);
    setHeartBurst({ visible: true, x, y });
    
    setTimeout(() => {
      setHeartBurst((prev) => ({ ...prev, visible: false }));
    }, 1000);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStart;
    
    // Pull down for menu
    if (diff > 0 && diff < 150) {
      setPullDistance(diff);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    const diff = endY - touchStart;
    
    // Open menu if pulled down enough
    if (pullDistance > 80) {
      setShowMenu(true);
    }
    setPullDistance(0);
    
    // Swipe navigation
    if (Math.abs(diff) > 100) {
      if (diff > 0 && prevGame) {
        // Swipe down - previous game
        navigate(`/play/${prevGame.id}`);
      } else if (diff < 0 && nextGame) {
        // Swipe up - next game
        navigate(`/play/${nextGame.id}`);
      }
    }
    
    // Double tap detection
    const now = Date.now();
    if (now - lastTap < 300) {
      handleDoubleTap(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    setLastTap(now);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentGame?.title,
          text: `Check out ${currentGame?.title} on Playnfinity!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  const goToGame = (direction: "prev" | "next") => {
    if (direction === "prev" && prevGame) {
      navigate(`/play/${prevGame.id}`);
    } else if (direction === "next" && nextGame) {
      navigate(`/play/${nextGame.id}`);
    }
  };

  if (!currentGame) {
    navigate("/feed");
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 gradient-purple-page touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => setShowInfo(true)}
    >
      {/* Pull indicator */}
      <div 
        className={cn(
          "absolute top-4 left-1/2 -translate-x-1/2 z-30 transition-all duration-200",
          pullDistance > 20 ? "opacity-100" : "opacity-0"
        )}
        style={{ transform: `translateX(-50%) translateY(${Math.min(pullDistance / 2, 40)}px)` }}
      >
        <div className="w-12 h-1 rounded-full bg-white/50" />
        <p className="text-xs text-white/70 mt-2 text-center">
          {pullDistance > 80 ? "Release for menu" : "Pull for menu"}
        </p>
      </div>

      {/* Game iframe or placeholder */}
      <div className="absolute inset-0">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner message="Loading game..." size="lg" />
          </div>
        ) : hasError ? (
          // Beautiful placeholder for 404
          <div className="relative w-full h-full">
            {/* Background thumbnail */}
            <img
              src={currentGame.thumbnail}
              alt={currentGame.title}
              className="absolute inset-0 w-full h-full object-cover blur-sm opacity-30"
            />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-32 h-32 rounded-3xl overflow-hidden mb-6 glow-primary-intense">
                <img
                  src={currentGame.thumbnail}
                  alt={currentGame.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Gamepad2 className="w-12 h-12 text-primary mb-4 animate-float" />
              
              <h2 className="font-display text-2xl font-bold mb-2">{currentGame.title}</h2>
              <p className="text-muted-foreground mb-6">
                Launching soon on YOM...
              </p>
              
              <div className="flex items-center gap-2 text-sm text-primary">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Coming very soon</span>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={currentGame.embedUrl}
            className="w-full h-full border-0"
            allow="fullscreen; autoplay"
            title={currentGame.title}
          />
        )}
      </div>

      {/* Navigation hints */}
      {prevGame && (
        <button
          onClick={() => goToGame("prev")}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-20 p-2 glass rounded-full opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Previous game"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
      
      {nextGame && (
        <button
          onClick={() => goToGame("next")}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 p-2 glass rounded-full opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Next game"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}

      {/* Info box */}
      <div 
        className={cn(
          "absolute bottom-20 left-4 right-4 z-20 glass rounded-2xl p-4 transition-all duration-500",
          showInfo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <h3 className="font-display font-semibold text-lg">{currentGame.title}</h3>
        <p className="text-sm text-muted-foreground">by {currentGame.creator}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span>{currentGame.plays.toLocaleString()} plays</span>
          <span className={cn(isLiked && "text-heart")}>
            {(currentGame.likes + (isLiked ? 1 : 0)).toLocaleString()} likes
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => navigate("/feed")}
        className="absolute top-4 right-4 z-30 glass px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
      >
        Close
      </button>

      {/* Heart burst animation */}
      <HeartBurst 
        isVisible={heartBurst.visible} 
        x={heartBurst.x} 
        y={heartBurst.y} 
      />

      {/* Pull down menu */}
      <PullDownMenu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onShare={handleShare}
        onFullscreen={handleFullscreen}
        onLike={() => setIsLiked(!isLiked)}
        isLiked={isLiked}
        gameTitle={currentGame.title}
      />
    </div>
  );
};

export default GamePlayer;
