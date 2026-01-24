import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  path: string;
  icon: string;
  activeIcon: string;
}

const navItems: NavItem[] = [
  { label: "Home", path: "/", icon: "/nav/home.png", activeIcon: "/nav/home-active.png" },
  { label: "Feed", path: "/feed", icon: "/nav/feed.png", activeIcon: "/nav/feed-active.png" },
  { label: "Explore", path: "/explore", icon: "/nav/explore.png", activeIcon: "/nav/explore-active.png" },
  { label: "Likes", path: "/likes", icon: "/nav/likes.png", activeIcon: "/nav/likes-active.png" },
  { label: "Profile", path: "/profile", icon: "/nav/profile.png", activeIcon: "/nav/profile-active.png" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/25 backdrop-blur-md border-t border-white/10 safe-bottom">
      <div className="flex items-center justify-around h-10 max-w-md mx-auto px-7">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full transition-all duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <img 
                src={isActive ? item.activeIcon : item.icon}
                alt={item.label}
                className={cn(
                  "w-7 h-7 transition-all duration-300",
                  isActive && "drop-shadow-[0_0_8px_hsl(270_100%_70%)]"
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
