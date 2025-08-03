import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Morning Service",
    date: "2024-08-04",
    time: "10:00 AM",
    location: "Main Sanctuary",
    type: "Service",
    attendees: 250
  },
  {
    id: 2,
    title: "Youth Group Meeting",
    date: "2024-08-06",
    time: "7:00 PM", 
    location: "Youth Center",
    type: "Youth",
    attendees: 45
  },
  {
    id: 3,
    title: "Prayer Meeting",
    date: "2024-08-07",
    time: "6:00 PM",
    location: "Prayer Room",
    type: "Prayer",
    attendees: 20
  },
  {
    id: 4,
    title: "Small Group Leader Training",
    date: "2024-08-08",
    time: "2:00 PM",
    location: "Conference Room",
    type: "Training",
    attendees: 15
  }
];

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Next events on your ministry calendar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="border rounded-lg p-4 space-y-2 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">{event.title}</h4>
              <Badge variant="secondary">{event.type}</Badge>
            </div>
            
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="h-3 w-3" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3" />
                <span>{event.location}</span>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Expected: {event.attendees} attendees
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}