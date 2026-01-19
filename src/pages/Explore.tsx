import { Search } from "lucide-react";
import { games } from "@/data/games";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";

const categories = [
  { id: "all", label: "All" },
  { id: "action", label: "Action" },
  { id: "puzzle", label: "Puzzle" },
  { id: "racing", label: "Racing" },
  { id: "rpg", label: "RPG" },
  { id: "music", label: "Music" },
];

const Explore = () => {
  return (
    <div className="min-h-screen gradient-purple-page pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="font-display text-2xl font-bold mb-4">Explore</h1>
          
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap glass hover:bg-secondary transition-colors first:gradient-primary first:text-white"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-lg mx-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {games.map((game, index) => (
            <div key={game.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <GameCard game={game} index={index} />
            </div>
          ))}
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default Explore;
