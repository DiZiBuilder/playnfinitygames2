import { User, Gamepad2, Heart, Trophy, Settings, LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";

const Profile = () => {
  // Guest state for MVP
  const isLoggedIn = false;

  const stats = [
    { icon: Gamepad2, value: "12", label: "Games Played" },
    { icon: Heart, value: "24", label: "Likes Given" },
    { icon: Trophy, value: "3", label: "Day Streak" },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen gradient-purple-page pb-24">
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          {/* Avatar placeholder */}
          <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          
          <h1 className="font-display text-2xl font-bold mb-2">Welcome, Player</h1>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Sign in to track your played games, save your favorites, and build your streak.
          </p>
          
          <button className="px-8 py-4 rounded-full gradient-primary font-semibold text-white glow-primary-intense hover:scale-105 transition-transform flex items-center gap-2">
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Or continue as guest
          </p>
        </div>
        
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-purple-page pb-24">
      {/* Header */}
      <header className="glass-strong safe-top">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-2xl font-bold">Profile</h1>
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          {/* Profile card */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center glow-primary">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Player123</h2>
              <p className="text-muted-foreground">Playing since Jan 2026</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 text-center">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Recent activity */}
        <h3 className="font-display font-semibold mb-4">Recent Activity</h3>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-muted-foreground">
            Your gaming history will appear here
          </p>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default Profile;
