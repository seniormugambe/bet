import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export const StatsOverview = () => {
  const stats = [
    {
      label: "Active Markets",
      value: "12,847",
      change: "+23.5%",
      icon: Activity,
      color: "text-primary"
    },
    {
      label: "Total Volume",
      value: "$45.2M",
      change: "+18.2%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      label: "Active Users",
      value: "234K",
      change: "+12.8%",
      icon: Users,
      color: "text-warning"
    },
    {
      label: "Profit Today",
      value: "$892K",
      change: "+31.4%",
      icon: TrendingUp,
      color: "text-danger"
    }
  ];

  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="glass-card p-6 rounded-xl hover:bg-surface-elevated/50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-xs text-success font-medium bg-success/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold group-hover:text-primary transition-colors">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};