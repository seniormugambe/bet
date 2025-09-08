import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Filter, 
  Search, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Target,
  Zap,
  Star,
  RotateCcw
} from "lucide-react";

export const BettingFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [oddsRange, setOddsRange] = useState([1.1, 10.0]);
  const [volumeRange, setVolumeRange] = useState([1000, 1000000]);
  const [selectedSports, setSelectedSports] = useState<string[]>(["football", "basketball"]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(["match-winner"]);
  const [liveOnly, setLiveOnly] = useState(true);
  const [highVolumeOnly, setHighVolumeOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [boostedOnly, setBoostedOnly] = useState(false);

  const sports = [
    { id: "football", name: "Football", count: 145 },
    { id: "basketball", name: "Basketball", count: 89 },
    { id: "tennis", name: "Tennis", count: 234 },
    { id: "baseball", name: "Baseball", count: 67 },
    { id: "hockey", name: "Hockey", count: 43 },
    { id: "soccer", name: "Soccer", count: 312 },
    { id: "golf", name: "Golf", count: 28 },
    { id: "boxing", name: "Boxing", count: 15 }
  ];

  const markets = [
    { id: "match-winner", name: "Match Winner", count: 892 },
    { id: "totals", name: "Over/Under", count: 734 },
    { id: "handicap", name: "Handicap", count: 567 },
    { id: "first-half", name: "First Half", count: 423 },
    { id: "correct-score", name: "Correct Score", count: 234 },
    { id: "both-teams", name: "Both Teams to Score", count: 189 },
    { id: "corners", name: "Corners", count: 156 },
    { id: "cards", name: "Cards", count: 134 }
  ];

  const toggleSport = (sportId: string) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  const toggleMarket = (marketId: string) => {
    setSelectedMarkets(prev => 
      prev.includes(marketId) 
        ? prev.filter(id => id !== marketId)
        : [...prev, marketId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setOddsRange([1.1, 10.0]);
    setVolumeRange([1000, 1000000]);
    setSelectedSports([]);
    setSelectedMarkets([]);
    setLiveOnly(false);
    setHighVolumeOnly(false);
    setFavoritesOnly(false);
    setBoostedOnly(false);
  };

  const activeFiltersCount = 
    (searchQuery ? 1 : 0) +
    (liveOnly ? 1 : 0) +
    (highVolumeOnly ? 1 : 0) +
    (favoritesOnly ? 1 : 0) +
    (boostedOnly ? 1 : 0) +
    selectedSports.length +
    selectedMarkets.length;

  return (
    <Card className="glass-card border-0 h-fit sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filters
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="animate-pulse">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Markets
          </Label>
          <Input
            placeholder="Team, league, or market..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-surface border-border/50"
          />
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <Label>Quick Filters</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
                <span className="text-sm">Live Only</span>
              </div>
              <Switch checked={liveOnly} onCheckedChange={setLiveOnly} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm">High Volume</span>
              </div>
              <Switch checked={highVolumeOnly} onCheckedChange={setHighVolumeOnly} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning" />
                <span className="text-sm">Favorites</span>
              </div>
              <Switch checked={favoritesOnly} onCheckedChange={setFavoritesOnly} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm">Boosted Odds</span>
              </div>
              <Switch checked={boostedOnly} onCheckedChange={setBoostedOnly} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Odds Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Odds Range
          </Label>
          <div className="px-2">
            <Slider
              value={oddsRange}
              onValueChange={setOddsRange}
              max={20}
              min={1.01}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{oddsRange[0].toFixed(1)}</span>
              <span>{oddsRange[1].toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Volume Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Volume Range ($)
          </Label>
          <div className="px-2">
            <Slider
              value={volumeRange}
              onValueChange={setVolumeRange}
              max={5000000}
              min={100}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>${(volumeRange[0] / 1000).toFixed(0)}k</span>
              <span>${(volumeRange[1] / 1000).toFixed(0)}k</span>
            </div>
          </div>
        </div>

        <Accordion type="multiple" className="w-full">
          {/* Sports Filter */}
          <AccordionItem value="sports">
            <AccordionTrigger className="text-sm py-3">
              Sports ({selectedSports.length} selected)
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
              {sports.map((sport) => (
                <div
                  key={sport.id}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    selectedSports.includes(sport.id) ? 'bg-primary/20' : 'hover:bg-surface-elevated'
                  }`}
                  onClick={() => toggleSport(sport.id)}
                >
                  <span className="text-sm">{sport.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {sport.count}
                  </Badge>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Markets Filter */}
          <AccordionItem value="markets">
            <AccordionTrigger className="text-sm py-3">
              Markets ({selectedMarkets.length} selected)
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
              {markets.map((market) => (
                <div
                  key={market.id}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    selectedMarkets.includes(market.id) ? 'bg-primary/20' : 'hover:bg-surface-elevated'
                  }`}
                  onClick={() => toggleMarket(market.id)}
                >
                  <span className="text-sm">{market.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {market.count}
                  </Badge>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {activeFiltersCount > 0 && (
          <>
            <Separator />
            <Button
              variant="outline"
              className="w-full"
              onClick={clearFilters}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};