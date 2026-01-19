export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  plays: number;
  likes: number;
  tags: string[];
  embedUrl: string;
  creator: string;
}

export const games: Game[] = [
  {
    id: "1",
    title: "Cyber Drift Racing",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
    duration: "2-5 min",
    plays: 12453,
    likes: 3420,
    tags: ["Racing", "Arcade"],
    embedUrl: "https://yom.net/game/cyber-drift",
    creator: "NeonStudio"
  },
  {
    id: "2",
    title: "Pixel Survivor",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
    duration: "5-10 min",
    plays: 8721,
    likes: 2156,
    tags: ["Survival", "Roguelike"],
    embedUrl: "https://yom.net/game/pixel-survivor",
    creator: "RetroGames"
  },
  {
    id: "3",
    title: "Space Blaster X",
    thumbnail: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=800&fit=crop",
    duration: "1-3 min",
    plays: 24891,
    likes: 8932,
    tags: ["Shooter", "Endless"],
    embedUrl: "https://yom.net/game/space-blaster",
    creator: "CosmicDev"
  },
  {
    id: "4",
    title: "Neon Puzzle Quest",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=800&fit=crop",
    duration: "3-8 min",
    plays: 5632,
    likes: 1823,
    tags: ["Puzzle", "Brain"],
    embedUrl: "https://yom.net/game/neon-puzzle",
    creator: "MindGames"
  },
  {
    id: "5",
    title: "Dungeon Rush",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
    duration: "5-15 min",
    plays: 18234,
    likes: 6721,
    tags: ["RPG", "Action"],
    embedUrl: "https://yom.net/game/dungeon-rush",
    creator: "QuestForge"
  },
  {
    id: "6",
    title: "Beat Runner",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541f7f851a?w=600&h=800&fit=crop",
    duration: "2-4 min",
    plays: 31205,
    likes: 12453,
    tags: ["Music", "Runner"],
    embedUrl: "https://yom.net/game/beat-runner",
    creator: "RhythmLabs"
  }
];

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};
