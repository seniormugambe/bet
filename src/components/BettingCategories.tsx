import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Vote, Star, Calendar, Target, Gamepad2 } from "lucide-react";

export const BettingCategories = () => {
  const categories = [
    {
      name: "Sports",
      description: "Football, Basketball, Soccer & More",
      icon: Trophy,
      markets: 4847,
      volume: "$12.3M",
      color: "from-primary to-primary-glow"
    },
    {
      name: "Politics",
      description: "Elections, Policy Outcomes & Events",
      icon: Vote,
      markets: 2156,
      volume: "$8.7M",
      color: "from-danger to-danger-glow"
    },
    {
      name: "Entertainment",
      description: "Awards, Shows, Celebrity Events",
      icon: Star,
      markets: 1823,
      volume: "$5.2M",
      color: "from-warning to-warning-glow"
    },
    {
      name: "Events",
      description: "Weather, Economics, World Events",
      icon: Calendar,
      markets: 3421,
      volume: "$9.8M",
      color: "from-success to-success-glow"
    },
    {
      name: "Personal",
      description: "Custom Challenges & Predictions",
      icon: Target,
      markets: 967,
      volume: "$1.9M",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Gaming",
      description: "Esports, Tournaments & Competitions",
      icon: Gamepad2,
      markets: 2890,
      volume: "$7.4M",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Betting <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Categories</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore diverse markets and find the perfect betting opportunities across all categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.name} 
            className="glass-card border-0 hover:bg-surface-elevated/50 transition-all duration-300 group cursor-pointer overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">{category.markets.toLocaleString()} markets</p>
                  <p className="text-lg font-bold text-success">{category.volume}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
              
              {/* Progress bar showing activity */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Activity</span>
                  <span className="text-xs font-medium">High</span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};