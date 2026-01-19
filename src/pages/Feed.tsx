import { useState } from "react";
import { games } from "@/data/games";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";
import FeedTabs from "@/components/FeedTabs";

const Feed = () => {
  const [activeTab, setActiveTab] = useState("foryou");

  // Simulate different feeds based on tab
  const getGames = () => {
    switch (activeTab) {
      case "trending":
        return [...games].sort((a, b) => b.plays - a.plays);
      case "new":
        return [...games].reverse();
      default:
        return games;
    }
  };

  const displayedGames = getGames();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="max-w-lg mx-auto px-4 pt-4">
          <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </header>

      {/* Feed */}
      <main className="max-w-lg mx-auto px-4 py-4">
        <div className="grid gap-4">
          {displayedGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
        
        {/* Load more indicator */}
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Pull down to refresh · Scroll for more
          </p>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default Feed;
