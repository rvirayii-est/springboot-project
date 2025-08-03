import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, Calendar as CalendarIcon, Plus, MapPin, Clock, Users } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { EventForm } from "@/components/forms/EventForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Events = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock event data
  const events = [
    {
      id: 1,
      title: "Sunday Morning Service",
      description: "Weekly worship service with sermon and communion",
      date: "2024-08-04",
      startTime: "10:00",
      endTime: "12:00",
      location: "Main Sanctuary",
      capacity: 300,
      category: "service",
      organizer: "Pastor Mike",
      attendees: 245,
      status: "confirmed"
    },
    {
      id: 2,
      title: "Youth Group Meeting",
      description: "Weekly youth gathering with games, discussion, and worship",
      date: "2024-08-06",
      startTime: "19:00",
      endTime: "21:00",
      location: "Youth Center",
      capacity: 50,
      category: "meeting",
      organizer: "Sarah Johnson",
      attendees: 32,
      status: "confirmed"
    },
    {
      id: 3,
      title: "Prayer Meeting",
      description: "Mid-week prayer and intercession gathering",
      date: "2024-08-07",
      startTime: "18:00",
      endTime: "19:30",
      location: "Prayer Room",
      capacity: 30,
      category: "meeting",
      organizer: "Elder James",
      attendees: 18,
      status: "confirmed"
    },
    {
      id: 4,
      title: "Community Outreach Fair",
      description: "Annual community service and outreach event",
      date: "2024-08-10",
      startTime: "09:00",
      endTime: "15:00",
      location: "Church Parking Lot",
      capacity: 500,
      category: "outreach",
      organizer: "Outreach Team",
      attendees: 0,
      status: "planning"
    },
    {
      id: 5,
      title: "Leadership Training Workshop",
      description: "Training session for ministry leaders and volunteers",
      date: "2024-08-12",
      startTime: "14:00",
      endTime: "17:00",
      location: "Conference Room",
      capacity: 25,
      category: "training",
      organizer: "Pastor Mike",
      attendees: 0,
      status: "planning"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "service": return "bg-blue-100 text-blue-800";
      case "meeting": return "bg-green-100 text-green-800";
      case "conference": return "bg-purple-100 text-purple-800";
      case "social": return "bg-pink-100 text-pink-800";
      case "training": return "bg-orange-100 text-orange-800";
      case "outreach": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "planning": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:ml-72">
        {/* Mobile Header */}
        <header className="bg-card border-b border-border px-4 py-3 lg:px-6 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">Events</h1>
                <p className="text-xs lg:text-sm text-muted-foreground">Manage church events and activities</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Event List</span>
                <span className="sm:hidden">List</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Event</span>
                <span className="sm:hidden">Create</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Calendar View</span>
                <span className="sm:hidden">Calendar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search events by title, location, or organizer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="sm:w-auto">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Filter by Date
                </Button>
              </div>

              {/* Events Grid - Mobile First */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{event.title}</CardTitle>
                          <CardDescription className="text-sm mt-1 line-clamp-2">
                            {event.description}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-1 ml-2">
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees}/{event.capacity}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">Organizer:</span>
                        <span className="ml-1">{event.organizer}</span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                        <Button variant="ministry" size="sm" className="flex-1">Manage</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No events found matching your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="create">
              <EventForm />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>Monthly view of all scheduled events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <CalendarIcon className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Calendar Component</p>
                    <p>Interactive calendar view will be displayed here showing all events.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Events;