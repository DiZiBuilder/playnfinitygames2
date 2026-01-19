import { cn } from "@/lib/utils";

interface FeedTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "foryou", label: "For You" },
  { id: "trending", label: "Trending" },
  { id: "new", label: "New" },
];

const FeedTabs = ({ activeTab, onTabChange }: FeedTabsProps) => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isActive
                ? "gradient-primary text-white glow-primary"
                : "glass text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default FeedTabs;
