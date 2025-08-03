import { Button } from "@/components/ui/button";
import { CheckSquare, Link, Edit3, BarChart3 } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "todos", label: "Tasks", icon: CheckSquare },
    { id: "links", label: "Links", icon: Link },
    { id: "blog", label: "Blog", icon: Edit3 },
    { id: "overview", label: "Overview", icon: BarChart3 },
  ];

  return (
    <nav className="bg-gradient-card p-4 rounded-lg shadow-card mb-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 transition-all ${
                activeTab === tab.id 
                  ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                  : "hover:bg-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};