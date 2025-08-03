import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    type: "member_added",
    user: "Sarah Johnson",
    avatar: "/placeholder.svg",
    action: "joined the church",
    time: "2 hours ago",
    badge: "New Member"
  },
  {
    id: 2,
    type: "event_created",
    user: "Pastor Mike",
    avatar: "/placeholder.svg", 
    action: "created Sunday Service event",
    time: "4 hours ago",
    badge: "Event"
  },
  {
    id: 3,
    type: "task_completed",
    user: "Jennifer Lee",
    avatar: "/placeholder.svg",
    action: "completed setup for Youth Group",
    time: "1 day ago",
    badge: "Task"
  },
  {
    id: 4,
    type: "connection_made",
    user: "David Park",
    avatar: "/placeholder.svg",
    action: "followed up with visitor",
    time: "2 days ago",
    badge: "Connection"
  }
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across your ministry</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.avatar} alt={activity.user} />
              <AvatarFallback className="bg-ministry-blue text-white">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {activity.badge}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}