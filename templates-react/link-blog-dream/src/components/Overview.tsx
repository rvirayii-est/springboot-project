import { Card } from "@/components/ui/card";
import { CheckSquare, Link, Edit3, Calendar, TrendingUp } from "lucide-react";

interface OverviewProps {
  todosCount: number;
  completedTodosCount: number;
  linksCount: number;
  blogPostsCount: number;
}

export const Overview = ({ 
  todosCount, 
  completedTodosCount, 
  linksCount, 
  blogPostsCount 
}: OverviewProps) => {
  const completionRate = todosCount > 0 ? Math.round((completedTodosCount / todosCount) * 100) : 0;
  
  const stats = [
    {
      title: "Total Tasks",
      value: todosCount,
      subtitle: `${completedTodosCount} completed`,
      icon: CheckSquare,
      color: "text-primary",
    },
    {
      title: "Saved Links",
      value: linksCount,
      subtitle: "Organized bookmarks",
      icon: Link,
      color: "text-blue-500",
    },
    {
      title: "Blog Posts",
      value: blogPostsCount,
      subtitle: "Published articles",
      icon: Edit3,
      color: "text-green-500",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      subtitle: "Task efficiency",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-card p-6 rounded-lg shadow-card">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Productivity Overview
        </h2>
        <p className="text-muted-foreground">
          Track your progress across tasks, links, and blog posts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 bg-gradient-card shadow-card hover:shadow-glow transition-all">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <h3 className="font-medium text-foreground">{stat.title}</h3>
              <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Tasks</span>
              <span className="font-medium">{todosCount - completedTodosCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Completed Tasks</span>
              <span className="font-medium text-green-600">{completedTodosCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Content Items</span>
              <span className="font-medium">{linksCount + blogPostsCount}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-accent">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Productivity Tips
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Break large tasks into smaller, manageable pieces</p>
            <p>• Organize links by category for easy retrieval</p>
            <p>• Write regular blog posts to document your learnings</p>
            <p>• Review your progress weekly to stay motivated</p>
          </div>
        </Card>
      </div>
    </div>
  );
};