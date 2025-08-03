import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-ministry-blue/10 to-ministry-blue-light/10 rounded-bl-full" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-ministry-blue" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={`text-xs mt-2 ${trend.isPositive ? 'text-ministry-success' : 'text-destructive'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}