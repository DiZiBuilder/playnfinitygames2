import { Home, Gamepad2, Search, Heart, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Gamepad2, label: "Feed", path: "/feed" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: Heart, label: "Likes", path: "/likes" },
  { icon: User, label: "Profile", path: "/profile" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full transition-all duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive && "glow-primary-intense drop-shadow-[0_0_8px_hsl(var(--glow))]"
                )} 
              />
              <span 
                className={cn(
                  "text-[10px] mt-1 font-medium transition-all duration-300",
                  isActive && "text-glow"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary glow-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
