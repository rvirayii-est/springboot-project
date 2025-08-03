import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, Filter, UserPlus, Users, UserCheck, UserX } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MemberForm } from "@/components/forms/MemberForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Members = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock member data
  const members = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      status: "active",
      ministry: "Worship Team",
      smallGroup: "Alpha Group",
      joinDate: "2023-01-15",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 234-5678",
      status: "new",
      ministry: "Youth Ministry",
      smallGroup: "Beta Group",
      joinDate: "2024-07-20",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "(555) 345-6789",
      status: "active",
      ministry: "Outreach",
      smallGroup: "Gamma Group",
      joinDate: "2022-11-08",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@email.com",
      phone: "(555) 456-7890",
      status: "visitor",
      ministry: "",
      smallGroup: "",
      joinDate: "2024-07-30",
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "new": return "bg-blue-100 text-blue-800";
      case "visitor": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <UserCheck className="w-4 h-4" />;
      case "new": return <UserPlus className="w-4 h-4" />;
      case "visitor": return <Users className="w-4 h-4" />;
      case "inactive": return <UserX className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">Members</h1>
                <p className="text-xs lg:text-sm text-muted-foreground">Manage church members and their information</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Member List</span>
                <span className="sm:hidden">List</span>
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Member</span>
                <span className="sm:hidden">Add</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Statistics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search members by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Members Grid - Mobile First */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-ministry-blue text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                          <CardDescription className="text-sm truncate">{member.email}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getStatusColor(member.status)} flex items-center gap-1`}>
                          {getStatusIcon(member.status)}
                          <span className="capitalize">{member.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-medium">Phone:</span> {member.phone}
                        </p>
                        {member.ministry && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Ministry:</span> {member.ministry}
                          </p>
                        )}
                        {member.smallGroup && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Small Group:</span> {member.smallGroup}
                          </p>
                        )}
                        <p className="text-muted-foreground">
                          <span className="font-medium">Joined:</span> {new Date(member.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                        <Button variant="ministry" size="sm" className="flex-1">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No members found matching your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="add">
              <MemberForm />
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">245</div>
                    <div className="text-xs text-green-600">+12 this month</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">198</div>
                    <div className="text-xs text-muted-foreground">80.8% of total</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">New Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-xs text-blue-600">This month</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Visitors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">29</div>
                    <div className="text-xs text-yellow-600">Potential members</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Member Statistics</CardTitle>
                  <CardDescription>Overview of membership trends and demographics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Filter className="w-12 h-12 mx-auto mb-3" />
                    <p>Detailed statistics and charts will be displayed here.</p>
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

export default Members;