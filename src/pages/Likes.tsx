import { Heart } from "lucide-react";
import { games } from "@/data/games";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";

const Likes = () => {
  // Simulate liked games (first 3 for demo)
  const likedGames = games.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-heart fill-heart" />
            <h1 className="font-display text-2xl font-bold">Liked Games</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        {likedGames.length > 0 ? (
          <div className="grid gap-4">
            {likedGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">No liked games yet</h2>
            <p className="text-muted-foreground">
              Double-tap games while playing to add them here
            </p>
          </div>
        )}
      </main>

      <Navbar />
    </div>
  );
};

export default Likes;
