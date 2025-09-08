import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Users, Flame } from "lucide-react";

export const FeaturedBets = () => {
  const featuredBets = [
    {
      id: 1,
      title: "Super Bowl 2024 Winner",
      description: "Which team will win Super Bowl LVIII?",
      category: "Sports",
      odds: {
        option1: { name: "Chiefs", odds: "+150", percentage: 45 },
        option2: { name: "Bills", odds: "+200", percentage: 35 },
        option3: { name: "Ravens", odds: "+300", percentage: 20 }
      },
      volume: "$2.3M",
      participants: 15420,
      timeLeft: "2d 14h",
      trending: true,
      type: "hot"
    },
    {
      id: 2,
      title: "2024 Presidential Election",
      description: "Who will win the 2024 US Presidential Election?",
      category: "Politics",
      odds: {
        option1: { name: "Biden", odds: "+110", percentage: 48 },
        option2: { name: "Trump", odds: "+120", percentage: 42 },
        option3: { name: "Other", odds: "+800", percentage: 10 }
      },
      volume: "$8.7M",
      participants: 45230,
      timeLeft: "8mo 12d",
      trending: false,
      type: "featured"
    },
    {
      id: 3,
      title: "Oscars Best Picture 2024",
      description: "Which film will win Best Picture at the 2024 Academy Awards?",
      category: "Entertainment",
      odds: {
        option1: { name: "Oppenheimer", odds: "+250", percentage: 35 },
        option2: { name: "Killers of the Flower Moon", odds: "+300", percentage: 28 },
        option3: { name: "Barbie", odds: "+400", percentage: 22 }
      },
      volume: "$890K",
      participants: 8940,
      timeLeft: "1mo 5d",
      trending: true,
      type: "trending"
    }
  ];

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'hot': return 'destructive';
      case 'trending': return 'secondary';
      default: return 'default';
    }
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'hot': return Flame;
      case 'trending': return TrendingUp;
      default: return Clock;
    }
  };

  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Featured <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">Markets</span>
          </h2>
          <p className="text-muted-foreground">High-volume, trending betting opportunities</p>
        </div>
        <Button variant="outline" className="glass-card">
          View All Markets
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredBets.map((bet) => {
          const BadgeIcon = getBadgeIcon(bet.type);
          
          return (
            <Card 
              key={bet.id} 
              className="glass-card border-0 hover:bg-surface-elevated/50 transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Badge variant={getBadgeVariant(bet.type)} className="flex items-center gap-1">
                    <BadgeIcon className="w-3 h-3" />
                    {bet.category}
                  </Badge>
                  {bet.trending && (
                    <div className="w-2 h-2 bg-success rounded-full pulse-live" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {bet.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {bet.description}
                  </p>
                </div>

                {/* Betting Options */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Top Options</span>
                    <span>Odds</span>
                  </div>
                  
                  {Object.entries(bet.odds).slice(0, 2).map(([key, option]) => (
                    <div 
                      key={key}
                      className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer group/option"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 bg-primary rounded-full"
                          style={{ width: `${Math.max(option.percentage * 0.3, 12)}px` }}
                        />
                        <span className="font-medium group-hover/option:text-primary transition-colors">
                          {option.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-success">{option.odds}</div>
                        <div className="text-xs text-muted-foreground">{option.percentage}%</div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full mt-2 glass-card">
                    View All Options
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-muted-foreground mr-1" />
                    </div>
                    <p className="text-sm font-semibold">{bet.participants.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Bettors</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="w-4 h-4 text-success mr-1" />
                    </div>
                    <p className="text-sm font-semibold text-success">{bet.volume}</p>
                    <p className="text-xs text-muted-foreground">Volume</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-4 h-4 text-warning mr-1" />
                    </div>
                    <p className="text-sm font-semibold">{bet.timeLeft}</p>
                    <p className="text-xs text-muted-foreground">Left</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};