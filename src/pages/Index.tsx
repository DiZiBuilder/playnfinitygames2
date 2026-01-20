import { useNavigate } from "react-router-dom";
import { Play, ArrowRight, Gamepad2, Users, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Gamepad2, value: "1.2K", label: "Plays Today" },
    { icon: Users, value: "324", label: "Active Now" },
    { icon: Heart, value: "8.4K", label: "Likes" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Video Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability - lighter to show video */}
        <div className="absolute inset-0 bg-background/50" />
      </div>
      
      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pb-24 z-10">
        {/* Content */}
        <div className="relative z-10 text-center max-w-lg mx-auto">
          {/* Logo */}
          <div className="mb-6 inline-flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Playnfinity Logo" 
              className="w-20 h-20 animate-float"
            />
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            <div className="whitespace-nowrap">
              <span className="text-primary text-glow">Playnfinity</span>
              <span className="text-foreground"> — Play. Scroll.</span>
            </div>
            <span className="text-foreground">Play some more.</span>
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8">
            TikTok for Games. Infinite scrolling, instant playing.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/feed")}
              className="group w-full sm:w-auto px-8 py-4 rounded-full gradient-primary font-semibold text-white glow-primary-intense hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              Play Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="font-display text-2xl font-bold text-primary text-glow">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Index;
