import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Calendar, CheckSquare, Users2, Coffee, DollarSign } from "lucide-react";

const quickActions = [
  {
    title: "Add New Member",
    description: "Register a new church member",
    icon: UserPlus,
    variant: "ministry" as const
  },
  {
    title: "Create Event",
    description: "Schedule a new church event",
    icon: Calendar,
    variant: "accent" as const
  },
  {
    title: "Add Task",
    description: "Create a new ministry task",
    icon: CheckSquare,
    variant: "outline" as const
  },
  {
    title: "New Small Group",
    description: "Start a new small group",
    icon: Users2,
    variant: "outline" as const
  },
  {
    title: "Plan MeetUp",
    description: "Organize a ministry meetup",
    icon: Coffee,
    variant: "outline" as const
  },
  {
    title: "Record Donation",
    description: "Add financial contribution",
    icon: DollarSign,
    variant: "outline" as const
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common ministry tasks at your fingertips</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="h-auto p-4 flex flex-col items-start space-y-2 text-left"
          >
            <div className="flex items-center space-x-2 w-full">
              <action.icon className="h-5 w-5" />
              <span className="font-medium">{action.title}</span>
            </div>
            <span className="text-xs opacity-80 text-left">
              {action.description}
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}