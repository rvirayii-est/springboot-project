import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, CheckSquare, Plus, Clock, User, AlertCircle } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { TaskForm } from "@/components/forms/TaskForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, isAfter, isBefore, addDays } from "date-fns";

const Tasks = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock task data
  const tasks = [
    {
      id: 1,
      title: "Prepare Sunday Bulletin",
      description: "Design and prepare the weekly bulletin with announcements and order of service",
      assignedTo: "Sarah Johnson",
      assigneeAvatar: "/placeholder.svg",
      dueDate: "2024-08-03",
      priority: "high",
      status: "in-progress",
      category: "admin",
      estimatedHours: "2",
      ministry: "Administration",
      progress: 60
    },
    {
      id: 2,
      title: "Set up Youth Event Equipment",
      description: "Set up sound system, projector, and seating for Friday youth event",
      assignedTo: "Mike Davis",
      assigneeAvatar: "/placeholder.svg",
      dueDate: "2024-08-02",
      priority: "urgent",
      status: "todo",
      category: "event",
      estimatedHours: "3",
      ministry: "Youth Ministry",
      progress: 0
    },
    {
      id: 3,
      title: "Follow up with New Visitors",
      description: "Contact and welcome the 5 new visitors from last Sunday's service",
      assignedTo: "Jennifer Lee",
      assigneeAvatar: "/placeholder.svg",
      dueDate: "2024-08-05",
      priority: "medium",
      status: "review",
      category: "outreach",
      estimatedHours: "4",
      ministry: "Pastoral Care",
      progress: 80
    },
    {
      id: 4,
      title: "Update Church Website Content",
      description: "Add new sermon recordings and update upcoming events section",
      assignedTo: "David Park",
      assigneeAvatar: "/placeholder.svg",
      dueDate: "2024-08-06",
      priority: "low",
      status: "todo",
      category: "admin",
      estimatedHours: "1.5",
      ministry: "Communications",
      progress: 0
    },
    {
      id: 5,
      title: "Organize Food Drive Collection",
      description: "Sort and organize donated food items for community distribution",
      assignedTo: "Emily Wilson",
      assigneeAvatar: "/placeholder.svg",
      dueDate: "2024-07-30",
      priority: "medium",
      status: "completed",
      category: "outreach",
      estimatedHours: "6",
      ministry: "Community Outreach",
      progress: 100
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "review": return "bg-purple-100 text-purple-800";
      case "todo": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ministry": return "bg-ministry-blue text-white";
      case "admin": return "bg-gray-500 text-white";
      case "outreach": return "bg-ministry-gold text-white";
      case "maintenance": return "bg-orange-500 text-white";
      case "event": return "bg-purple-500 text-white";
      case "other": return "bg-slate-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return status !== "completed" && isBefore(new Date(dueDate), new Date());
  };

  const isDueSoon = (dueDate: string, status: string) => {
    const due = new Date(dueDate);
    const soon = addDays(new Date(), 2);
    return status !== "completed" && isAfter(due, new Date()) && isBefore(due, soon);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    overdue: tasks.filter(t => isOverdue(t.dueDate, t.status)).length,
    dueSoon: tasks.filter(t => isDueSoon(t.dueDate, t.status)).length
  };

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
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">Tasks</h1>
                <p className="text-xs lg:text-sm text-muted-foreground">Manage ministry tasks and assignments</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <Tabs defaultValue="kanban" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="kanban" className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Kanban Board</span>
                <span className="sm:hidden">Board</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Task</span>
                <span className="sm:hidden">Create</span>
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Overview</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="kanban" className="space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                <Card className="p-3">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-xl font-bold">{taskStats.total}</div>
                </Card>
                <Card className="p-3">
                  <div className="text-sm text-green-600">Completed</div>
                  <div className="text-xl font-bold text-green-600">{taskStats.completed}</div>
                </Card>
                <Card className="p-3">
                  <div className="text-sm text-blue-600">In Progress</div>
                  <div className="text-xl font-bold text-blue-600">{taskStats.inProgress}</div>
                </Card>
                <Card className="p-3">
                  <div className="text-sm text-red-600">Overdue</div>
                  <div className="text-xl font-bold text-red-600">{taskStats.overdue}</div>
                </Card>
                <Card className="p-3">
                  <div className="text-sm text-yellow-600">Due Soon</div>
                  <div className="text-xl font-bold text-yellow-600">{taskStats.dueSoon}</div>
                </Card>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {["all", "todo", "in-progress", "review", "completed"].map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "ministry" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                      className="whitespace-nowrap"
                    >
                      {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tasks List - Mobile Optimized */}
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <Card key={task.id} className={`transition-shadow hover:shadow-md ${
                    isOverdue(task.dueDate, task.status) ? "border-red-200 bg-red-50/50" : ""
                  }`}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Task Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{task.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          </div>
                          {isOverdue(task.dueDate, task.status) && (
                            <AlertCircle className="w-5 h-5 text-red-500 ml-2 flex-shrink-0" />
                          )}
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace("-", " ")}
                          </Badge>
                          <Badge className={getCategoryColor(task.category)}>
                            {task.category}
                          </Badge>
                        </div>

                        {/* Task Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assigneeAvatar} alt={task.assignedTo} />
                              <AvatarFallback className="text-xs bg-ministry-blue text-white">
                                {task.assignedTo.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-muted-foreground truncate">{task.assignedTo}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span className={`${
                              isOverdue(task.dueDate, task.status) ? "text-red-600 font-medium" :
                              isDueSoon(task.dueDate, task.status) ? "text-yellow-600 font-medium" : ""
                            }`}>
                              {format(new Date(task.dueDate), "MMM dd")}
                            </span>
                          </div>
                          
                          <div className="text-muted-foreground">
                            <span className="font-medium">{task.ministry}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {task.status !== "todo" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-ministry-blue h-2 rounded-full transition-all duration-300"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                          <Button variant="ministry" size="sm" className="flex-1">
                            {task.status === "completed" ? "View" : "Update"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTasks.length === 0 && (
                <div className="text-center py-8">
                  <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No tasks found matching your criteria.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="create">
              <TaskForm />
            </TabsContent>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Task Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Ministry</span>
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Administrative</span>
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Outreach</span>
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Event</span>
                        <span className="text-sm font-medium">1</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Workload</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Sarah Johnson", "Mike Davis", "Jennifer Lee", "David Park"].map((person) => (
                        <div key={person} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-ministry-blue text-white">
                                {person.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{person}</span>
                          </div>
                          <span className="text-sm font-medium">
                            {Math.floor(Math.random() * 5) + 1} tasks
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tasks
                        .filter(t => t.status !== "completed")
                        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                        .slice(0, 4)
                        .map((task) => (
                          <div key={task.id} className="flex justify-between items-center">
                            <span className="text-sm truncate">{task.title}</span>
                            <span className={`text-xs font-medium ${
                              isOverdue(task.dueDate, task.status) ? "text-red-600" :
                              isDueSoon(task.dueDate, task.status) ? "text-yellow-600" : "text-muted-foreground"
                            }`}>
                              {format(new Date(task.dueDate), "MMM dd")}
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Tasks;