import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  Users,
  Zap,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export const BettingStats = () => {
  const volumeData = [
    { name: 'Mon', volume: 2400000, bets: 1240 },
    { name: 'Tue', volume: 1398000, bets: 980 },
    { name: 'Wed', volume: 9800000, bets: 2100 },
    { name: 'Thu', volume: 3908000, bets: 1650 },
    { name: 'Fri', volume: 4800000, bets: 2400 },
    { name: 'Sat', volume: 3800000, bets: 1890 },
    { name: 'Sun', volume: 4300000, bets: 2200 }
  ];

  const oddsMovement = [
    { time: '09:00', odds: 2.50 },
    { time: '10:00', odds: 2.45 },
    { time: '11:00', odds: 2.40 },
    { time: '12:00', odds: 2.35 },
    { time: '13:00', odds: 2.42 },
    { time: '14:00', odds: 2.38 },
    { time: '15:00', odds: 2.33 }
  ];

  const marketShare = [
    { name: 'Football', value: 35, color: '#0EA5E9' },
    { name: 'Basketball', value: 25, color: '#10B981' },
    { name: 'Tennis', value: 20, color: '#F59E0B' },
    { name: 'Others', value: 20, color: '#8B5CF6' }
  ];

  const performanceMetrics = [
    {
      title: "Total Volume (24h)",
      value: "$12.4M",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Active Bettors",
      value: "23,456", 
      change: "+8.7%",
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Win Rate",
      value: "67.8%",
      change: "-2.1%",
      trend: "down",
      icon: Target,
      color: "text-warning"
    },
    {
      title: "Avg Odds",
      value: "2.85",
      change: "+0.15",
      trend: "up",
      icon: TrendingUp,
      color: "text-success"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "big_win",
      description: "User won $45,000 on 15-fold accumulator",
      time: "2 min ago",
      icon: Trophy,
      color: "text-success"
    },
    {
      id: 2,
      type: "high_volume",
      description: "$2.1M volume spike in NBA markets",
      time: "5 min ago", 
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      id: 3,
      type: "odds_alert",
      description: "Significant odds movement: Lakers vs Warriors",
      time: "8 min ago",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      id: 4,
      type: "system_update",
      description: "Real-time odds feed updated successfully",
      time: "12 min ago",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      id: 5,
      type: "market_close",
      description: "Pre-match betting closed: Arsenal vs Chelsea",
      time: "15 min ago",
      icon: Clock,
      color: "text-muted-foreground"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="glass-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className={`flex items-center gap-1 text-sm ${metric.color}`}>
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-surface-elevated ${metric.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Chart */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-primary" />
              Weekly Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--surface))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'volume' ? `$${(value / 1000000).toFixed(1)}M` : value,
                    name === 'volume' ? 'Volume' : 'Bets'
                  ]}
                />
                <Bar dataKey="volume" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Odds Movement */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Live Odds Movement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={oddsMovement}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--surface))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="odds" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Share */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Market Share
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={marketShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  stroke="none"
                >
                  {marketShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--surface))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {marketShare.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Management */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              Risk Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Exposure Limit</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Liability Coverage</span>
                <span className="font-medium text-success">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Hedge Efficiency</span>
                <span className="font-medium text-primary">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="pt-2 space-y-2">
              <Badge variant="outline" className="w-full justify-center">
                Risk Status: Moderate
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Live Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-elevated transition-colors">
                    <div className={`p-1.5 rounded-full bg-surface-elevated ${activity.color}`}>
                      <IconComponent className="w-3 h-3" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};